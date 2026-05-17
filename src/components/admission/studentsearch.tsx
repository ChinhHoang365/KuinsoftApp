
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'services/axios.customize';
import { studentSearchAPI } from 'services/admission/students.api';
import { Alert, Button, Modal, Pagination, Space, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Student {
    studentID: number;
    name?: string;
    code?: string;
    phone?: string;
    classCode?: string;
    email?: string;
    dob?: string;
    gender?: string;
    [key: string]: string | number | boolean | null | undefined;
}

const StudentSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const name = searchParams.get('name') ?? '';
    const code = searchParams.get('code') ?? '';
    const phone = searchParams.get('phone') ?? '';
    const classCode = searchParams.get('classCode') ?? '';
    const page = Number(searchParams.get('page') ?? 1);
    const pageSize = Number(searchParams.get('pageSize') ?? 10);

    const hasSearch = Boolean(name || code || phone || classCode);

    useEffect(() => {
        if (!hasSearch) {
            setResults([]);
            setPagination({ current: 1, pageSize, total: 0 });
            setError(null);
            return;
        }

        const fetchStudents = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log('Calling studentSearchAPI with:', { name, code, phone, classCode, page, pageSize });
             const response = await studentSearchAPI(name, code,'','');
                console.log('API response:', response);
                const payload = response?.data?.data ?? response?.data;

                if (payload?.result && payload?.meta) {
                    setResults(payload.result ?? []);
                    setPagination({
                        current: payload.meta.current ?? page,
                        pageSize: payload.meta.pageSize ?? pageSize,
                        total: payload.meta.total ?? 0,
                    });
                } else if (Array.isArray(payload)) {
                    setResults(payload);
                    setPagination({ current: page, pageSize, total: payload.length });
                } else {
                    setResults([]);
                    setPagination({ current: page, pageSize, total: 0 });
                    setError(response?.data?.message || 'Không thể tải danh sách học viên.');
                }
            } catch (error) {
                console.error(error);
                setError('Lỗi khi gọi API. Vui lòng thử lại.');
                setResults([]);
                setPagination({ current: page, pageSize, total: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [name, code, phone, classCode, page, pageSize, hasSearch]);

    const handlePageChange = (nextPage: number, nextPageSize?: number) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.set('page', String(nextPage));
        nextParams.set('pageSize', String(nextPageSize ?? pageSize));
        setSearchParams(nextParams);
    };

    const handleViewDetail = (student: Student) => {
        setSelectedStudent(student);
        setDetailVisible(true);
    };

    const columns: ColumnsType<Student> = [
        {
            title: 'Mã học viên',
            dataIndex: 'code',
            key: 'code',
            width: 140,
            render: (value) => value || '-',
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            render: (value) => value || '-',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 140,
            render: (value) => value || '-',
        },
        {
            title: 'Mã lớp',
            dataIndex: 'classCode',
            key: 'classCode',
            width: 120,
            render: (value) => value || '-',
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 140,
            render: (_, record) => (
                <Button type="link" onClick={() => handleViewDetail(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const detailItems = selectedStudent
        ? Object.entries(selectedStudent).filter(([key]) => ['studentID', 'name', 'code', 'phone', 'classCode', 'email', 'dob', 'gender'].includes(key))
        : [];

    return (
        <div style={{ padding: 24 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                    <Typography.Title level={3}>Tìm kiếm học viên</Typography.Title>
                    <div style={{ marginBottom: 16 }}>
                        <Typography.Text strong>Tiêu chí tìm kiếm:</Typography.Text>
                        <ul style={{ marginTop: 8 }}>
                            <li>Tên: {name || 'Không có'}</li>
                            <li>Mã học viên: {code || 'Không có'}</li>
                            <li>Điện thoại: {phone || 'Không có'}</li>
                            <li>Mã lớp: {classCode || 'Không có'}</li>
                        </ul>
                    </div>
                </div>

                {!hasSearch ? (
                    <Alert
                        type="info"
                        showIcon
                        message="Vui lòng nhập thông tin tìm kiếm và bấm Search ở thanh trên." 
                    />
                ) : (
                    <div>
                        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}

                        <Spin spinning={loading} tip="Đang tải danh sách...">
                            <Table<Student>
                                columns={columns}
                                dataSource={results}
                                rowKey={(record) => record.studentID.toString()}
                                pagination={false}
                                locale={{ emptyText: 'Không có học viên phù hợp.' }}
                                onRow={(record) => ({
                                    onClick: () => handleViewDetail(record),
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </Spin>

                        <div style={{ marginTop: 16, textAlign: 'right' }}>
                            <Pagination
                                current={pagination.current}
                                pageSize={pagination.pageSize}
                                total={pagination.total}
                                showSizeChanger
                                pageSizeOptions={['10', '20', '50']}
                                onChange={handlePageChange}
                                showTotal={(total) => `Tổng ${total} học viên`}
                            />
                        </div>
                    </div>
                )}
            </Space>

            <Modal
                title="Thông tin học viên"
                open={detailVisible}
                onCancel={() => setDetailVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailVisible(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedStudent ? (
                    <div>
                        {detailItems.map(([key, value]) => (
                            <div key={key} style={{ marginBottom: 10 }}>
                                <Typography.Text strong>{key}:</Typography.Text>{' '}
                                <Typography.Text>{value ?? '-'}</Typography.Text>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Typography.Text>Không có dữ liệu học viên.</Typography.Text>
                )}
            </Modal>
        </div>
    );
};

export default StudentSearch;
