'use client'
import CommonSection from '@/components/Core/common/CommonSection'
import Image from 'next/image'
import React from 'react'
import BannerImage from '@public/landing/images/banner.webp'

import { Montserrat } from 'next/font/google'
import HeaderIcon from '@public/landing/icons/heartbeat.svg'
import EmailBulk from '@public/landing/icons/mail-bulk.svg'
import { SendHorizontal } from 'lucide-react'

import BannerImage1 from '@public/landing/images/img1.webp'
import BannerImage2 from '@public/landing/images/img2.webp'
import BannerImage3 from '@public/landing/images/img3.webp'
import BannerImage4 from '@public/landing/images/img4.webp'
import BannerImage5 from '@public/landing/images/img5.webp'
import BannerImage6 from '@public/landing/images/img6.webp'

const montserrat = Montserrat({ subsets: ['latin'] })

function Banner() {
    return (
        <div className="flex h-fit w-full select-none justify-center z-0 mt-[128px]" >
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
                                Nền tảng công nghệ{' '}
                            </h1>
                            <div className={montserrat.className}>
                                <div className="relative">
                                    <h1 className="max-w-[850px] text-center text-[46px] font-bold leading-none text-secondaryDarker">
                                        Phòng khám tư nhân <br />
                                        Chuyên nội khoa P-Clinic 
                                    </h1>
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
                            <div className="tras flex h-fit w-[540px] flex-row rounded-xl border-2 border-secondaryDark bg-white hover:drop-shadow-xl transition-all">
                                <div className="px-5 py-[15px]">
                                    <Image src={EmailBulk} alt="icon"></Image>
                                </div>
                                <input
                                    className="w-[65%] rounded-xl border-none py-[15px] pr-2 focus:outline-none"
                                    placeholder="Nhập số điện thoại hoặc email của bạn"
                                    max={36}
                                ></input>
                                <div className="w-[40%] rounded-r-md bg-secondaryDark px-5 py-[15px]">
                                    <button className="flex h-full w-full flex-row justify-center gap-5 rounded-r-md border-none bg-secondaryDark text-white">
                                        <p className="font-extrabold text-white">
                                            Nhận tư vấn
                                        </p>
                                        <SendHorizontal color="white" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-[18px] font-semibold text-secondaryDark">
                                Đặt khám nhanh - Tư vấn sức khỏe từ xa - Hỗ trợ
                                24h
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-fit w-full justify-center">
                    <div className="relative bottom-[80px] h-fit w-[1440px] px-[180px]">
                        <div className="flex h-fit w-full flex-row justify-between gap-[30px] p-5">
                            <div className="shadow-primary flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage1} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    Đặt khám theo bác sĩ
                                </p>
                            </div>
                            <div className="shadow-primary flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage2} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    Đặt lịch khám tại cơ sở
                                </p>
                            </div>
                            <div className="shadow-primary flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage3} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    Tư vấn sức khỏe qua video
                                </p>
                            </div>
                            <div className="shadow-primary flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage4} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    Xét nghiệm nhanh chóng
                                </p>
                            </div>
                            <div className="shadow-primary flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage5} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    Y tế tại nhà bệnh nhân
                                </p>
                            </div>
                            <div className="shadow-primary flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage6} alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark">
                                    Thanh toán qua hệ thống
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
