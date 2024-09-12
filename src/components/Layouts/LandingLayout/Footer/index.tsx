'use client'
import Image from 'next/image'
import React from 'react'

import ImageFooter from '@public/landing/images/FooterImage.jpg'
import FemaleDoctor from '@public/landing/images/FemaleDoctor.png'
import QR from '@public/landing/images/QR.png'
import ZaloLogo from '@public/landing/images/Zalo.png'
import FacebookLogo from '@public/landing/images/Facebook.png'
import FaceBookLogo2 from '@public/landing/images/Facebook2.png'
import InstagramLogo from '@public/landing/images/instagram.png'
import BoCongThuong from '@public/landing/images/bocongthuong.webp'
import DaDangKy from '@public/landing/images/dadangky.webp'

import { Irish_Grover } from 'next/font/google'

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

function Footer() {
    console.log(irishGrover.style)

    return (
        <div className="flex h-fit w-full flex-col justify-center">
            <div className="relative h-[166px] w-full">
                <div className="h-1/2 w-full bg-[#F7FCFE]"></div>
                <div className="h-1/2 w-full bg-[#D8EBFA]"></div>
                <div className="absolute left-0 top-0 flex h-full w-full justify-center">
                    <div className="h-ful flex w-[1440px] max-w-[1440px] flex-col px-[80px]">
                        <div className="h-[166px] w-full bg-none px-[20px]">
                            <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-black">
                                <div className="h-[166px] w-[1240px] select-none">
                                    <Image
                                        src={ImageFooter}
                                        width={1440}
                                        alt="footerImg"
                                        className="object-cover"
                                    ></Image>
                                </div>
                                <div className="absolute left-0 top-0 flex h-full w-full flex-row">
                                    <div className="flex h-full w-[80%] flex-col gap-3 p-[30px]">
                                        <div>
                                            <h1 className="text-[30px] font-bold leading-tight text-white">
                                                Sức khỏe của bạn là ưu tiên hàng
                                                đầu của chúng tôi!
                                            </h1>
                                        </div>
                                        <div className="flex flex-row items-center gap-5">
                                            <h3 className="text-[20px] font-bold text-white">
                                                Phương thức liên hệ khác:
                                            </h3>
                                            <div className="flex flex-row items-center justify-center overflow-hidden rounded-[12px] bg-white p-[4px]">
                                                <div className="h-[50px] w-[50px]">
                                                    <Image
                                                        src={QR}
                                                        alt="QR"
                                                        width={200}
                                                        height={200}
                                                        className="object-cover"
                                                    ></Image>
                                                </div>
                                                <div className="h-[28px] w-[28px]">
                                                    <Image
                                                        src={ZaloLogo}
                                                        alt="ZaloLogo"
                                                        width={200}
                                                        height={200}
                                                        className="object-cover"
                                                    ></Image>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center justify-center overflow-hidden rounded-[12px] bg-white p-[4px]">
                                                <div className="h-[50px] w-[50px]">
                                                    <Image
                                                        src={QR}
                                                        alt="QR"
                                                        width={200}
                                                        height={200}
                                                        className="object-cover"
                                                    ></Image>
                                                </div>
                                                <div className="h-[32px] w-[32px]">
                                                    <Image
                                                        src={FacebookLogo}
                                                        alt="FacebookLogo"
                                                        width={200}
                                                        height={200}
                                                        className="object-cover"
                                                    ></Image>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h3 className="rounded-xl bg-white px-[20px] py-[12px] text-center text-[16px] font-bold text-secondaryDark">
                                                    Giảm 15% cho lần khám đầu
                                                    tiên
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex h-full w-[20%] items-center justify-center">
                                        <div className="h-[180px] w-[167px]">
                                            <Image
                                                src={FemaleDoctor}
                                                alt="FemaleDoctor"
                                                className="object-cover"
                                            ></Image>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex h-fit w-full justify-center bg-[#D8EBFA] pb-[60px] pt-[40px]">
                <div className="w-[1440px] px-[80px]">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[25px]">
                                <h1
                                    className="text-start text-[38px] leading-3 text-secondaryDark"
                                    style={irishGrover.style}
                                >
                                    P-CLINIC
                                </h1>
                                <p className="max-w-[248px] opacity-65">
                                    Phòng khám tư nhân chuyên về nội khoa, với
                                    sứ mệnh mang đến dịch vụ y tế chất lượng cao
                                    và cá nhân hóa cho mỗi bệnh nhân.
                                </p>
                                <ul className="flex max-w-[248px] flex-col gap-[10px]">
                                    <li>
                                        <span className="font-bold">
                                            Địa chỉ:
                                        </span>{' '}
                                        236/29/18 Điện Biên Phủ - Phường 17 -
                                        Quận Bình Thạnh - TPHCM
                                    </li>
                                    <li>
                                        <span className="font-bold">
                                            Website:
                                        </span>
                                        pclinic.com.vn
                                    </li>
                                    <li>
                                        <span className="font-bold">
                                            Email:
                                        </span>
                                        supports@pclinic.com
                                    </li>
                                    <li>
                                        <span className="font-bold">
                                            Điện thoại:
                                        </span>{' '}
                                        (028) 710 78098
                                    </li>
                                </ul>
                            </div>
                            <div className="flex w-fit flex-row gap-3">
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-secondaryDark bg-white">
                                    <div className="h-[15px] w-[15px]">
                                        <Image
                                            src={ZaloLogo}
                                            width={200}
                                            height={200}
                                            alt="logo"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                </div>
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-secondaryDark bg-[#0084c7]">
                                    <div className="flex h-[28px] w-[28px] items-center justify-center">
                                        <Image
                                            src={FaceBookLogo2}
                                            width={200}
                                            height={200}
                                            alt="logo"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                </div>
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-secondaryDark bg-white">
                                    <div className="h-[15px] w-[15px]">
                                        <Image
                                            src={InstagramLogo}
                                            width={200}
                                            height={200}
                                            alt="logo"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">DỊCH VỤ</h4>
                            <ul className="flex flex-col gap-3">
                                <li>Đặt khám tại cơ sở</li>
                                <li>Đặt khám theo bác sĩ</li>
                                <li>Tư vấn sức khỏe qua video</li>
                                <li>Y tế tại nhà</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">TRỢ GIÚP</h4>
                            <ul className="flex flex-col gap-3">
                                <li>Hướng dẫn đặt lịch</li>
                                <li>Hướng dẫn hệ thống</li>
                                <li>Quy trình hoàn tiền</li>
                                <li>Quy trình khám bệnh</li>
                                <li>Các câu hỏi thường gặp</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">DỊCH VỤ</h4>
                            <ul className="flex flex-col gap-3">
                                <li>Đặt khám tại cơ sở</li>
                                <li>Đặt khám theo bác sĩ</li>
                                <li>Tư vấn sức khỏe qua video</li>
                                <li>Y tế tại nhà</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">F A Q</h4>
                            <ul className="flex flex-col gap-3">
                                <li>Tài khoản</li>
                                <li>Quản lý</li>
                                <li>Đặt dịch vụ</li>
                                <li>Thanh toán</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">Hợp tác</h4>
                            <ul className="flex flex-col gap-3">
                                <li>Liên hệ</li>
                                <li>Khám sức khỏe chuyên khoa</li>
                                <li>Hổ trợ tư vấn tuyển dụng</li>
                                <li>Bài báo y tế</li>
                                <li>
                                    <a href="#">
                                        <Image
                                            src={DaDangKy}
                                            alt="dadangky"
                                            width={400}
                                            className="w-[70px] object-cover"
                                        ></Image>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Image
                                            src={BoCongThuong}
                                            alt="dadangky"
                                            width={400}
                                            className="w-[70px] object-cover"
                                        ></Image>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-fit w-full justify-center bg-secondaryDark py-4">
                <div className="flex w-[1440px] max-w-[1440px] items-center justify-center">
                    <p className="text-white">
                        Bản quyền thuộc về Công ty TNHH 5AE © 2024, All
                        Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
