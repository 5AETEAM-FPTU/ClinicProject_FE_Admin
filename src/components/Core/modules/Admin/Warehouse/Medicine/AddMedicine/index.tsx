'use client'
import { useCreateNewMedicineMutation, useGetMedicineByIdQuery } from '@/stores/services/medicine'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { RotateCcw } from 'lucide-react'
import React from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    medicineTypes: any
    medicineGroups: any
    refetch: any
}

export default function AddMedicine({
    open,
    setOpen,
    medicineGroups,
    medicineTypes,
    refetch,
}: TProps) {
    const [createNewMedicine, { isLoading, isSuccess }] =
        useCreateNewMedicineMutation()
    const [myForm] = Form.useForm()
    const onFinish = async (values: any) => {
        try {
            await createNewMedicine(values).unwrap()
            message.success('Thêm thuốc thành công!')
            setOpen(false)
            refetch()
            myForm.resetFields()
        } catch (error) {
            message.error('Thêm thuốc thất bại!')
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
                            Thêm thuốc mới{' '}
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
                name="basic"
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
                            className="px-2"
                            onClick={() => myForm.resetFields()}
                        >
                            <RotateCcw size={16} />
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-secondaryDarker"
                            loading={isLoading}
                        >
                            Thêm mới
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
