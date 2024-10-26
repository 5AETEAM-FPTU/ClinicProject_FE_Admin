'use client'
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Table,
    TableProps,
} from 'antd'
import { Delete, Edit, Eye } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ViewDetailContact from './Detail'
import { useDeleteContactMutation, useGetAllContactQuery, useUpdateContactMutation } from '@/stores/services/contact'
const { confirm } = Modal;


export type ServiceType = {
    id: string
    name: string
    code: string
    price: number
    group: string
    description: string
}

export default function ContactsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // const [pageSize, setPageSize] = useState<number>(8)
    // const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedId, setSelectedId] = useState<string>('')
    const [openViewDetailContact, setOpenViewDetailContact] = useState<boolean>(false)
    const pageSize = searchParams.get('pageSize') || '6'
    const currentPage = searchParams.get('page') || '1'
    const searchName = searchParams.get('search') || ''
    const viewId = searchParams.get('viewId') || ''
    const [updateContact, { isLoading: isUpdateLoading }] = useUpdateContactMutation();
    const { contacts, refetch, totalPage, isLoading: isLoadingContact } = useGetAllContactQuery(
        {
            page: parseInt(currentPage),
            limit: parseInt(pageSize),
            search: searchName,
        },
        {
            selectFromResult: ({ data, isFetching, isLoading }) => ({
                contacts: data?.body?.result || [],
                isFetching,
                isLoading,
                totalPage: data?.body?.totalPages,
            }),
        },
    )
    const [deleteContact, { isLoading }] = useDeleteContactMutation()
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
        router.push(`?${queryString}`)
    }
    const handleTableChange = (pagination: any) => {
        changeRoute(pagination, {})
        refetch()
    }
    const handleUpdateContact = async (id: string, status: number) => {
        try {
            setSelectedId(id);
            await updateContact({ id, status }).unwrap()
            message.success('Cập nhật trạng thái liên hệ thành công!')
            refetch()
        } catch (error) {
            message.error('Cập nhật trạng thái liên hệ không thành công!')
        }
    }
    const handleDeleteContact = async (id: string) => {
        confirm({
            title: 'Bạn có chắc không?',
            content: 'Khi bạn xác nhận xóa, dữ liệu sẽ không thể khôi phục',
            okText: 'Có',
            cancelText: 'Không',
            async onOk() {
                try {
                    setSelectedId(id)
                    await deleteContact(id).unwrap()
                    if (contacts.length === 1 && parseInt(totalPage) > 1) {
                        const page = parseInt(currentPage) - 1
                        changeRoute(
                            {
                                current: page.toString(),
                                pageSize: pageSize,
                            },
                            {
                                search: searchName,
                            },
                        )
                    }
                    message.success('Xóa thông tin liên hệ thành công!')
                    refetch()
                } catch (error) {
                    message.error('Xóa thông tin liên hệ không thành công!')
                }
            },
        });

    }
    const handleViewServiceJustView = (id: string) => {
        changeRoute(
            { current: currentPage, pageSize: pageSize },
            { viewId: id, search: searchName },
        )
        setOpenViewDetailContact(true)
    }

    const columns: TableProps<ServiceType>['columns'] = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email hoặc số điện thoại',
            dataIndex: 'emailOrPhone',
            key: 'emailOrPhone',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            ellipsis: true,
            render(value, record, index) {
                return <span>{value === 1 ? 'Nam' : 'Nữ'}</span>
            },
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (value, record) => (
                <div>
                    {value === 2 ? (
                        <span className="text-green-500">Đã xử lý</span>
                    ) : (
                        <span className="text-red-500">Chưa xử lý</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            render: (value, record: any) => (
                <div className="flex flex-row gap-0">
                    <Button
                        type="text"
                        onClick={() => handleViewServiceJustView(record._id)}
                    >
                        <Eye
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                    <Button
                        type="text"
                        loading={selectedId === record._id && isUpdateLoading}
                        onClick={() => handleUpdateContact(record._id, record.status === 1 ? 2 : 1)}
                    >
                        <Edit
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                    <Button
                        type="text"
                        loading={selectedId === record._id && isLoading}
                    >
                        <Delete
                            onClick={() => handleDeleteContact(record._id)}
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-row justify-between">
                <div>
                    <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                        Quản lý liên hệ
                    </h3>
                </div>
            </div>
            <div className="flex w-full flex-row justify-between">
                <Form
                    name="basic"
                    autoComplete="off"
                    className="flex w-full flex-row justify-between"
                    layout="horizontal"
                >
                    <Form.Item label="Tìm kiếm">
                        <Input
                            onChange={(e) =>
                                changeRoute(
                                    {
                                        current: currentPage,
                                        pageSize: pageSize,
                                    },
                                    {
                                        search: e.target.value,
                                    },
                                )
                            }
                            placeholder="Nhập tên dịch vụ"
                        ></Input>
                    </Form.Item>
                </Form>
            </div>

            <div>
                <Table
                    scroll={{ x: 'max-content' }}
                    rowKey={(record: any) => record._id}
                    pagination={{
                        current: parseInt(currentPage),
                        pageSize: parseInt(pageSize),
                        total: parseInt(pageSize) * totalPage,
                    }}
                    className="overflow-hidden rounded-lg shadow-third"
                    columns={columns}
                    dataSource={contacts}
                    onChange={handleTableChange}
                    loading={isLoadingContact}
                />
            </div>
            <ViewDetailContact
                open={openViewDetailContact}
                setOpen={setOpenViewDetailContact}
                refetch={refetch}
            />
        </div>
    )
}
