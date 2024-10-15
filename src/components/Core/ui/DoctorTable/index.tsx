"use client";
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, ImportOutlined, ExportOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useGetAllDoctorQuery } from '@/stores/services/admin';
import Image from 'next/image';
import { setLoaded, setLoading } from '@/stores/features/loading';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit';
const { Search } = Input;

const columns = [
    {
        title: 'BÁC SĨ',
        dataIndex: 'object',
        key: 'object',
        render: (text: any) => (
            <Space>
                <div className="w-8 h-8 bg-gray-300 rounded-full">
                    <img src={text.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
                </div>
                <span>{text.fullName}</span>
            </Space>
        ),
    },
    {
        title: 'SỐ ĐIỆN THOẠI',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'NGÀY SINH',
        dataIndex: 'birthDate',
        key: 'birthDate',
        render: (text: any) => (new Date(text)).toLocaleDateString('vi-VN'),
    },
    {
        title: 'CHUYÊN MÔN',
        dataIndex: 'specialty',
        key: 'specialty',
    },
    {
        title: 'VỊ TRÍ',
        dataIndex: 'position',
        key: 'position',
        render: (text: any) => (
            <Tag color={text === 'GIÁM ĐỐC' ? 'red' : text === 'OUT OF STOCK' ? 'volcano' : 'green'}>
                {text}
            </Tag>
        ),
    },
    {
        title: 'HÀNH ĐỘNG',
        key: 'action',
        render: () => (
            <Space size="middle">
                <EyeOutlined />
                <EditOutlined />
                <DeleteOutlined />
            </Space>
        ),
    },
];

function mapUsersToTableData(users: any) {
    return users?.map((user: any) => {
        return {
            key: user.id,
            object: {
                fullName: user.fullName,
                avatarUrl: user.avatarUrl,
            },
            phone: user.phoneNumber,
            birthDate: user.dob,
            specialty: user.specialty,
            position: user.position,
        }
    }) || [];
}

export default function Component() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [doctors, setDoctors] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const { data: result, error, isLoading, refetch } = useGetAllDoctorQuery({ page: currentPage });
    useEffect(() => {
        if (isLoading) dispatch(setLoading())
        else dispatch(setLoaded())
        if (result?.body && result.body.users) {
            const users = result.body.users;
            setTotalPage(users.totalPages);
            setDoctors(mapUsersToTableData(users.contents));
        }
    }, [result])
    console.log(doctors);
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold mb-6 text-[#003553]">Tất cả bác sĩ</h1>
                <Space>
                    <Button onClick={() => router.push('create-user?type=doctor')} icon={<PlusOutlined />} className="bg-[#0284C7] rounded-sm text-white font-bold !border-[#0284C7] text-md  box-content">
                        TẠO MỚI BÁC SĨ
                    </Button>
                    <Button ghost icon={<ImportOutlined />} className=" rounded-sm text-[#0284C7] font-bold !border-[#0284C7] text-md box-content ">
                        NHẬP
                    </Button>
                    <Button ghost icon={<ExportOutlined />} className=" rounded-sm text-[#0284C7] font-bold !border-[#0284C7] text-md box-content">
                        XUẤT
                    </Button>
                </Space>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span>3 người mỗi trang</span>
                <Search
                    placeholder="Search..."
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
            </div>
            <Table columns={columns} dataSource={doctors} pagination={{ total: totalPage, showSizeChanger: false }} />
        </div>
    );
}