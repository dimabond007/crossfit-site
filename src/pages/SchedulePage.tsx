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

export default function SchedulePage() {
    const { t } = useTranslation()
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/boostapp')
            .then(res => res.json())
            .then(data => {
                setClasses(data.classes || [])
                setLoading(false)
            })
    }, [])


    const weekGrid = useMemo(() => {
        const grid: Record<number, ClassItem[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }

        classes.forEach(item => {
            const dayIndex = new Date(item.date).getDay();

            const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            grid[adjustedIndex].push(item);
        });


        Object.values(grid).forEach(dayClasses => {
            dayClasses.sort((a, b) => a.timeStart.localeCompare(b.timeStart));
        });

        return grid;
    }, [classes])

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


                <div className="hidden lg:grid lg:grid-cols-7 lg:gap-4">
                    {DAYS_KEYS.map((day, idx) => (
                        <div key={day} className="flex flex-col">

                            <div className="mb-6 text-center text-xl font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                                {t(`days.${day.slice(0, 3).toLowerCase()}`)}
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
                    ))}
                </div>

                <div className="flex flex-col gap-10 lg:hidden">
                    {DAYS_KEYS.map((day, idx) => weekGrid[idx].length > 0 && (
                        <div key={day}>
                            <h2 className="mb-4 text-2xl font-black uppercase italic tracking-widest underline decoration-yellow-400 decoration-4 underline-offset-8">
                                {t(`days.${day.slice(0, 3).toLowerCase()}`)}
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {weekGrid[idx].map(cl => (
                                    <div key={cl.id} className="flex items-center justify-between rounded-2xl border border-black/10 p-5 dark:border-white/10">
                                        <div>
                                            <div className="text-sm font-bold text-black/50 dark:text-white/50">{cl.timeStart} - {cl.timeEnd}</div>
                                            <div className="text-xl font-black uppercase">{cl.title}</div>
                                            <div className="text-sm">{cl.coach}</div>
                                        </div>
                                        <div className="h-10 w-1 rounded-full" style={{ backgroundColor: cl.color || '#eee' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}