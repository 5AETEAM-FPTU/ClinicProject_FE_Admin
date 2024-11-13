"use client"

import { useGetStaticInformationQuery } from "@/stores/services/admin"
import RevenueChart from "./RevenueChart"
import { useEffect, useState } from "react";
import AppointmentChart from "./AppointmentChart";
import { PureIncrement } from 'pure_counter';
import { motion } from "framer-motion";
import { Select, Skeleton } from "antd";

function formatNumber(num: number) {
    if (num < 10_000_000 && num > 1_000_000) {
        return (num / 1000).toLocaleString('vi-VN') + 'K'; // Rút gọn thành K
    } else if (num > 10_000_000) {
        return (num / 1_000_000).toLocaleString('vi-VN') + 'M'; // Rút gọn thành M
    } else {
        return num.toLocaleString('vi-VN');
    }
}

function LoadingSkeleton() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Skeleton.Button active className="w-full min-h-[200px]" />
                <Skeleton.Button active className="w-full min-h-[200px]" />
                <Skeleton.Button active className="w-full min-h-[200px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                <Skeleton.Button active className="w-full min-h-[200px]" />
                <Skeleton.Button active className="w-full min-h-[200px]" />
                <Skeleton.Button active className="w-full min-h-[200px]" />
                <Skeleton.Button active className="w-full min-h-[200px]" />
            </div>
            <Skeleton.Button active className="w-full min-h-[200px] mt-4" />
            <Skeleton.Button active className="w-full min-h-[600px] mt-4" />
        </>
    )
}

export default function AdminOverView() {
    const [year, setYear] = useState(new Date().getFullYear());
    const { data: infoResult, refetch, isFetching } = useGetStaticInformationQuery({ year: year });
    const [info, setInfo] = useState<any>(null);
    useEffect(() => {
        if (infoResult) {
            setInfo(infoResult.body);
        }
    }, [infoResult]);
    useEffect(() => {
        refetch();
    }, [year]);
    if (isFetching) return <LoadingSkeleton />
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }} // Hiệu ứng khởi đầu
            animate={{ opacity: 1, y: 0 }} // Hiệu ứng khi render
            transition={{ duration: 0.5 }}
        >
            <h1 className="mb-2 mt-2 xl:text-[20px] text-lg font-bold text-secondarySupperDarker">Trong tháng này</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="relative w-full bg-gradient-to-r from-[#0284C7] to-[#00B5F1] rounded-xl shadow-third min-h-[200px]">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-white">
                        Doanh thu (VNĐ)
                    </p>
                    <div className="flex text-white flex-row gap-2 px-[20px] items-center pt-2">
                        <h3 className="text-[40px] font-bold">
                            {info && <PureIncrement start={0} end={formatNumber(info.revenueInCurrentMonth / 100)} duration={1} />}
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-white shadow-third">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-secondarySupperDarker">
                        Số lượt khám
                    </p>
                    <p className="m-0 p-0 text-center text-[80px] font-semibold text-[#003553]">
                        {info && <PureIncrement start={0} end={formatNumber(info.appointmentInCurrentMonth)} duration={1} />}
                    </p>
                </div>
                <div className="flex flex-col justify-between bg-gradient-to-r from-[#0284C7] to-[#00B5F1] rounded-xl shadow-third">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-white">
                        Người dùng mới
                    </p>
                    <div className="flex text-white flex-row gap-2 px-[20px] justify-center items-center pt-2">
                        <p className="m-0 p-0 text-[80px] font-semibold text-[#003553] text-white">
                            +{info && <PureIncrement start={0} end={formatNumber(info.newUserInCurrentMonth)} duration={1} />}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <h1 className="mb-2 mt-2 xl:text-[20px] text-lg font-bold text-secondarySupperDarker">Tổng quan</h1>
                <Select
                    defaultValue={new Date().getFullYear()}
                    value={year}
                    style={{ width: 120 }}
                    onChange={(value) => setYear(value)}
                    options={[
                        { value: new Date().getFullYear(), label: new Date().getFullYear() },
                        { value: new Date().getFullYear() - 1, label: new Date().getFullYear() - 1 },
                        { value: new Date().getFullYear() - 2, label: new Date().getFullYear() - 2 },
                        { value: new Date().getFullYear() - 3, label: new Date().getFullYear() - 3 },
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col justify-between rounded-2xl bg-white shadow-third">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-secondarySupperDarker">
                        Bác sĩ
                    </p>
                    <p className="m-0 p-0 text-center text-[80px] font-semibold text-[#003553]">
                        {info && <PureIncrement start={0} end={formatNumber(info.totalDoctor)} duration={1} />}
                    </p>
                </div>
                <div className="flex flex-col justify-between bg-gradient-to-r from-[#0284C7] to-[#00B5F1] rounded-xl shadow-third">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-white">
                        Nhân viên
                    </p>
                    <div className="flex text-white flex-row gap-2 px-[20px] justify-center items-center pt-2">
                        <p className="m-0 p-0 text-[80px] font-semibold text-[#003553] text-white">
                            {info && <PureIncrement start={0} end={formatNumber(info.totalStaff)} duration={1} />}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-white shadow-third">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-secondarySupperDarker">
                        Bệnh nhân
                    </p>
                    <p className="m-0 p-0 text-center text-[80px] font-semibold text-[#003553]">
                        {info && <PureIncrement start={0} end={formatNumber(info.totalPatient)} duration={1} />}
                    </p>
                </div>
                <div className="flex flex-col justify-between bg-gradient-to-r from-[#0284C7] to-[#00B5F1] rounded-xl shadow-third">
                    <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-white">
                        Đánh giá
                    </p>
                    <div className="flex text-white flex-row gap-2 px-[20px] justify-center items-center pt-2">
                        <p className="m-0 p-0 text-[80px] font-semibold text-[#003553] text-white">
                            {info && <PureIncrement start={0} end={formatNumber(Math.round(info.averageFeedback * 10) / 10)} duration={1} />}/5

                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-white shadow-third mt-6">
                <p className="m-0 px-[20px] mt-2 text-[36px] font-bold text-secondarySupperDarker">
                    Doanh thu trong năm {year} (VNĐ)
                </p>
                <p className="m-0 p-0 text-center text-[80px] font-semibold text-[#003553]">
                    {info && <PureIncrement start={0} end={formatNumber(info.revenueInCurrentYear / 100)} duration={1} />}

                </p>
            </div>
            <div className="flex flex-col lg:flex-row mt-8 overflow-x-scroll gap-12">
                <RevenueChart monthlyRevenue={info?.monthlyRevenue || false} />
                <AppointmentChart appointmentMonthly={info?.monthlyAppointment || false} />
            </div>

        </motion.div>
    )
}