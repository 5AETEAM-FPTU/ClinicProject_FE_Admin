'use client'
import Image from 'next/image'
import React from 'react'

import { Montserrat } from 'next/font/google'
import { SendHorizontal } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

import BannerImage from '@public/landing/images/banner.webp'
import EmailBulk from '@public/landing/icons/mail-bulk.svg'
import BannerImage1 from '@public/landing/images/img1.webp'
import BannerImage2 from '@public/landing/images/img2.webp'
import BannerImage3 from '@public/landing/images/img3.webp'
import BannerImage4 from '@public/landing/images/img4.webp'
import BannerImage5 from '@public/landing/images/img5.webp'
import BannerImage6 from '@public/landing/images/img6.webp'

import {motion} from 'framer-motion';

const montserrat = Montserrat({ subsets: ['latin'] })

function Banner() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    return (
        <div className="z-0 mt-[128px] flex h-fit w-full select-none justify-center">
            <div className="relative w-[1920px]">
                <div className="relative flex h-fit w-full justify-center">
                    <Image
                        src={BannerImage}
                        width={2000}
                        height={500}
                        alt="banner"
                        className="pointer-events-none select-none object-contain"
                        priority
                    ></Image>
                    <div className="absolute h-fit w-[1440px]">
                        <div className="relative flex h-full w-full flex-col items-center gap-5 pt-[60px]">
                            <h1 className="font-semibold text-secondaryDark">
                                {t('banner_platform')}
                            </h1>
                            <div className={montserrat.className}>
                                <div className="relative">
                                    <h1
                                        className="max-w-[850px] text-center text-[46px] font-bold leading-none text-secondaryDarker"
                                        dangerouslySetInnerHTML={{
                                            __html: t('banner_title'),
                                        }}
                                    ></h1>
                                    {/* <div className="absolute bottom-[-5px] right-[-60px]">
                                        <Image
                                            src={HeaderIcon}
                                            alt="icon"
                                            width={50}
                                            height={50}
                                        ></Image>
                                    </div> */}
                                </div>
                            </div>
                            <div className="tras flex h-fit w-[540px] flex-row rounded-xl border-2 border-secondaryDark bg-white transition-all hover:drop-shadow-xl">
                                <div className="px-5 py-[15px]">
                                    <Image src={EmailBulk} alt="icon"></Image>
                                </div>
                                <input
                                    className="w-[65%] rounded-xl border-none py-[15px] pr-2 focus:outline-none"
                                    placeholder={t('banner_contact')}
                                    max={36}
                                ></input>
                                <div className="w-[40%] rounded-r-md bg-secondaryDark px-5 py-[15px]">
                                    <button className="flex h-full w-full flex-row justify-center gap-5 rounded-r-md border-none bg-secondaryDark text-white">
                                        <p className="font-extrabold text-white">
                                            {t('banner_contact_send')}
                                        </p>
                                        <SendHorizontal color="white" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-[18px] font-semibold text-secondaryDark">
                                {t('banner_subtitle')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-fit w-full justify-center">
                    <div className="relative bottom-[80px] h-fit w-[1440px] px-[180px]">
                        <div className="flex h-fit w-full flex-row justify-between gap-[30px] p-5">
                            <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage1} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    {t('banner_service_1')}
                                </p>
                            </div>
                            <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage2} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    {t('banner_service_2')}
                                </p>
                            </div>
                            <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage3} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    {t('banner_service_3')}
                                </p>
                            </div>
                            <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage4} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    {t('banner_service_4')}
                                </p>
                            </div>
                            <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage5} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    {t('banner_service_5')}
                                </p>
                            </div>
                            <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage6} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    {t('banner_service_6')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
