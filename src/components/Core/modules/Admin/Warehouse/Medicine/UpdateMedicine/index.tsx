'use client'
import { useCreateNewMedicineMutation, useGetMedicineByIdQuery, useUpdateMedicineMutation } from '@/stores/services/medicine'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { RotateCcw } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    medicineTypes: any
    medicineGroups: any
    refetch: any
}

export default function UpdateMedicine({    
    open,
    setOpen,
    medicineGroups,
    medicineTypes,
    refetch,
}: TProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [updateMedicine, { isLoading, isSuccess }] =
        useUpdateMedicineMutation()
    const [myForm] = Form.useForm();
    const viewId = searchParams.get('viewId');
    const {medicine, refetch: medicineRefetch} = useGetMedicineByIdQuery(viewId!, {
        skip: !viewId,
        selectFromResult: ({ data }) => ({
            medicine: data?.body?.medicine || null,
        })
    })
    useEffect(() => {}, [viewId]); 

    useEffect(() => {
        myForm.setFieldsValue({
            medicineName: medicine?.medicineName,
            ingredient: medicine?.ingredient,
            manufacture: medicine?.manufacture,
            medicineGroupId: medicine?.group?.groupId,
            medicineTypeId: medicine?.type?.typeId,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [medicine])
    
    const onFinish = async (values: any) => {
        try {
            await updateMedicine({...values, medicineId: viewId!}).unwrap()
            message.success('Cập nhật thuốc thành công!')
            setOpen(false)
            refetch()
            myForm.resetFields()
        } catch (error) {
            message.error('Cập nhật thuốc thất bại!')
        }
    }
    const pageSize = searchParams.get('pageSize') || '8'
    const currentPage = searchParams.get('page') || '1'
    const searchName = searchParams.get('search') || ''
    const selectedMedicineType = searchParams.get('type') || ''
    const selectedMedicineGroup = searchParams.get('group') || ''
    const changeRoute = (
        pagination: { current: string; pageSize: string },
        filters: { type?: string; group?: string; search?: string; viewId?: string },
    ) => {
        const { type, group, search, viewId } = filters
        const query = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...(type && { type }),
            ...(group && { group }),
            ...(search && { search }),
            ...(viewId && { viewId }),
        }
        const queryString = new URLSearchParams(query).toString()
        router.push(`?${queryString}`)
    }
    const handleCloseModal = () => {
        changeRoute({ current: currentPage, pageSize: pageSize }, {
            type: selectedMedicineType,
            group: selectedMedicineGroup,
            search: searchName,
            viewId: undefined
        })
        setOpen(false);
        refetch()
        myForm.resetFields()
    }
    
    return (
        <Modal
            open={open}
            onCancel={handleCloseModal}
            centered
            title={
                <>
                    <div>
                        <p className="text-[20px] font-semibold text-secondarySupperDarker">
                            Cập nhật thuốc {' '}
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
                name="basic-update"
                layout="vertical"
                onFinish={onFinish}
                form={myForm}
            >
                <Form.Item
                    label="Tên thuốc"
                    name="medicineName"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Nhà sản xuất"
                    name="manufacture"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Dạng thuốc"
                    name="medicineTypeId"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Select placeholder="Chọn dạng thuốc">
                        {medicineTypes.map((item: any) => (
                            <Select.Option
                                value={item.medicineTypeId}
                                key={item.medicineTypeId}
                            >
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Nhóm thuốc"
                    name="medicineGroupId"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Select placeholder="Chọn nhóm thuốc">
                        {medicineGroups.map((item: any) => (
                            <Select.Option
                                value={item.medicineGroupId}
                                key={item.medicineGroupId}
                            >
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Thành phần"
                    name="ingredient"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input.TextArea placeholder="Nhập nguyên liệu" />
                </Form.Item>
                <Form.Item className="mb-0 flex w-full justify-end">
                    <div className="flex flex-row gap-5">
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-secondaryDarker"
                            loading={isLoading}
                        >
                            Lưu
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
