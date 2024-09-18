'use client'
import React from 'react'
import DashboardLayout from '../DashbardLayout'
import { sidebarPatientData } from '@/helpers/data/SidebarPatientData'

function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <DashboardLayout sidebarItems={sidebarPatientData}>
            {children}
        </DashboardLayout>
    )
}

export default AdminLayout
