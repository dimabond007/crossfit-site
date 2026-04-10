import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ClassItem {
    id: string
    title: string
    coach: string
    date: string
    timeStart: string
    timeEnd: string
    capacity: number
    registered: number
    full: boolean
    area?: string
    color?: string
}

export default function SchedulePage() {
    const { t, i18n } = useTranslation()

    const [classes, setClasses] = useState<ClassItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [selectedDay, setSelectedDay] = useState<string | null>(null)
    const [selectedCoach, setSelectedCoach] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/boostapp')
                const data = await res.json()
                setClasses(data.data?.classes || data.classes || [])
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // ✅ группировка по дате
    const grouped = useMemo(() => {
        return classes.reduce((acc, item) => {
            if (!acc[item.date]) acc[item.date] = []
            acc[item.date].push(item)
            return acc
        }, {} as Record<string, ClassItem[]>)
    }, [classes])

    // ✅ список дней
    const days = Object.keys(grouped)

    // ✅ список тренеров
    const coaches = Array.from(new Set(classes.map(c => c.coach)))

    // ✅ фильтрация
    const filteredGrouped = useMemo(() => {
        const result: Record<string, ClassItem[]> = {}

        for (const date in grouped) {
            let list = grouped[date]

            if (selectedDay && date !== selectedDay) continue

            if (selectedCoach) {
                list = list.filter(c => c.coach === selectedCoach)
            }

            if (list.length) result[date] = list
        }

        return result
    }, [grouped, selectedDay, selectedCoach])

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString(i18n.language, {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })

    if (loading) return <div className="p-10 text-center">{t('schedule.loading')}</div>
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">

            {/* ✅ HEADER */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    {t('schedule.title')}
                </h1>
            </div>

            {/* ✅ FILTERS */}
            <div className="mb-8 flex flex-wrap gap-3">

                {/* дни */}
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                        className={`rounded-full px-4 py-2 text-sm transition 
            ${selectedDay === day
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-black/10 dark:bg-white/10'}`}
                    >
                        {formatDate(day)}
                    </button>
                ))}

                {/* тренеры */}
                {coaches.map(coach => (
                    <button
                        key={coach}
                        onClick={() => setSelectedCoach(coach === selectedCoach ? null : coach)}
                        className={`rounded-full px-4 py-2 text-sm transition 
            ${selectedCoach === coach
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-600/10'}`}
                    >
                        {coach}
                    </button>
                ))}

            </div>

            {/* ✅ LIST */}
            <div className="space-y-10">

                {Object.entries(filteredGrouped).map(([date, list]) => (
                    <div key={date}>
                        <h2 className="mb-4 text-xl font-semibold">
                            {formatDate(date)}
                        </h2>

                        <div className="grid gap-4">
                            {list.map(item => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black"
                                    style={{
                                        borderLeft: `6px solid ${item.color || '#888'}`
                                    }}
                                >
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <div className="text-lg font-semibold">
                                                {item.title}
                                            </div>

                                            <div className="text-sm text-black/60 dark:text-white/60">
                                                {item.timeStart} — {item.timeEnd} · {item.coach}
                                            </div>
                                        </div>

                                        <div className="text-right text-sm">
                                            {item.full ? (
                                                <span className="text-red-500">
                                                    {t('schedule.full')}
                                                </span>
                                            ) : (
                                                <span className="text-green-600">
                                                    {item.registered}/{item.capacity}
                                                </span>
                                            )}
                                        </div>

                                    </div>

                                    {item.area && (
                                        <div className="mt-2 text-xs text-black/50 dark:text-white/50">
                                            {item.area}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {!Object.keys(filteredGrouped).length && (
                    <div className="text-center text-black/50 dark:text-white/50">
                        {t('schedule.empty')}
                    </div>
                )}
            </div>
        </div>
    )
}