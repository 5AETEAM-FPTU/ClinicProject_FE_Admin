"use client";
import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, MedicineBoxOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './style.css';
import { useAppDispatch } from '@/hooks/redux-toolkit';
import { useCreateStaffMutation, useGetStaffTypeQuery } from '@/stores/services/admin';
import { setLoaded, setLoading } from '@/stores/features/loading';
import { useSearchParams } from 'next/navigation';
import webStorageClient from '@/utils/webStorageClient';
import { decodeJWT, isJwtExpired } from '@/lib/utils';

const { Option } = Select;

export default function CreateUserForm() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const [form] = Form.useForm();
    const [staffTypes, setStaffTypes] = React.useState([]);
    const dipatch = useAppDispatch();
    const { data: staffTypesFetch, error, isLoading } = useGetStaffTypeQuery();
    const [createDoctor] = useCreateStaffMutation();
    useEffect(() => {
        if (isLoading) dipatch(setLoading())
        else dipatch(setLoaded())
        if (staffTypesFetch?.body?.doctorStaffTypes) {
            setStaffTypes(staffTypesFetch.body.doctorStaffTypes);
        }
        console.log(staffTypes);
    }, [staffTypesFetch]);
    const onFinish = async (values: any) => {
        dipatch(setLoading())
        const result = await createDoctor({ ...values, dob: new Date(values.dob?.format('YYYY-MM-DD')).toISOString() });
        dipatch(setLoaded())
        if (result.error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau');
            console.log(result.error);
        } else {
            message.success('Tạo mới thành công');
            form.resetFields();
            console.log(result.data);
        }
    };

    return (
        <div className="w-full mx-auto p-8 xl:w-4/5 bg-[#F7FBFC] bg-white custom-shadow rounded-lg">
            <h2 className="text-4xl font-bold mb-6 text-[#003553]">Tạo mới</h2>
            <p className="mb-5 text-left text-base text-gray-700">Hãy nhập các thông tin cần thiết để tạo tài khoản người dùng</p>

            <Form
                form={form}
                name="createUser"
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
            >
                <Row gutter={16}>
                    {/* Họ và tên */}
                    <Col md={24} lg={12}>
                        <Form.Item
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                            validateTrigger="onBlur"
                        >
                            <div>
                                <label htmlFor="fullName" className='text-base font-medium mb-2 block text-[#003553]'>Họ và tên</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60" prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
                            </div>
                        </Form.Item>
                    </Col>

                    {/* Email */}
                    <Col md={24} lg={12}>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' }
                            ]}
                            validateTrigger="onBlur"
                        >
                            <div>
                                <label htmlFor="email" className='text-base font-medium mb-2 block text-[#003553]'>Email</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60" prefix={<MailOutlined />} placeholder="nguyenvana@example.com" />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Số điện thoại */}
                    <Col md={24} lg={12}>
                        <Form.Item
                            name="phoneNumber"
                            rules={[{ pattern: /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/, message: 'Số điện thoại không hợp lệ' }]}
                            validateTrigger="onBlur"
                        >
                            <div>
                                <label htmlFor="phoneNumber" className='text-base font-medium mb-2 block text-[#003553]'>Số điện thoại (Không bắt buộc)</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60" prefix={<PhoneOutlined />} placeholder="0123456789" />
                            </div>
                        </Form.Item>
                    </Col>

                    {/* Giới tính */}
                    <Col md={24} lg={12}>
                        <Form.Item name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
                            <div>
                                <label htmlFor="gender" className='text-base font-medium mb-2 block text-[#003553]'>Giới tính</label>
                                <Select onChange={(value) => form.setFieldsValue({ gender: value })} className="border box-sizing rounded-md w-full px-5 border-[#003553] text-[#003553] font-medium h-full" placeholder="Chọn giới tính">
                                    <Option value="male">Nam</Option>
                                    <Option value="female">Nữ</Option>
                                    <Option value="other">Khác</Option>
                                </Select>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Ngày sinh */}
                    <Col md={24} lg={12}>
                        <Form.Item name="dob">
                            <div>
                                <label htmlFor="dob" className='text-base font-medium mb-2 block text-[#003553]'>Ngày sinh</label>
                                <DatePicker format="YYYY-MM-DD" className="border-[#003553] w-full bg-transparent py-3 px-5 h-[51.14px] placeholder:text-semibold text-base text-semibold" placeholder="Chọn ngày sinh" onChange={(date) => form.setFieldsValue({ dob: date })} />
                            </div>
                        </Form.Item>
                    </Col>

                    {/* Địa chỉ */}
                    <Col md={24} lg={12}>
                        <Form.Item name="address">
                            <div>
                                <label htmlFor="address" className='text-base font-medium mb-2 block text-[#003553]'>Địa chỉ</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60" prefix={<HomeOutlined />} placeholder="Số nhà, Đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Chuyên khoa */}
                    <Col md={24} lg={12}>
                        <Form.Item name="specialty">
                            <div>
                                <label htmlFor="specialty" className='text-base font-medium mb-2 block text-[#003553]'>Chuyên khoa</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60" prefix={<MedicineBoxOutlined />} placeholder="Nhập chuyên khoa" />
                            </div>
                        </Form.Item>
                    </Col>

                    {/* Vị trí làm việc */}
                    <Col md={24} lg={12}>
                        <Form.Item name="position">
                            <div>
                                <label htmlFor="position" className='text-base font-medium mb-2 block text-[#003553]'>Vị trí làm việc</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60" prefix={<EnvironmentOutlined />} placeholder="Nhập vị trí làm việc" />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Loại tài khoản */}
                    <Col md={24} lg={12}>
                        <Form.Item name="doctorStaffId">
                            <div>
                                <label htmlFor="doctorStaffId" className='text-base font-medium mb-2 block text-[#003553]'>Loại tài khoản</label>
                                <Select defaultValue={type} onChange={(value) => form.setFieldsValue({ doctorStaffId: value })} className="border box-sizing rounded-md w-full px-5 border-[#003553] text-[#003553] font-medium h-full" placeholder="Chọn loại tài khoản">
                                    {staffTypes.map((type: any) => (
                                        <Option key={type.id} className="font-medium text-base" value={type.id}>{type.typeName}</Option>
                                    ))}
                                </Select>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Nút tiếp theo */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold !border-[#0284C7] text-md py-[10px] box-content h-[31px] px-0">
                        Tạo mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
