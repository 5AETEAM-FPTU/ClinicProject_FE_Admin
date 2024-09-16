'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input } from 'antd'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'
import RequestEmail from '@public/landing/icons/request-vertifying-email.svg'
import EmailSuccess from '@public/landing/icons/vertify-email-success.svg'
import Image from 'next/image';

export default function EmailVertify() {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter();
    return (
        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
            <div className="mb-8 flex justify-center items-center">
                {/* <VertifyEmailRequest email="abcdef123@gmail.com" /> */}
                <VertifyEmailSuccess />
            </div>
        </div >
    )
}

export function VertifyEmailRequest({ email }: { email: string }) {
    return (
        <div className="w-full max-w-md">
            <div className="mb-12 flex justify-center items-center">
                <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
            </div>
            <div className="mb-4 flex justify-center items-center">
                <Image src={RequestEmail} alt="Request email" />
            </div>
            <h2 className="mb-1 text-2xl font-semibold text-center">Xác thực email của bạn</h2>
            <p className="mb-8 text-gray-600 text-center">
                Bạn đã gửi đường link xác thực đến <strong>{email}</strong> để kích hoạt tài khoản
            </p>
            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Gửi lại</Button>
        </div>
    )
}

export function VertifyEmailSuccess() {
    const router = useRouter();
    return (
        <div className="w-full max-w-md">
            <div className="mb-12 flex justify-center items-center">
                <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
            </div>
            <div className="mb-2 flex justify-center items-center">
                <Image src={EmailSuccess} alt="Email success" />
            </div>
            <h2 className="mb-1 text-2xl font-semibold text-center">Xác thực email thành công</h2>
            <p className="mb-8 text-gray-600 text-center">
                Bây giờ bạn có thể đăng nhập và tận hưởng dịch vụ
            </p>
            <Button size='large' className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={() => router.replace('sign-in')}>Đăng nhập ngay</Button>
        </div>
    )
}
