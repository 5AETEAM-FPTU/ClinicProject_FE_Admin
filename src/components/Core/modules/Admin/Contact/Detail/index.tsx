'use client'
import { useGetContactByIdQuery } from '@/stores/services/contact'
import {
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
export default function ViewContact({ open, setOpen, refetch }: TProps) {
    const route = useRouter()
    const pathname = usePathname()
    const searchParam = useSearchParams()

    const viewId = searchParam.get('viewId')
    console.log(viewId)

    const { contact, refetch: refetchContact } = useGetContactByIdQuery(
        viewId!,
        {
            skip: !viewId,
            selectFromResult: ({ data }) => ({
                contact: data?.body?.result || null,
            }),
        },
    )

    console.log(contact);

    useEffect(() => {
        if (viewId) {
            refetchContact();
        }
    }, [viewId])

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
                            Chi tiết liên hệ
                        </p>
                    </div>
                </>
            }
            footer={null}
        >
            {contact ? (
                <div className="flex flex-col gap-5">
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Họ và tên
                        </p>
                        <p className="text-[16px] font-normal">
                            {contact.fullName}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Email hoặc số điện thoại
                        </p>
                        <p className="text-[16px] font-normal">
                            {contact.emailOrPhone}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Tuổi:
                        </p>
                        <p className="text-[16px] font-normal">
                            {contact.age}:
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Giới tính:
                        </p>
                        <p className="text-[16px] font-normal">
                            {contact.gender == 1 ? 'Nam' : 'Nữ'}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-medium text-secondarySupperDarker">
                            Mô tả:
                        </p>
                        <p className="text-[16px] font-normal" dangerouslySetInnerHTML={{ __html: contact.content }}>
                        </p>
                    </div>
                </div>
            ) : (
                'Không có thông tin...'
            )}
        </Modal>
    )
}
