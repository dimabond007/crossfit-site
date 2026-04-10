import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

interface ClassItem {
    id: string
    title: string
    coach: string
    date: string
    timeStart: string
    timeEnd: string
    full: boolean
    color?: string
}

const DAYS_KEYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Today's index: Sun=0 → 6, Mon=1 → 0, etc.
function getTodayIndex() {
    const d = new Date().getDay()
    return d === 0 ? 6 : d - 1
}

export default function SchedulePage() {
    const { t } = useTranslation()
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCoach, setActiveCoach] = useState<string | null>(null)
    const [activeType, setActiveType] = useState<string | null>(null)
    const todayIdx = getTodayIndex()

    useEffect(() => {
        fetch('/api/boostapp')
            .then(res => res.json())
            .then(data => {
                setClasses(data.classes || [])
                setLoading(false)
            })
    }, [])


    const coaches = useMemo(() => {
        const set = new Set(classes.map(c => c.coach).filter(Boolean))
        return Array.from(set).sort()
    }, [classes])

    const types = useMemo(() => {
        const set = new Set(classes.map(c => c.title).filter(Boolean))
        return Array.from(set).sort()
    }, [classes])

    const filtered = useMemo(() => {
        return classes.filter(c => {
            if (activeCoach && c.coach !== activeCoach) return false
            if (activeType && c.title !== activeType) return false
            return true
        })
    }, [classes, activeCoach, activeType])

    const weekGrid = useMemo(() => {
        const grid: Record<number, ClassItem[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }

        filtered.forEach(item => {
            const dayIndex = new Date(item.date).getDay()
            const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
            grid[adjustedIndex].push(item)
        })

        Object.values(grid).forEach(dayClasses => {
            dayClasses.sort((a, b) => a.timeStart.localeCompare(b.timeStart))
        })

        return grid
    }, [filtered])

    // Days order: today first
    const orderedDays = useMemo(() => {
        const indices = [0, 1, 2, 3, 4, 5, 6]
        return [
            ...indices.slice(todayIdx),
            ...indices.slice(0, todayIdx),
        ]
    }, [todayIdx])

    const getDayDate = (idx: number) => {
        const now = new Date()
        const currentIdx = getTodayIndex()
        let diff = idx - currentIdx
        if (diff < 0) diff += 7
        const date = new Date(now.setDate(now.getDate() + diff))
        return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
    }

    if (loading) return (
        <div className="py-20 text-center">
            <div className="grid grid-cols-7 gap-4 mx-auto max-w-[1400px] px-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="mb-6 h-6 w-3/4 mx-auto animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
                        {Array.from({ length: 4 }).map((_, j) => (
                            <div key={j} className="h-24 animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <section className="bg-white px-4 py-16 dark:bg-black">
            <div className="mx-auto max-w-[1400px]">

                <SectionTitle title={t('schedule.title')} center />

                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-6">
                    {/* Coach filter */}
                    {coaches.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-40">{t('schedule.coach')}</span>
                            <button
                                onClick={() => setActiveCoach(null)}
                                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition ${activeCoach === null ? 'bg-black text-white dark:bg-white dark:text-black' : 'border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30'}`}
                            >
                                {t('schedule.all')}
                            </button>
                            {coaches.map(coach => (
                                <button
                                    key={coach}
                                    onClick={() => setActiveCoach(activeCoach === coach ? null : coach)}
                                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition ${activeCoach === coach ? 'bg-black text-white dark:bg-white dark:text-black' : 'border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30'}`}
                                >
                                    {coach}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Type filter */}
                    {types.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-40">{t('schedule.type')}</span>
                            <button
                                onClick={() => setActiveType(null)}
                                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition ${activeType === null ? 'bg-black text-white dark:bg-white dark:text-black' : 'border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30'}`}
                            >
                                {t('schedule.all')}
                            </button>
                            {types.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setActiveType(activeType === type ? null : type)}
                                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition ${activeType === type ? 'bg-black text-white dark:bg-white dark:text-black' : 'border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="hidden lg:grid lg:grid-cols-7 lg:gap-4">
                    {orderedDays.map((idx) => {
                        const day = DAYS_KEYS[idx]
                        const isToday = idx === todayIdx
                        return (
                            <div key={day} className="flex flex-col">

                                <div className={`mb-6 text-center transition ${isToday ? 'text-yellow-400' : 'text-black/30 dark:text-white/30'}`}>
                                    <div className="text-xl font-black uppercase tracking-widest leading-none">
                                        {t(`days.${day.slice(0, 3).toLowerCase()}`)}
                                    </div>
                                    <div className="mt-1 text-sm font-bold opacity-60">
                                        {getDayDate(idx)}
                                    </div>
                                    {isToday && <div className="mt-1 text-[10px] font-black uppercase tracking-widest">{t('schedule.today')}</div>}
                                </div>


                                <div className="flex flex-col gap-3">
                                    {weekGrid[idx].map(cl => (
                                        <Card key={cl.id} accent={cl.color || '#ccc'} className="p-4">
                                            <div className="mb-1 text-sm font-bold uppercase tracking-tight text-black/40 dark:text-white/40">
                                                {cl.timeStart} — {cl.timeEnd}
                                            </div>
                                            <div className="text-base font-black uppercase leading-tight">
                                                {cl.title}
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs font-medium opacity-60">{cl.coach}</span>
                                                {cl.full && <Badge variant="red">{t('schedule.full')}</Badge>}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex flex-col gap-10 lg:hidden">
                    {orderedDays.map((idx) => {
                        const day = DAYS_KEYS[idx]
                        const isToday = idx === todayIdx
                        return weekGrid[idx].length > 0 && (
                            <div key={day}>
                                <h2 className="mb-4 text-2xl font-black uppercase italic tracking-widest underline decoration-yellow-400 decoration-4 underline-offset-8">
                                    {t(`days.${day.slice(0, 3).toLowerCase()}`)}
                                    <span className="ml-2 text-lg opacity-40 not-italic">({getDayDate(idx)})</span>
                                    {isToday && <span className="ml-3 text-sm font-bold not-italic text-yellow-400">— {t('schedule.today')}</span>}
                                </h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {weekGrid[idx].map(cl => (
                                        <Card key={cl.id} accent={cl.color || '#eee'} className="p-5">
                                            <div className="text-sm font-bold text-black/50 dark:text-white/50">
                                                {cl.timeStart} — {cl.timeEnd}
                                            </div>
                                            <div className="text-xl font-black uppercase">{cl.title}</div>
                                            <div className="mt-1 flex items-center justify-between">
                                                <span className="text-sm opacity-60">{cl.coach}</span>
                                                {cl.full && <Badge variant="red">{t('schedule.full')}</Badge>}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}