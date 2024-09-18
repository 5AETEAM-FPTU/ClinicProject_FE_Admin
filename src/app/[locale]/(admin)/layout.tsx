import AdminLayout from '@/components/Layouts/AdminLayout/page'
import { constants } from '@/settings'
import { getCookie } from 'cookies-next'
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function AdminRootLayout({ children }: { children: React.ReactNode }) {
    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })

    if (!_accessToken_Cookie) {
        redirect('/sign-in')
    }
    return <AdminLayout>{children}</AdminLayout>
}

export default AdminRootLayout
