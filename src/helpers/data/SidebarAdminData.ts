import { IndividualMenuItemType } from '@/components/Core/ui/Menu'
import {
    Bell,
    Box,
    BriefcaseMedical,
    Home,
    User,
} from 'lucide-react'
import React from 'react'

export const sidebarAdminData: IndividualMenuItemType[] = [
    {
        key: 'overview',
        title: 'Tổng quan',
        icon: React.createElement(Home),
    },
    {
        key: 'user',
        title: 'Người dùng',
        icon: React.createElement(User),
        childrens: [
            {
                key: 'clinic',
                lable: 'Phòng khám',
            },
            {
                key: 'patient',
                lable: 'Bệnh nhân',
            },
        ],
    },
    {
        key: 'treatment',
        title: 'Khám bệnh',
        icon: React.createElement(BriefcaseMedical),
        childrens: [
            {
                key: 'appointments',
                lable: 'Đặt lịch',
            },
            {
                key: 'reports',
                lable: 'Phiếu khám',
            },
        ],
    },
    {
        key: 'notification',
        title: 'Thông báo',
        icon: React.createElement(Bell),
        childrens: [
            {
                key: 'system-notification',
                lable: 'Hệ thống',
            },
            {
                key: 'contacts',
                lable: 'Contacts',
            },
        ],
    },
    {
        key: 'warehouse',
        title: 'Tổng kho',
        icon: React.createElement(Box),
        childrens: [
            {
                key: 'services',
                lable: 'Kho dịch vụ',
            },
            {
                key: 'medicines',
                lable: 'Kho thuốc',
            }
        ],
    },
]
