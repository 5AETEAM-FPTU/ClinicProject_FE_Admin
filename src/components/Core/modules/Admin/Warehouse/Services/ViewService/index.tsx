'use client'
import {
    useCreateNewServiceMutation,
    useGetServiceByIdQuery,
} from '@/stores/services/services'
import { Button, Form, Input, message, Modal, Select } from 'antd'
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
export default function ViewService({ open, setOpen, refetch }: TProps) {
    const route = useRouter()
    const pathname = usePathname()
    const searchParam = useSearchParams()

    const viewId = searchParam.get('viewId')
    console.log(viewId)

    const { service, refetch: refetchService } = useGetServiceByIdQuery(
        { id: viewId! },
        {
            skip: !viewId,
            selectFromResult: ({ data }) => ({
                service: data?.body?.service || null,
            }),
        },
    )
    console.log(service)

    useEffect(() => {
        // refetchService();
    }, [viewId])

    const onFinish = async (values: any) => { }
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
                            Chi tiết dịch vụ
                        </p>
                    </div>
                </>
            }
            footer={null}
        >
            {service ? (
                <div className="flex flex-col gap-5">
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Mã dịch vụ:
                        </p>
                        <p className="text-[16px] font-normal">
                            {service?.code}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Tên dịch vụ:
                        </p>
                        <p className="text-[16px] font-normal">
                            {service?.name}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Đơn giá dịch vụ:
                        </p>
                        <p className="text-[16px] font-normal">
                            {service?.price}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Nhóm dịch vụ:
                        </p>
                        <p className="text-[16px] font-normal">
                            {service?.group}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Mô tả dịch vụ:
                        </p>
                        <p className="text-[16px] font-normal">
                            {service?.description}
                        </p>
                    </div>
                </div>
            ) : (
                'Không có thông tin...'
            )}
        </Modal>
    )
}
