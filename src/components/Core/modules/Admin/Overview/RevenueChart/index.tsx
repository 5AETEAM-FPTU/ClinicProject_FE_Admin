"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const RevenueChart = ({ monthlyRevenue }: { monthlyRevenue: any }) => {
    // Dữ liệu doanh thu hàng tháng

    // Chuyển đổi dữ liệu thành định dạng biểu đồ
    const labels = Object.keys(monthlyRevenue);
    const dataValues = Object.values(monthlyRevenue).map((item: any) => item / 100);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh Thu (VND)',
                data: dataValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh Thu (VND)',
                    font: {
                        size: 24, // Kích thước chữ tiêu đề trục y
                    },
                },
                ticks: {
                    font: {
                        size: 32, // Kích thước chữ cho các giá trị trên trục y
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                    font: {
                        size: 24, // Kích thước chữ tiêu đề trục x
                    },
                },
                ticks: {
                    font: {
                        size: 32, // Kích thước chữ cho các giá trị trên trục x
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 32, // Kích thước chữ cho nhãn trong legend
                    },
                },
            },
        },
    };

    return monthlyRevenue && <Bar className='p-2 h-auto w-[900px] max-w-[900px]' data={data} options={options} />;
};

export default RevenueChart;