"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const AppointmentChart = ({ appointmentMonthly }: { appointmentMonthly: any }) => {
    // Dữ liệu doanh thu hàng tháng

    // Chuyển đổi dữ liệu thành định dạng biểu đồ
    const labels = Object.keys(appointmentMonthly);
    const dataValues = Object.values(appointmentMonthly).map((item: any) => item);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Lượt khám trong 12 tháng của năm (lượt)',
                data: dataValues,
                backgroundColor: '#0285c780',
                borderColor: '#0285c7',
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
                max: 200,
                title: {
                    display: true,
                    text: 'Lượt khám',
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

    return appointmentMonthly && <Bar className='p-2 h-auto w-[900px] max-w-[900px]' data={data} options={options} />;
};

export default AppointmentChart;