'use client'
import { useCreateNewServiceMutation } from '@/stores/services/services'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { RotateCcw } from 'lucide-react'
import React from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}
export default function AddService({ open, setOpen, refetch }: TProps) {

    const [createNewService] = useCreateNewServiceMutation();
    const onFinish = async (values: any) => {
        try {
            await createNewService(values).unwrap();
            message.success("Tạo dịch vụ thành công!");
            refetch();
            setOpen(false)
        } catch (error) {
            message.error("Tạo dịch vụ không thành công!")
        }
    }
    const [myForm]  = Form.useForm();

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            centered
            title={
                <>
                    <div>
                        <p className="text-[20px] font-semibold text-secondarySupperDarker">
                            Thêm dịch vụ mới{' '}
                        </p>
                        <p className="text-[14px] text-secondarySupperDarker">
                            Thông tin bắt buộc
                        </p>
                    </div>
                </>
            }
            footer={null}
        >
            <Form name="basic" layout="vertical" onFinish={onFinish} form={myForm}>
                <Form.Item
                    label="Mã dịch vụ"
                    name="code"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Tên dịch vụ"
                    name="name"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Nhóm dịch vụ"
                    name="group"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập dữ liệu"></Input>
                </Form.Item>
                <Form.Item
                    label="Đơn giá"
                    name="price"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input
                        type="number"
                        defaultValue={50000}
                        min={0}
                        max={10000000}
                        placeholder="Nhập giá (vnd)"
                    ></Input>
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập dữ liệu"
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item className="mb-0 flex justify-end">
                    <div className='flex flex-row gap-5'>
                        <Button className="px-2" onClick={() => myForm.resetFields()}>
                            <RotateCcw size={16}/>
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-secondaryDarker"
                        >
                            Thêm mới
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
