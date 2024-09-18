import constants from '@/settings/constants'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from "next/image"
import React from 'react'
import AuthBanner from '@public/landing/images/auth-banner.png'

function AuthRootLayout({ children }: { children: React.ReactNode }) {

    const _accessToken = getCookie(constants.ACCESS_TOKEN, { cookies })

    if (_accessToken) {
        redirect("/dashboard/overview");
    }

    return (
        <div className="flex justify-center items-center !h-screen">
            {children}
        </div>
    );
}

export default AuthRootLayout
