'use client'
import {
    useDeleteMedicineMutation,
    useGetAllMedicineGroupQuery,
    useGetAllMedicinesQuery,
    useGetAllMedicineTypeQuery,
} from '@/stores/services/medicine'
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Select,
    Table,
    TableProps
} from 'antd'
import { Delete, Edit, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddMedicine from './AddMedicine'
import ManageMedicineGroup from './ManageMedicineGroup'
import ManageMedicineType from './ManageMedicineType'
import UpdateMedicine from './UpdateMedicine'

const { confirm } = Modal;

export type MedicinesType = {
    medicineId: string
    medicineName: string
    ingredient: string
    type: {
        typeId: string
        name: string
        constant: string
    }
    group: {
        groupId: string
        name: string
        constant: string
    }
}

export type TableMedicinesType = {
    key: React.Key
    name: string
    ingredient: string
    type: string
    group: string
}

export default function Medicine() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [openAddNewMedicine, setOpenAddNewMedicine] = useState<boolean>(false)
    const [openUpdateMedicine, setOpenUpdateMedicine] = useState<boolean>(false)
    const [medicineData, setMedicineData] = useState<TableMedicinesType[]>([])

    const [selectedId, setSelectedId] = useState<string>('')
    const [openManageMedicineType, setOpenManageMedicineType] =
        useState<boolean>(false)
    const [openManageMedicineGroup, setOpenManageMedicineGroup] =
        useState<boolean>(false)
    const pageSize = searchParams.get('pageSize') || '8'
    const currentPage = searchParams.get('page') || '1'
    const searchName = searchParams.get('search') || ''
    const selectedMedicineType = searchParams.get('type') || ''
    const selectedMedicineGroup = searchParams.get('group') || ''
    let total: string = ''
    const { medicines, refetch, isFetching, isLoading } = useGetAllMedicinesQuery(
        {
            pageSize: pageSize,
            pageIndex: currentPage,
            medicineName: searchName,
            medicineTypeId: selectedMedicineType,
            medicineGroupId: selectedMedicineGroup,
        },
        {
            selectFromResult: ({ data, isFetching, isLoading }) => {
                total = data?.body?.medicines?.totalPages
                return {
                    medicines: data?.body?.medicines?.contents || [],
                    isFetching,
                    isLoading
                }
            },
        },
    )

    useEffect(() => {
        const result: TableMedicinesType[] = medicines.map(
            (item: MedicinesType, index: number) => {
                return {
                    ...item,
                    key: index,
                    name: item.medicineName,
                    ingredient: item.ingredient,
                    type: item.type.name,
                    group: item.group.name,
                }
            },
        )
        setMedicineData(result)
    }, [medicines])

    const { medicineType } = useGetAllMedicineTypeQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            medicineType: data?.body?.type || [],
            isFetching,
        }),
    })
    const { medicineGroup } = useGetAllMedicineGroupQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            medicineGroup: data?.body?.group || [],
            isFetching,
        }),
    })

    const handleTableChange = (pagination: any) => {
        changeRoute(pagination, {})
        refetch()
    }
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
    const [
        deleteMedicine,
        { isLoading: isDeleting, isSuccess: isDeleteSuccess },
    ] = useDeleteMedicineMutation()

    const handleDeleteMedicine = async (id: string) => {
        confirm({
            title: 'Bạn có chắc không?',
            content: 'Khi bạn xác nhận xóa, dữ liệu sẽ không thể khôi phục',
            okText: 'Có',
            cancelText: 'Không',
            async onOk() {
                try {
                    setSelectedId(id)
                    await deleteMedicine({ id }).unwrap()
                    if (medicines.length === 1 && parseInt(total) > 1) {
                        const page = parseInt(currentPage) - 1
                        changeRoute(
                            {
                                current: page.toString(),
                                pageSize: pageSize,
                            },
                            {
                                type: selectedMedicineType,
                                group: selectedMedicineGroup,
                                search: searchName,
                            },
                        )
                    }
                    refetch()
                    message.success('Xóa thuốc thành công!')
                } catch (error) {
                    message.error('Xóa thuốc thất bại')
                }
            },
        });
    }
    const handleViewService = (id: string) => {
        console.log(id)
        changeRoute({ current: currentPage, pageSize: pageSize }, { type: selectedMedicineType, group: selectedMedicineGroup, search: searchName, viewId: id })
        setOpenUpdateMedicine(true)
    }

    const columns: TableProps<MedicinesType>['columns'] = [
        {
            title: 'Tên thuốc',
            dataIndex: 'medicineName',
            key: 'medicineName',
        },
        {
            title: 'Nhà sản xuất',
            dataIndex: 'manufacture',
            key: 'manufacture',
        },
        {
            title: 'Dạng',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Nhóm thuốc',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'Thành phần',
            dataIndex: 'ingredient',
            key: 'ingredient',
        },
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            render: (value: any, record: any) => (
                <div className="flex flex-row gap-0">
                    <Button
                        type="text"
                        onClick={() => handleViewService(record.medicineId)}
                    >
                        <Edit
                            size={16}
                            className="cursor-pointer text-secondarySupperDarker"
                        />
                    </Button>
                    <Button
                        type="text"
                        loading={selectedId === record.medicineId && isDeleting}
                    >
                        <Delete
                            onClick={() =>
                                handleDeleteMedicine(record.medicineId)
                            }
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
                        Quản lý thuốc
                    </h3>
                    <p>Quản lý các loại thuốc</p>
                </div>
                <div className="flex items-center gap-5">
                    <Button
                        type="primary"
                        className="rounded-lg bg-secondarySupperDarker px-5"
                        onClick={() => setOpenAddNewMedicine(true)}
                    >
                        <Plus size={16} /> THÊM THUỐC MỚI
                    </Button>
                    <AddMedicine
                        refetch={refetch}
                        open={openAddNewMedicine}
                        setOpen={setOpenAddNewMedicine}
                        medicineGroups={medicineGroup}
                        medicineTypes={medicineType}
                    />
                    <Button
                        type="default"
                        className="rounded-lg px-5"
                        onClick={() => setOpenManageMedicineType(true)}
                    >
                        Dạng thuốc
                    </Button>
                    {openManageMedicineType && (
                        <ManageMedicineType
                            open={openManageMedicineType}
                            setOpen={setOpenManageMedicineType}
                        />
                    )}
                    <Button
                        type="default"
                        className="rounded-lg px-5"
                        onClick={() => setOpenManageMedicineGroup(true)}
                    >
                        Nhóm thuốc
                    </Button>
                    {openManageMedicineGroup && (
                        <ManageMedicineGroup
                            open={openManageMedicineGroup}
                            setOpen={setOpenManageMedicineGroup}
                        />
                    )}
                </div>
            </div>
            <div className="flex w-full flex-row justify-between">
                <Form
                    name="basic"
                    autoComplete="off"
                    className="flex w-full flex-row justify-between"
                    layout="horizontal"
                >
                    <Form.Item label="Dạng">
                        <Select
                            className="w-[224px]"
                            placeholder="Dạng"
                            defaultValue={''}
                            onChange={(e) =>
                                changeRoute(
                                    {
                                        current: currentPage,
                                        pageSize: pageSize,
                                    },
                                    {
                                        type: e,
                                        group: selectedMedicineGroup,
                                        search: searchName,
                                    },
                                )
                            }
                        >
                            <Select.Option value={''}>Tất cả</Select.Option>
                            {medicineType.map((item: any) => {
                                return (
                                    <Select.Option
                                        value={item.medicineTypeId}
                                        key={item.medicineTypeId}
                                    >
                                        {item.name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Nhóm thuốc">
                        <Select
                            className="w-[224px]"
                            placeholder="Dạng"
                            defaultValue={''}
                            onChange={(e) => changeRoute(
                                {
                                    current: currentPage,
                                    pageSize: pageSize,
                                },
                                {
                                    type: selectedMedicineType,
                                    group: e,
                                    search: searchName,
                                },
                            )}
                        >
                            <Select.Option value={''}>Tất cả</Select.Option>
                            {medicineGroup.map((item: any) => {
                                return (
                                    <Select.Option
                                        value={item.medicineGroupId}
                                        key={item.medicineGroupId}
                                    >
                                        {item.name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Tìm kiếm">
                        <Input
                            placeholder="Nhập tên thuốc"
                            onChange={(e) => changeRoute(
                                {
                                    current: currentPage,
                                    pageSize: pageSize,
                                },
                                {
                                    type: selectedMedicineType,
                                    group: selectedMedicineGroup,
                                    search: e.target.value,
                                },
                            )}
                        ></Input>
                    </Form.Item>
                </Form>
            </div>

            <div>
                <Table
                    scroll={{ x: 'max-content' }}
                    className="overflow-hidden rounded-lg shadow-third"
                    columns={columns}
                    dataSource={medicineData}
                    pagination={{
                        current: parseInt(currentPage),
                        pageSize: parseInt(pageSize),
                        total: parseInt(pageSize) * (parseInt(total)),
                    }}
                    onChange={handleTableChange}
                    loading={isLoading}
                />
            </div>
            <UpdateMedicine open={openUpdateMedicine} setOpen={setOpenUpdateMedicine} medicineGroups={medicineGroup} medicineTypes={medicineType} refetch={refetch} />
        </div>
    )
}
