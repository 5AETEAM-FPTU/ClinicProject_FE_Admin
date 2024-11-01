/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
'use client'
import { Button, Layout, message, Popover } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import Logo from '@public/main/logo/FinalLogo.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Menu, {
    IndividualMenuItemType,
    TAppPathLayoutState,
} from '../../Core/ui/Menu'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { setLoaded, setLoading } from '@/stores/features/loading'
import { toggleSidebar } from '@/stores/features/sidebar'
import { useRequestLogoutMutation } from '@/stores/services/auth'
import { Bell, Home, Logs, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import AdminImage from '@public/main/admin.png'
import webStorageClient from '@/utils/webStorageClient'
import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import Notifications from './Notifications'
import { useTrigger } from '@/hooks/useTrigger'

const { Header, Sider, Content } = Layout

export interface JwtPayloadUpdated extends JwtPayload {
    role: string
}

export type DashboardProps = {
    children: React.ReactNode
    sidebarItems?: IndividualMenuItemType[]
}

function DashboardLayout({ children, sidebarItems }: DashboardProps) {
    const { collapsed } = useAppSelector((state) => state.sidebar)
    const dispath = useAppDispatch()

    const [appLayoutState, setAppPathLayoutState] =
        useState<TAppPathLayoutState | null>(null)
    const pathname = usePathname()

    const handlePathSegments = () => {
        const segments = pathname.split('/').filter((segment) => segment != '')
        const newAppLayoutState: TAppPathLayoutState = {
            layout: segments[1],
            distance: segments[2],
            destination: segments[3],
        }

        setAppPathLayoutState(newAppLayoutState)
    }

    const [requestLogout] = useRequestLogoutMutation()
    const router = useRouter()
    const handleLogout = async () => {
        dispath(setLoading())
        const result = await requestLogout()
        dispath(setLoaded())
        webStorageClient.removeAll()
        message.success('Đăng xuất thành công')
        router.replace('/sign-in')
      
    }
    useEffect(() => {
        return handlePathSegments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    console.log(appLayoutState)
    const handleRenderDistance = (key: 'distance' | 'destination') => {
        return sidebarItems?.map((item) => {
            if (item.key === appLayoutState?.distance && key === 'distance') {
                return item.title
            } else {
                return item.childrens?.map((child) => {
                    if (
                        child.key === appLayoutState?.destination &&
                        key === 'destination'
                    ) {
                        return child.lable
                    }
                })
            }
        })
    }
    const notifications = useQuery(
        api._user_notifications.functions.getUserNofitication,
        {
            receiverId: jwtDecode<JwtPayloadUpdated>(
                webStorageClient.getToken()!,
            ).sub!,
        },
    )
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { handleTrigger, trigger } = useTrigger()
    const prevNotificationsLength = useRef(notifications?.length)
    useEffect(() => {
        if (audioRef.current && notifications) {
            if (
                prevNotificationsLength.current !== undefined &&
                notifications?.length > prevNotificationsLength.current
            ) {
                if (notifications?.length > prevNotificationsLength.current) {
                    audioRef.current.play();
                }
            }
        }
        prevNotificationsLength.current = notifications?.length;
    }, [notifications]);
    const hasNewNotification = !!notifications?.length
    const numberOfUnreadNotifications = notifications?.filter(
        (notification) => !notification.isRead,
    )


    return (
        <Layout className="!h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={cn(
                    '!min-w-[250px] !bg-dashboardBackgournd',
                    `${collapsed && '!min-w-[80px]'}`,
                )}
            >
                <audio ref={audioRef} preload='auto' src='https://res.cloudinary.com/dy1uuo6ql/video/upload/v1728659255/paowhflbqnlzhj092x2z.mp3' />
                <div className="flex h-fit w-full flex-row items-center justify-center gap-2">
                    <div className="flex flex-row gap-2 border-b-[2px] border-secondaryDark p-4">
                        <div className="h-[45px] w-[45px]">
                            <Image
                                src={Logo}
                                alt="logo"
                                className="object-cover"
                            ></Image>
                        </div>
                        {collapsed ? null : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                            >
                                <p className="text-[24px] font-bold text-secondaryDarker">
                                    ADMIN
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
                <Menu items={sidebarItems!} />
            </Sider>
            <Layout className="!bg-dashboardBackgournd">
                <Header className="flex !h-[74px] w-[calc(100%)] select-none flex-row items-center !bg-dashboardBackgournd !px-[20px] leading-none">
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <Logs className="text-secondarySupperDarker" />
                            ) : (
                                <Logs className="text-secondarySupperDarker" />
                            )
                        }
                        onClick={() => dispath(toggleSidebar())}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="flex w-full flex-row items-center justify-between gap-[20px]">
                        <div className="flex flex-col gap-2">
                            <div className="flex h-fit flex-row items-center gap-2 text-secondarySupperDarker">
                                <Home size={18} />
                                <span>/</span>
                                <p>Trang</p>
                                <span>/</span>
                                <p>{handleRenderDistance('distance')}</p>
                                {appLayoutState?.destination && <span>/</span>}
                                <p>{handleRenderDistance('destination')}</p>
                            </div>
                            <div className="h-fit">
                                <p className="text-[18px] font-semibold text-secondaryDark">
                                    {appLayoutState?.destination
                                        ? handleRenderDistance('destination')
                                        : handleRenderDistance('distance')}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-[100px]">
                            {' '}
                            <div className="flex flex-row items-center gap-5">
                                <Popover
                                    trigger={'click'}
                                    open={trigger}
                                    content={
                                        <Notifications
                                            payload={notifications!}
                                        />
                                    }
                                    onOpenChange={handleTrigger}
                                    overlayClassName={cn(
                                        'rounded-lg shadow-third',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'relative cursor-pointer rounded-lg bg-slate-100 p-[10px] transition-all duration-300 hover:bg-slate-200',
                                            `${trigger ? 'bg-secondaryDarkerOpacity' : ''}`,
                                        )}
                                    >
                                        <Bell size={24} />
                                        {numberOfUnreadNotifications!?.length >
                                            0 && (
                                            <div className="absolute right-[-5px] top-[-5px] flex h-[18px] w-[18px] flex-row items-center justify-center rounded-full bg-red-600">
                                                <p className="text-[10px] text-white">
                                                    {hasNewNotification
                                                        ? numberOfUnreadNotifications?.length
                                                        : null}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Popover>
                                <div className="cursor-pointer rounded-lg bg-slate-100 p-[10px] transition-all duration-300 hover:bg-slate-200">
                                    <Settings size={24} />
                                </div>
                                <div className="h-[30px] w-[2px] bg-secondarySupperDarker"></div>

                                <div className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full">
                                    <Image
                                        src={AdminImage}
                                        alt="avatar"
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-cover"
                                    ></Image>
                                </div>
                                <div
                                    onClick={handleLogout}
                                    className="cursor-pointer text-[16px] font-semibold text-secondarySupperDarker"
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    className="overflow-y-auto bg-dashboardBackgournd !p-[20px] !pb-0"
                    style={{
                        margin: '0px 0px 0px 20px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                    {/* <Footer className='bg-[#F8F9FB] !p-0'>
                        <div className='w-full p-5 flex flex-row gap-5'>
                            <p>© Bản quyền thuộc về Team 5AE © 2024, All Rights Reserved ❤️</p>
                        </div>
                    </Footer> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout
