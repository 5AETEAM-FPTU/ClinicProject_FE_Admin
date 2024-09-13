'use client'
import React from 'react'
import { Irish_Grover } from 'next/font/google'
import FacebookIcon from '@public/landing/icons/Facebook.svg'
import ZaloLogo from '@public/landing/icons/Zalo.svg'
import Image from 'next/image'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { CircleUserRound } from 'lucide-react'
import themeColors from '@/style/themes/default/colors'
import ChangeLanguages from '@/components/Core/common/ChangeLanguage'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'


const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
})

function Header() {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing')

    return (
        <div className="flex h-fit w-full justify-center">
            <div className="flex w-[1440px] max-w-[1440px] flex-row gap-10 px-[80px]">
                <div className="flex items-center justify-center">
                    <div className={irishGrover.className}>
                        <h1 className="text-start text-[38px] text-secondaryDark">
                            P-CLINIC
                        </h1>
                    </div>
                </div>
                <div className="flex w-[calc(100%-195px)] flex-col">
                    <div className="flex w-full justify-between py-[10px]">
                        <div className="flex flex-row gap-[18px]">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={FacebookIcon}
                                    width={32}
                                    height={32}
                                    alt="facebook_icon"
                                />
                                <span className="font-semibold text-secondaryDark">
                                    Facebook
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={ZaloLogo}
                                    width={28}
                                    height={28}
                                    alt="facebook_icon"
                                />
                                <span className="font-semibold text-secondaryDark">
                                    Zalo
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[18px]">
                            <Button
                                type="default"
                                className="!border-[2px] !border-secondaryDark !bg-white !font-semibold !text-secondaryDark"
                            >
                                <CircleUserRound
                                    color={themeColors.secondaryDark}
                                    size={20}
                                />
                                {t("header_accounts")}
                            </Button>
                            <ChangeLanguages/>
                        </div>
                    </div>

                    <div className='w-full flex justify-between'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
