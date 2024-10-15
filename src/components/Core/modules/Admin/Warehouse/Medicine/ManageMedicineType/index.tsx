'use client'
import {
    useCreateNewMedicineMutation,
    useCreateNewMedicineTypeMutation,
    useDeleteMedicineTypeMutation,
    useGetAllMedicineTypeQuery,
    useUpdateMedicineTypeMutation,
} from '@/stores/services/medicine'
import { Button, Form, Input, InputRef, message, Modal, Select } from 'antd'
import { RotateCcw } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { MedicinesType } from '..'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ManageMedicineType({ open, setOpen }: TProps) {
    const [createNewMedicineType, { isLoading, isSuccess }] =
        useCreateNewMedicineTypeMutation()
    const [newMedicineTypeName, setNewMedicineTypeName] =
        React.useState<string>('')

    const { medicineType, refetch } = useGetAllMedicineTypeQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            medicineType: data?.body?.type || [],
            isFetching,
        }),
    })
    const handleCreateNewMedicineType = async () => {
        try {
            if (newMedicineTypeName) {
                const data = {
                    name: newMedicineTypeName,
                    constant: newMedicineTypeName.toUpperCase().trim(),
                }
                await createNewMedicineType(data).unwrap()
                message.success('Thêm thành công!')
                refetch()
                setNewMedicineTypeName('')
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
                    {medicineType.map((value: any, index: number) => (
                        <MedicineTypeItem
                            payload={value}
                            key={index}
                            index={index}
                            refetch={refetch}
                        />
                    ))}
                </div>
                <div className="flex flex-row gap-2 border-t-2 pt-5">
                    <Input
                        placeholder="Nhập dạng thuốc"
                        size="middle"
                        value={newMedicineTypeName}
                        onChange={(e) => setNewMedicineTypeName(e.target.value)}
                    ></Input>
                    <Button
                        className="bg-secondarySupperDarker"
                        size="large"
                        type="primary"
                        onClick={handleCreateNewMedicineType}
                    >
                        Thêm
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

type TMedicineType = {
    medicineTypeId: string
    name: string
    constant: string
}

type MedinceProps = {
    index: number
    payload: TMedicineType
    refetch: () => void
}
function MedicineTypeItem({ index, payload, refetch }: MedinceProps) {
    const inputRef = React.createRef<InputRef>()
    const [isHasChange, setIsHasChange] = React.useState(false)
    const handleForcus = () => {
        inputRef.current?.focus()
        setIsHasChange(true)
    }
    const [textChange, setTextChane] = React.useState(payload?.name)
    const [updateMedicineType] = useUpdateMedicineTypeMutation()
    const handleUpdateMedicineType = async () => {
        try {
            await updateMedicineType({
                medicineTypeId: payload.medicineTypeId,
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
    const [deleteMedicineType] = useDeleteMedicineTypeMutation()
    const handleDeleteMedicineType = async () => {
        try {
            await deleteMedicineType({ medicineTypeId: payload.medicineTypeId })
            refetch()
            message.success('Xóa dạng thuốc')
        } catch (error) {
            message.error('Xóa dạng thuốc thất bại!')
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
                    setTextChane(e.target.value)
                    setIsHasChange(true)
                }}
            ></Input>
            {!isHasChange ? (
                <Button onClick={handleForcus}>Sửa</Button>
            ) : (
                <Button onClick={() => handleUpdateMedicineType()}>Lưu</Button>
            )}
            <Button
                className="border-red-300 text-red-600"
                onClick={() => handleDeleteMedicineType()}
            >
                Xóa
            </Button>
        </div>
    )
}
