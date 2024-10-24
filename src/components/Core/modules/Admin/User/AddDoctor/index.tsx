import { useGetAllGenderQuery, useGetAllPositionQuery, useGetAllSpecicaltiesQuery } from "@/stores/services/enum"
import { useAddDoctorMutation } from "@/stores/services/user/user"
import { Button, DatePicker, Form, Input, message, Modal, Select, SelectProps } from "antd"
import dayjs from "dayjs"

interface IProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}

interface Position {
    id: string,
    positionName: string,
    constant: string
}

interface Specialty {
    id: string,
    specialtyName: string,
    constant: string
}

export default function AddDoctor({ open, setOpen, refetch }: IProps) {
    const [myForm] = Form.useForm();

    const { positions } = useGetAllPositionQuery(undefined, {
        selectFromResult: ({ data }) => ({
            positions: data?.body?.positions as Position[] || [],
        }),
    });
    const { specialties } = useGetAllSpecicaltiesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            specialties: data?.body?.specialties as Specialty[] || [],
        }),
    });
    const options: SelectProps['options'] = specialties?.map((specialty) => ({ id: specialty.id, label: specialty.specialtyName, value: specialty.id }))

    const [addDoctorFunc, { isLoading }] = useAddDoctorMutation()
    const onFinish = async (values: any) => {

        const updateValue = { ...values, dob: dayjs(values.dob).format('YYYY-MM-DDT00:00:00') }
        try {
            console.log(updateValue);

            await addDoctorFunc(updateValue).unwrap()
            message.success('Thêm bác sĩ thành công')
            refetch()
            setOpen(false)
            myForm.resetFields()
        } catch {
            message.error('Thêm bác sĩ thất bại')
        }

    }

    return <Modal
        open={open} centered onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={null}
        className="md:w-[80%] w-100%">
        <div>
            <h2 className="text-[#003553] font-bold text-xl">Tạo mới bác sĩ</h2>
            <p className="text-xs font-semibold text-secondarySupperDarker text-opacity-60 mt-1 mb-6">Thông tin bắt buộc</p>
            <Form
                name="basic" layout="vertical" onFinish={onFinish} form={myForm}
                className=" text-[#003553]">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Input placeholder="Ví dụ: Nguyễn Văn A"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Input placeholder="Ví dụ: abcdgeg@email.com"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Input placeholder="Ví dụ: 0948379256"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="genderId"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value="976e9fad-fc68-4ce9-99c3-7f4bfe6c6c76">Nam</Select.Option>
                            <Select.Option value="a6283987-8954-4502-8638-d2dd96ff8913">Nữ</Select.Option>
                            <Select.Option value="00000000-0000-0000-0000-000000000000">Khác</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="dob"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <DatePicker
                            className="w-full h-full"
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày sinh"
                        />

                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Input placeholder="Ví dụ: Thôn A, Xã B, Huyện C"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Chuyên khoa"
                        name="specialtyIds"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Select
                            mode="tags"
                            size={"large"}
                            placeholder="Chọn chuyên khoa"
                            defaultValue={[]}
                            // onChange={handleChange}
                            // style={{ width: '100%' }}
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Select placeholder="Chọn vai trò">
                            <Select.Option key={1} value="doctor">Bác sĩ</Select.Option>
                            <Select.Option key={2} value="staff">Nhân viên</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Vị trí làm việc"
                        name="positionId"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                    >
                        <Select placeholder="Chọn vị trí">
                            {positions.map((position) => (<Select.Option key={position.id} value={position.id}>{position.positionName}</Select.Option>))}
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item className="mb-0 flex justify-end">
                    <div className='flex flex-row p-6'>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-secondaryDarker"
                            loading={isLoading}
                        >
                            Tạo
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>

    </Modal>
}