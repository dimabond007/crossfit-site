import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

    if (loading) return <div className="py-20 text-center font-bold uppercase tracking-widest">{t('schedule.loading')}</div>

    return (
        <section className="bg-white px-4 py-16 dark:bg-black">
            <div className="mx-auto max-w-[1400px]">

                <h1 className="mb-12 text-center text-4xl font-black uppercase italic tracking-tighter sm:text-6xl">
                    {t('schedule.title')}
                </h1>


                <div className="hidden lg:grid lg:grid-cols-7 lg:gap-4">
                    {DAYS_KEYS.map((day, idx) => (
                        <div key={day} className="flex flex-col">

                            <div className="mb-6 text-center text-xl font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                                {t(`days.${day.slice(0, 3).toLowerCase()}`)}
                            </div>


                            <div className="flex flex-col gap-3">
                                {weekGrid[idx].map(cl => (
                                    <div
                                        key={cl.id}
                                        className="group relative flex flex-col rounded-xl border border-black/5 bg-gray-50 p-4 transition-all hover:border-black/20 hover:shadow-lg dark:border-white/5 dark:bg-white/5 dark:hover:border-white/20"
                                    >
                                        <div className="mb-1 text-sm font-bold uppercase tracking-tight text-black/40 dark:text-white/40">
                                            {cl.timeStart} - {cl.timeEnd}
                                        </div>
                                        <div className="text-base font-black uppercase leading-tight">
                                            {cl.title}
                                        </div>
                                        <div className="mt-2 text-xs font-medium opacity-60">
                                            {cl.coach}
                                        </div>


                                        <div
                                            className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
                                            style={{ backgroundColor: cl.color || '#ccc' }}
                                        />
                                    </div>
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