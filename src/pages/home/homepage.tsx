import { useEffect, useState } from 'react';
import { getAdminNewsListAPI } from '../../services/admin/news.api';

type NewsItem = {
    stt: number;
    newsID: number;
    title: string;
    contentText: string;
    status: string;
    contentImage: string;
    crtdUser: string;
    crtdDate: string;
    lUpdUser: string;
    lUpdDate: string;
    isActive: number;
};

// Trang home sau khi dang nhap
const HomePage = () => {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const res: any = await getAdminNewsListAPI({
                    pageIndex: 1,
                    pageSize: 10,
                });
                const list = res?.news || [];
                setNewsList(list);
            } catch (error) {
                console.error('Load user news failed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h1>Tin tuc trung tam</h1>
            <p>Danh sach tin tuc moi nhat tu trung tam.</p>

            {loading && <p>Dang tai tin tuc...</p>}

            {!loading && newsList.length === 0 && <p>Chua co tin tuc nao.</p>}

            {!loading && newsList.length > 0 && (
                <div style={{ display: 'grid', gap: 16 }}>
                    {newsList.map((item) => (
                        <article
                            key={item.newsID}
                            style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: 8,
                                padding: 16,
                            }}
                        >
                            {item.contentImage && (
                                <img
                                    src={item.contentImage}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        maxWidth: 460,
                                        height: 'auto',
                                        borderRadius: 8,
                                        marginBottom: 12,
                                    }}
                                />
                            )}
                            <h3>{item.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: 14 }}>
                                {new Date(item.crtdDate).toLocaleDateString('vi-VN')} - {item.crtdUser || 'He thong'}
                            </p>
                            <p>{item.contentText}</p>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;