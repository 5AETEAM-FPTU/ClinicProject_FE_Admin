'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input } from 'antd'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'

export default function RecoverComponent() {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter();
    return (
        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
            <div className="mb-8 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex justify-center items-center">
                        <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
                    </div>
                    <p className="mb-6 text-lg text-gray-700 text-center">Vui lòng đổi lại mật khẩu</p>
                    <form className="space-y-4">
                        <Input type="password" placeholder="Mật khẩu mới" />
                        <Input type="password" placeholder="Nhập lại mật khẩu" />
                        <Button size='large' className="w-full bg-blue-500 text-white hover:bg-blue-600">Đổi mật khẩu</Button>
                    </form>
                </div>
            </div>
        </div >
    )
}
