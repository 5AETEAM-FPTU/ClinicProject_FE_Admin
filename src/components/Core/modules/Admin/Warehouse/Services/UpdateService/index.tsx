'use client'
import {
    useCreateNewServiceMutation,
    useGetServiceByIdQuery,
    useUpdateServiceByIdMutation,
} from '@/stores/services/services'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { log } from 'console'
import { RotateCcw } from 'lucide-react'
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'
import React, { useEffect } from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}
export default function UpdateService({ open, setOpen, refetch }: TProps) {
    const route = useRouter()
    const searchParam = useSearchParams()

    const viewId = searchParam.get('viewId')

    const { service, refetch: refetchService } = useGetServiceByIdQuery(
        { id: viewId! },
        {
            skip: !viewId,
            selectFromResult: ({ data }) => ({
                service: data?.body?.service || null,
            }),
        },
    )

    const [updateServiceById, { isLoading: updateLoading }] =
        useUpdateServiceByIdMutation()

    useEffect(() => {
        // refetchService();
    }, [viewId])

    const onFinish = async (values: any) => {
        try {
            await updateServiceById({ ...values, id: viewId! }).unwrap()
            refetch()
            setOpen(false)
            message.success('Cập nhật dịch vụ thành công!')
        } catch (error) {
            message.error('Cập nhật dịch vụ không thành công!')
        }
    }
    const [myForm] = Form.useForm()

    useEffect(() => {
        myForm.setFieldsValue({
            code: service?.code,
            name: service?.name,
            price: service?.price,
            description: service?.description,
            group: service?.group,
        })
    }, [service])

    const pageSize = searchParam.get('pageSize') || '8'
    const currentPage = searchParam.get('page') || '1'
    const searchName = searchParam.get('search') || ''
    const changeRoute = (
        pagination: { current: string; pageSize: string },
        filters: { viewId?: string; search?: string },
    ) => {
        const { viewId, search } = filters
        const query = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...(search && { search }),
            ...(viewId && { viewId }),
        }
        const queryString = new URLSearchParams(query).toString()
        route.push(`?${queryString}`)
    }

    const handleCloseModal = () => {
        setOpen(false)
        changeRoute(
            {
                current: currentPage,
                pageSize: pageSize,
            },
            {
                viewId: '',
                search: searchName,
            },
        )
    }

    return (
        <Modal
            open={open}
            onClose={() => handleCloseModal()}
            onCancel={() => handleCloseModal()}
            centered
            title={
                <>
                    <div>
                        <p className="text-[20px] font-semibold text-secondarySupperDarker">
                            Chỉnh sửa dịch vụ{' '}
                        </p>
                        <p className="text-[14px] text-secondarySupperDarker">
                            Thông tin bắt buộc
                        </p>
                    </div>
                </>
            }
            footer={null}
        >
            <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                form={myForm}
            >
                <Form.Item
                    label="Mã dịch vụ"
                    name="code"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Tên dịch vụ"
                    name="name"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Nhóm dịch vụ"
                    name="group"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Đơn giá"
                    name="price"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input
                        type="number"
                        defaultValue={50000}
                        min={0}
                        max={10000000}
                        placeholder="Nhập giá (vnd)"
                    ></Input>
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập dữ liệu"
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item className="mb-0 flex justify-end">
                    <div className="flex flex-row gap-5">
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-secondaryDarker"
                        >
                            Lưu
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
