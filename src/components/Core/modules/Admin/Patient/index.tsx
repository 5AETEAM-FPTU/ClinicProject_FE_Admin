'use client'

import { useGetAllPatientsQuery } from "@/stores/services/user/user"
import { Button, Form, Input, Table, TableProps } from "antd"
import dayjs from "dayjs"
import { Eye, Search } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ViewPatient } from './ViewPatient'

interface Gender {
    id: string
    name: string
    constant: string
}

export interface UserInformation {
    id: string
    username: string
    phoneNumber: string | null
    avatarUrl: string
    fullName: string
    gender: Gender
    dob: string
    address: string
    description: string
}

export default function Patient() {
    const [form] = Form.useForm()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedId, setSelectedId] = useState<string>('')
    const [openViewPatient, setOpenViewPatient] = useState(false)
    const pageSize = searchParams.get('pageSize') || '3'
    const currentPage = searchParams.get('page') || '1'
    const keyword = searchParams.get('search') || ''

    const { users, isLoading, totalPage, refetch } = useGetAllPatientsQuery({ pageIndex: currentPage, pageSize: pageSize, keyword: keyword }, {
        selectFromResult: ({ data, isFetching, isLoading }) =>
        ({
            users: data?.body?.users,
            isFetching,
            isLoading,
            totalPage: data?.body?.users?.totalPages
        }),
    })

    const handleTableChange = (pagination: any) => {
        changeRoute(pagination, {})
        refetch()
    }
    
    const changeRoute = (pagination: {current: string, pageSize: string}, filters: {search?: string}) => {
        const param = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...(filters.search && { search: filters.search })
        }
        router.push(`?${new URLSearchParams(param).toString()}`)
    }

    const columns: TableProps<UserInformation>['columns'] = [
        {
            title: 'Tên',
            width: '25%',
            dataIndex: 'fullName',
            ellipsis: true,
            key: 'fullName',
            render: (value, record) =>
            (<div className="flex flex-row gap-3 items-center">
                <Image src={record.avatarUrl} alt="avatar" width={128} height={128} className="w-10 h-10 rounded-full object-cover" />
                {record.fullName}
            </div>)
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
            render: (value, record) =>
            (<div>
                {dayjs(record.dob).format('DD-MM-YYYY')}
            </div>)
        },
        {
            title: 'Giới tính',
            dataIndex: 'specialty',
            key: 'specialty',
            ellipsis: true,
            render: (value, record) =>
            (<div className="text-balance">
                {record.gender.name}
            </div>)
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (value, record) => (
                <div className="flex flex-row">
                    <Button
                        type="text"
                        onClick={() => {
                            setSelectedId(record.id)
                            setOpenViewPatient(true)
                        }}
                    >
                        <Eye
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                </div>
            ),
        }
    ]

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-row justify-between">
                <div>
                    <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                        Danh sách người dùng
                    </h3>
                    <p>Quản lý thông tin bệnh nhân</p>
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
                            prefix={<Search size={16} />}
                            onChange={(e) => {
                                changeRoute(
                                    {
                                        current: currentPage,
                                        pageSize: pageSize,
                                    },
                                    {
                                        search: e.target.value,
                                    },
                                )
                            }}
                            placeholder="Nhập tên bệnh nhân"
                        />
                    </Form.Item>
                </Form>
            </div>

            <div>
                <Table
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        current: parseInt(currentPage),
                        pageSize: parseInt(pageSize),
                        total: parseInt(pageSize) * totalPage,
                        position: ['bottomCenter'],
                    }}
                    className="overflow-hidden rounded-lg shadow-third"
                    columns={columns}
                    dataSource={users?.contents}
                    onChange={handleTableChange}
                    loading={isLoading}
                />
            </div>
            <ViewPatient
                open={openViewPatient}
                setOpen={setOpenViewPatient}
                patientDetail={users?.contents.find((user: UserInformation) => user.id === selectedId)}
            />
        </div>
    )
}