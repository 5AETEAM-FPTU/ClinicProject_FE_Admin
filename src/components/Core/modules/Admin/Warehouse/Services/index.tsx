'use client'
import {
    Button,
    Form,
    Input,
    message,
    Select,
    Space,
    Table,
    TableProps,
} from 'antd'
import { Delete, Edit, Eye, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AddService from './AddService'
import {
    useDeleteServiceMutation,
    useGetAllServicesQuery,
} from '@/stores/services/services'
import UpdateService from './UpdateService'
import { useRouter, useSearchParams } from 'next/navigation'
import ViewService from './ViewService'

export type ServiceType = {
    id: string
    name: string
    code: string
    price: number
    group: string
    description: string
}

export default function ServicesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [openAddNewService, setOpenAddNewService] = useState<boolean>(false)
    // const [pageSize, setPageSize] = useState<number>(8)
    // const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedId, setSelectedId] = useState<string>('')
    const [openUpdateService, setOpenUpdateService] = useState<boolean>(false)
    const [openViewService, setOpenViewService] = useState<boolean>(false)
    const pageSize = searchParams.get('pageSize') || '8'
    const currentPage = searchParams.get('page') || '1'
    const searchName = searchParams.get('search') || ''
    const viewId = searchParams.get('viewId') || ''

    const { services, refetch, totalPage } = useGetAllServicesQuery(
        {
            pageSize: pageSize,
            pageIndex: currentPage,
            key: searchName,
        },
        {
            selectFromResult: ({ data, isFetching }) => ({
                services: data?.body?.services || [],
                isFetching,
                totalPage: data?.body?.services?.totalPages + 10 || 50,
            }),
        },
    )
    const [deleteService, { isLoading }] = useDeleteServiceMutation()
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
    const handleDeleteService = async (id: string) => {
        try {
            setSelectedId(id)
            await deleteService({ id }).unwrap()
            message.success('Xóa dịch vụ thành công!')
            refetch()
        } catch (error) {
            message.error('Xóa dịch vụ không thành công!')
        }
    }
    const handleViewServiceJustView = (id: string) => {
        changeRoute(
            { current: currentPage, pageSize: pageSize },
            { viewId: id, search: searchName },
        )
        setOpenViewService(true)
    }
    const handleViewService = (id: string) => {
        changeRoute(
            { current: currentPage, pageSize: pageSize },
            { viewId: id, search: searchName },
        )
        setOpenUpdateService(true)
    }
    const columns: TableProps<ServiceType>['columns'] = [
        {
            title: 'Mã dịch vụ',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            ellipsis: true,
        },
        {
            title: 'Nhóm dịch vụ',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Hành động',
            key: 'action',

            render: (value, record) => (
                <div className="flex flex-row gap-0">
                    <Button
                        type="text"
                        onClick={() => handleViewServiceJustView(record.id)}
                    >
                        <Eye
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                    <Button
                        type="text"
                        onClick={() => handleViewService(record.id)}
                    >
                        <Edit
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                    <Button
                        type="text"
                        loading={selectedId === record.id && isLoading}
                    >
                        <Delete
                            onClick={() => handleDeleteService(record.id)}
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
                        Quản lý dịch vụ khám chữa bệnh
                    </h3>
                    <p>Quản lý các loại dịch vụ khám chữa bệnh</p>
                </div>
                <div className="flex items-center gap-5">
                    <Button
                        type="primary"
                        className="rounded-lg bg-secondarySupperDarker px-5"
                        onClick={() => setOpenAddNewService(true)}
                    >
                        <Plus size={16} /> THÊM DỊCH VỤ MỚI
                    </Button>
                    <AddService
                        open={openAddNewService}
                        setOpen={setOpenAddNewService}
                        refetch={refetch}
                    />
                </div>
            </div>
            <div className="flex w-full flex-row justify-between">
                <Form
                    name="basic"
                    autoComplete="off"
                    className="flex w-full flex-row justify-between"
                    layout="horizontal"
                    onChange={(value) => console.log(value)}
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
                    pagination={{
                        current: parseInt(currentPage),
                        pageSize: parseInt(pageSize),
                        total: totalPage,
                    }}
                    className="overflow-hidden rounded-lg shadow-third"
                    columns={columns}
                    dataSource={services?.contents}
                    onChange={handleTableChange}
                />
            </div>
            <UpdateService
                open={openUpdateService}
                setOpen={setOpenUpdateService}
                refetch={refetch}
            />
            <ViewService
                open={openViewService}
                setOpen={setOpenViewService}
                refetch={refetch}
            />
        </div>
    )
}
