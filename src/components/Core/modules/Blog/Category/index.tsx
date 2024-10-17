"use client"
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message } from 'antd';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from '@/stores/services/blog';
import { cloneDeep } from 'lodash';

const sortCategories = (categories: any) => {
    const categoryMap: any = {};
    categories.forEach((category: any) => {
        if (!categoryMap[category.parent_id]) {
            categoryMap[category.parent_id] = [];
        }
        categoryMap[category.parent_id].push(category);
    });

    const sortedCategories: any = [];

    const addCategoryWithSub = (parentId: string, prefix = '') => {
        (categoryMap[parentId] || []).forEach((category: any) => {
            sortedCategories.push({
                ...category,
                name: prefix + category.name, // Add prefix to subcategories
            });
            addCategoryWithSub(category._id, prefix + '- '); // Recursive for subcategories
        });
    };

    addCategoryWithSub('null'); // Start with top-level categories
    return sortedCategories;
};

const CategoryManagement = () => {
    const { data: categoriesResult, refetch, isFetching: isTableFetching } = useGetAllCategoriesQuery();
    const [categories, setCategories] = useState<any>([]);

    const [updateCategory, { isLoading: isUpdateLoading }] = useUpdateCategoryMutation();
    const [createCategory, { isLoading: isCreateLoading }] = useCreateCategoryMutation();
    const [deleteCategory, { isLoading: isDeleteLoading }] = useDeleteCategoryMutation();
    // const [categories, setCategories] = useState(mockCategories);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [form] = Form.useForm();

    const showModal = (category: any = null) => {
        setEditingCategory(category);
        form.resetFields();
        if (category) {
            var newCategory = cloneDeep(category);
            newCategory.name = newCategory.name.replace(/^[-\s]+/, '');
            form.setFieldsValue(newCategory);
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            if (editingCategory) {
                try {
                    // Update existing category
                    await updateCategory({ ...values, id: editingCategory._id }).unwrap();
                    message.success('Cật nhật danh mục thành công');
                    
                    refetch();
                } catch (error) {
                    message.error('Cật nhật danh mục thất bại');
                }

            } else {
                try {
                    // Create new category
                    await createCategory({ ...values }).unwrap();
                    message.success('Tạo mới danh mục thành công');
                    refetch();
                } catch (error) {
                    message.error('Tạo mới danh mục thất bại');
                }
            }
            setIsModalVisible(false);
        });
    };

    const handleDelete = (categoryId: string) => {
        Modal.confirm({
            title: 'Bạn có chắc xóa mục này không ?',
            async onOk() {
                try {
                    await deleteCategory(categoryId).unwrap();
                    message.success('Xóa danh mục thành công');
                    refetch();
                } catch (error) {
                    message.error('Xóa danh mục thất bại');
                }

            },
            okText: 'Có',
            cancelText: 'Không',
        });
    };

    useEffect(() => {
        if (categoriesResult?.body?.result) {
            setCategories(sortCategories(categoriesResult?.body?.result));
            // console.log(sortCategories(categoriesResult?.body?.result));
        }
    }, [categoriesResult]);


    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: any) => ['Xóa', 'Ẩn', 'Hiển thị'][status],
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            sorter: (a: any, b: any) => a.position - b.position,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<Edit className="w-4 h-4" />} onClick={() => showModal(record)} />
                    <Button icon={<Trash2 className="w-4 h-4" />} onClick={() => handleDelete(record._id)} danger />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-4">
                <Button type="primary" icon={<PlusCircle className="w-4 h-4" />} onClick={() => showModal()}>
                    Tạo mới
                </Button>
            </div>
            <Table
                loading={isUpdateLoading || isCreateLoading || isDeleteLoading || isTableFetching}
                columns={columns}
                dataSource={categories}
                rowKey="_id"
                pagination={false}
            />
            <Modal
                title={editingCategory ? 'Cật nhật' : 'Tạo mới'}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Tên danh mục không được trống" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item initialValue={1} name="status" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}>
                        <Select>
                            <Select.Option value={1}>Inactive</Select.Option>
                            <Select.Option value={2}>Active</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="parent_id" label="Danh mục cha">
                        <Select allowClear>
                            {categories.map((cat: any) => (
                                <Select.Option key={cat._id} value={cat._id}>{cat.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item initialValue={0} name="position" label="Vị trí" rules={[{ pattern: new RegExp(/^[0-9]+$/), message: "Vị trí phải là số" }, {
                        required: true,
                        message: 'Vui lòng nhập vị trí.',
                    }]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="meta_title" label="Meta tiêu đề">
                        <Input />
                    </Form.Item>
                    <Form.Item name="meta_description" label="Meta mô tả">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="meta_keyword" label="Meta từ khóa">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryManagement;