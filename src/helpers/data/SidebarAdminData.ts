import { IndividualMenuItemType } from '@/components/Core/ui/Menu'
import {
    CalendarDays,
    CalendarHeart,
    CircleUserRound,
    Headset,
    Home,
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
        icon: React.createElement(CalendarHeart),
        childrens: [
            {
                key: 'doctors',
                lable: 'Bác sĩ',
            },
            {
                key: 'create-user',
                lable: 'Tạo mới người dùng',
            },
            {
                key: 'treatment-cancel',
                lable: 'Bị hủy bỏ',
            },
        ],
    },
    {
        key: 'treatment-calendar',
        title: 'Lịch khám',
        icon: React.createElement(CalendarDays),
        childrens: [
            {
                key: 'recently',
                lable: 'Gần đây',
            },
            {
                key: 'update-calendar',
                lable: 'Cập nhật lịch',
            },
            {
                key: 'booked-calendar',
                lable: 'Lịch đã đặt',
            },
            {
                key: 'retreatment',
                lable: 'Tái khám',
            },
        ],
    },
    {
        key: 'consultation',
        title: 'Tư vấn',
        icon: React.createElement(Headset),
        childrens: [
            {
                key: 'pending-room',
                lable: 'Phòng chờ',
            },
            {
                key: 'conversation',
                lable: 'Trò chuyện',
            }
        ],
    },
    {
        key: 'account',
        title: 'Tài khoản',
        icon: React.createElement(CircleUserRound),
        childrens: [
            {
                key: 'profile',
                lable: 'Trang cá nhân',
            },
            {
                key: 'settings',
                lable: 'Thiết lập',
            }
        ]
    },
]
