'use client'
import React from 'react'
import DashboardLayout from '../DashbardLayout'
import { sidebarAdminData } from '@/helpers/data/SidebarAdminData'

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout sidebarItems={sidebarAdminData}>
            {children}
        </DashboardLayout>
    )
}

export default AdminLayout
