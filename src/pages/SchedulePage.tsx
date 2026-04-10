import React, { useEffect, useState } from 'react';
import type { BoostappClass, ScheduleResponse } from '../types/types';

export default function SchedulePage() {
    const [classes, setClasses] = useState<BoostappClass[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/schedule');
                const data: ScheduleResponse = await response.json();

                if (!data.success) {
                    throw new Error(data.error || 'Failed to fetch');
                }

                setClasses(data.classes);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    const groupedClasses = classes.reduce((acc, current) => {
        const date = current.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(current);
        return acc;
    }, {} as Record<string, BoostappClass[]>);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="schedule-container">
            {Object.entries(groupedClasses).map(([date, dailyClasses]) => (
                <section key={date} style={{ marginBottom: '2rem' }}>
                    <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
                        {new Date(date).toLocaleDateString('ru-RU', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                        })}
                    </h2>

                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        {dailyClasses.map((cl) => (
                            <div
                                key={cl.id}
                                className="class-card"
                                style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    borderLeft: `6px solid ${cl.color || '#ccc'}`,
                                    backgroundColor: '#f9f9f9',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{cl.title}</div>
                                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                            {cl.timeStart} — {cl.timeEnd} | {cl.coach}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.85rem', color: cl.full ? 'red' : 'green' }}>
                                            {cl.full ? 'Мест нет' : `Места: ${cl.registered}/${cl.capacity}`}
                                        </div>
                                        {cl.area && <small style={{ color: '#888' }}>{cl.area}</small>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};