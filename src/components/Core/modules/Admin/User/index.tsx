'use client'
import { useGetAllDoctorQuery } from "@/stores/services/admin";
import { useGetAllDoctorsQuery, useRemoveDoctorMutation } from "@/stores/services/user/user";
import { Button, Form, Input, message, Modal, Table, TableProps, Tag } from "antd";
import { Delete, Edit, Eye, Plus } from "lucide-react";
import AddDoctor from "./AddDoctor";
import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filter } from "lodash";
import dayjs from "dayjs";
import ViewDoctor from "./ViewDoctor";
import Image from "next/image";
const { confirm } = Modal;

interface Gender {
    id: string;
    name: string;
    constant: string;
}

interface Specialty {
    id: string;
    name: string;
    constant: string;
}

interface Position {
    id: string;
    name: string;
    constant: string;
}

export interface User {
    id: string;
    username: string;
    phoneNumber: string | null;
    avatarUrl: string;
    fullName: string | null;
    gender: Gender;
    dob: string;
    address: string;
    description: string;
    achievement: string;
    isOnDuty: boolean;
    specialty: Specialty[];
    position: Position;
}

export type DoctorType = {
    id: string
    fullName: string
    phoneNumber: string
    gender: string
    dob: string
    description: string
    specialty: string
    position: string
    avatarUrl: string
}

export default function UserManagement() {
    const router = useRouter()
    const [openAddNewDoctor, setOpenAddNewDoctor] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const pageSize = searchParams.get('pageSize') || '4'
    const currentPage = searchParams.get('page') || '1'
    const searchName = searchParams.get('search') || ''
    const [selectedId, setSelectedId] = useState<string>('')

    const [removeDoctorFunction, { isLoading }] = useRemoveDoctorMutation()

    const changeRoute = (pagination: { current: string, pageSize: string }, filters: { search?: string }) => {
        const { search } = filters
        const query = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...(search && { search }),

        }
        const queryString = new URLSearchParams(query).toString()
        router.push(`?${queryString}`)
    }

    const columns: TableProps<DoctorType>['columns'] = [
        {
            title: 'Bác sĩ',
            width: '25%',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (value, record) =>
            (<div className="flex flex-row gap-3 items-center">
                <Image src={record.avatarUrl} alt="avatar" width={128} height={128} className="w-10 h-10 rounded-full" />
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
            title: 'Chuyên môn',
            dataIndex: 'specialty',
            key: 'specialty',
            ellipsis: true,
            render: (value, record) =>
            (<div className="text-balance">
                {record.specialty}
            </div>)
        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            render: (value, record, index) => {
                const colors = ['green', 'blue', 'red', 'orange'];
                return (
                    <Tag color={colors[index % colors.length]}>
                        {record.position}
                    </Tag>
                );
            }
        }
        , {
            title: 'Hành động',
            key: 'action',
            render: (value, record) => (
                <div className="flex flex-row">
                    <Button
                        type="text"
                        onClick={() => setOpenViewDoctor(true)}
                    >
                        <Eye
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                    <ViewDoctor
                        open={openViewDoctor}
                        setOpen={setOpenViewDoctor}
                        refetch={refetch}
                        doctorDetail={doctors.find((d: { id: string; }) => d.id === record.id)}
                    />
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
        }
    ]

    const { doctors, isFetching, refetch, totalPage } = useGetAllDoctorsQuery
        ({ pageIndex: currentPage, pageSize: pageSize, keyword: searchName }, {
            selectFromResult: ({ data, isFetching, isLoading }) => ({
                doctors: data?.body?.users?.contents || [],
                isFetching,
                isLoading,
                totalPage: data?.body?.users?.totalPages,
            })
        })

    const handleTableChange = (pagination: any) => {
        changeRoute(pagination, {})
        refetch()
    }

    const formattedDoctors = doctors?.map((doctor: User) => ({
        id: doctor.id,
        fullName: doctor.fullName,
        phoneNumber: doctor.phoneNumber,
        dob: doctor.dob,
        specialty: doctor.specialty.map(s => s.name).join(', '), // Combine specialties
        position: doctor.position.name,
        avatarUrl: doctor.avatarUrl
    }));

    const [openViewDoctor, setOpenViewDoctor] = useState<boolean>(false)

    const handleDeleteService = async (id: string) => {
        confirm({
            title: 'Bạn có chắc không?',
            content: 'Khi bạn xác nhận xóa, dữ liệu sẽ không thể khôi phục',
            okText: 'Có',
            cancelText: 'Không',
            async onOk() {
                try {
                    setSelectedId(id)
                    await removeDoctorFunction({ doctorId: id }).unwrap()
                    if (doctors.length === 1 && parseInt(totalPage) > 1) {
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
                    message.success('Xóa dịch vụ thành công!')
                    refetch()
                } catch (error) {
                    message.error('Xóa dịch vụ không thành công!')
                }
            },
        });

    }

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-row justify-between">
                <div>
                    <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                        Quản lý phòng khám
                    </h3>
                    <p>Quản lý danh sách bác sĩ trong phòng khám</p>
                </div>
                <div className="flex items-center gap-5">
                    <Button
                        type="primary"
                        className="rounded-lg bg-secondarySupperDarker px-5"
                        onClick={() => setOpenAddNewDoctor(!openAddNewDoctor)}
                    >
                        <Plus size={16} /> Thêm mới bác sĩ
                    </Button>
                    <AddDoctor
                        open={openAddNewDoctor}
                        setOpen={setOpenAddNewDoctor}
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
                            className="h-[90%]"
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
                            placeholder="Nhập tên bác sĩ"
                        ></Input>
                    </Form.Item>
                </Form>
            </div>

            <div className="overflow-x-hidden">
                <Table
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        current: parseInt(currentPage),
                        pageSize: parseInt(pageSize),
                        total: parseInt(pageSize) * totalPage,
                        position: ['bottomCenter'],
                    }}
                    className="overflow-x-hidden rounded-lg shadow-third"
                    columns={columns}
                    dataSource={formattedDoctors}
                    onChange={handleTableChange}
                    loading={isFetching}
                />
            </div>

        </div>

    )
}