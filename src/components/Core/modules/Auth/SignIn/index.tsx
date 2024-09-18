'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input, ConfigProvider, Form } from 'antd'
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'

export default function SignInComponent() {
    const params = useParams();
    const [form] = Form.useForm();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter();
    const handleSubmit = (values: any) => {

    }
    return (
        <div className="w-full lg:w-1/2 p-8">
            <ConfigProvider wave={{ disabled: true }}>
                <Button className="m-8 p-0 border-none">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="mb-8 flex justify-center items-center mt-10">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex justify-center items-center">
                        <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
                    </div>
                    <p className="mb-6 text-lg text-gray-700 text-center">Vui lòng nhập email hoặc số điện thoại và mật khẩu</p>
                    <Form className="space-y-4" form={form} onFinish={handleSubmit}>
                        <Form.Item
                            name="emailOrPhone"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email hoặc số điện thoại"
                                },
                                {
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.resolve(); // If empty, handled by 'required'
                                        }

                                        // Email regex
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                        // Vietnamese phone number regex (starts with +84 or 0 and has 9 or 10 digits)
                                        const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

                                        if (emailRegex.test(value) || phoneRegex.test(value)) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Vui lòng nhập email hoặc số điện thoại hợp lệ'));
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="Email hoặc số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            className='mb-12'
                            hasFeedback
                            validateDebounce={500}
                            name="password"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu" },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message: "Mật khẩu phải chứa ít nhất 8 ký tự, chữ cái viết hoa, chữ cái viết thường và ít nhất 1 chữ số"
                                }
                            ]}
                        >
                            <Input type="password" placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' className="w-full bg-blue-500 text-white hover:bg-blue-600" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>                   
                </div>
            </div>
        </div>
    )
}
