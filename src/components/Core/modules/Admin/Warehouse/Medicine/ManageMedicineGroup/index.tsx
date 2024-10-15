'use client'
import {
    useCreateNewMedicineGroupMutation,
    useDeleteMedicineGroupMutation,
    useGetAllMedicineGroupQuery,
    useUpdateMedicineGroupMutation
} from '@/stores/services/medicine'
import { Button, Input, InputRef, message, Modal } from 'antd'
import React from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ManageMedicineGroup({ open, setOpen }: TProps) {
    const [createNewMedicineGroup, { isLoading, isSuccess }] =
        useCreateNewMedicineGroupMutation()
    const [newMedicineGroupName, setNewMedicineGroupName] =
        React.useState<string>('')

    const { medicineGroup, refetch } = useGetAllMedicineGroupQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            medicineGroup: data?.body?.group || [],
            isFetching,
        }),
    })
    const handleCreateNewMedicineGroup = async () => {
        try {
            if (newMedicineGroupName) {
                const data = {
                    name: newMedicineGroupName,
                    constant: newMedicineGroupName.toUpperCase().trim(),
                }
                await createNewMedicineGroup(data).unwrap()
                message.success('Thêm thành công!')
                refetch()
                setNewMedicineGroupName('')
            }
        } catch (error) {
            message.error('Thêm thất bại!')
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            onOk={() => setOpen(false)}
            centered
            title={
                <>
                    <div>
                        <p className="text-[20px] font-semibold text-secondarySupperDarker">
                            Quản lý dạng thuốc
                        </p>
                    </div>
                </>
            }
            footer={null}
        >
            <div className="flex flex-col gap-2">
                <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
                    {medicineGroup.map((value: any, index: number) => (
                        <MedicineGroupItem
                            payload={value}
                            key={index}
                            index={index}
                            refetch={refetch}
                        />
                    ))}
                </div>
                <div className="flex flex-row gap-2 border-t-2 pt-5">
                    <Input
                        placeholder="Nhập tên nhóm thuốc"
                        size="middle"
                        value={newMedicineGroupName}
                        onChange={(e) =>
                            setNewMedicineGroupName(e.target.value)
                        }
                    ></Input>
                    <Button
                        className="bg-secondarySupperDarker"
                        size="large"
                        type="primary"
                        onClick={handleCreateNewMedicineGroup}
                    >
                        Thêm
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

type TMedicineGroup = {
    medicineGroupId: string
    name: string
    constant: string
}

type MedinceProps = {
    index: number
    payload: TMedicineGroup
    refetch: () => void
}
function MedicineGroupItem({ index, payload, refetch }: MedinceProps) {
    const inputRef = React.createRef<InputRef>()
    const [isHasChange, setIsHasChange] = React.useState(false)
    const handleForcus = () => {
        inputRef.current?.focus()
        setIsHasChange(true)
    }
    const [textChange, setTextChange] = React.useState(payload?.name)
    const [updateMedicineGroup] = useUpdateMedicineGroupMutation()
    const handleUpdateMedicineGroup = async () => {
        try {
            await updateMedicineGroup({
                medicineGroupId: payload.medicineGroupId,
                name: textChange,
                constant: textChange.toUpperCase().trim(),
            })
            refetch()
            setIsHasChange(false)
            message.success('Cập nhật thành công')
        } catch (error) {
            message.error('Cập nhật thất bại!')
        }
    }
    const [deleteMedicineGroup] = useDeleteMedicineGroupMutation()
    const handleDeleteMedicineGroup = async () => {
        try {
            await deleteMedicineGroup({
                medicineGroupId: payload.medicineGroupId,
            })
            refetch()
            message.success('Xóa nhóm thuốc')
        } catch (error) {
            message.error('Xóa nhóm thuốc thất bại!')
        }
    }
    return (
        <div className="flex flex-row gap-2 rounded-lg bg-white">
            <Button disabled className="disabled:bg-white">
                {index < 10 ? `0${index + 1}` : index + 1}{' '}
            </Button>
            <Input
                ref={inputRef}
                placeholder="Dạng thuốc..."
                size="small"
                value={textChange}
                onChange={(e) => {
                    setTextChange(e.target.value)
                    setIsHasChange(true)
                }}
            ></Input>
            {!isHasChange ? (
                <Button onClick={handleForcus}>Sửa</Button>
            ) : (
                <Button onClick={() => handleUpdateMedicineGroup()}>Lưu</Button>
            )}
            <Button
                className="border-red-300 text-red-600"
                onClick={() => handleDeleteMedicineGroup()}
            >
                Xóa
            </Button>
        </div>
    )
}
