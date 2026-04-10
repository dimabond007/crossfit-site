import { useEffect, useState } from 'react'

type Workout = {
    id: string
    name: string
    coach: string
    start: string
}

const SchedulePage = () => {
    const [data, setData] = useState<Workout[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('/api/boostapp')
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then((res) => setData(res.data || []))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Schedule</h1>

            {loading && (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-4 border rounded-xl animate-pulse flex justify-between"
                        >
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded" />
                                <div className="h-3 w-20 bg-black/10 dark:bg-white/10 rounded" />
                            </div>
                            <div className="h-4 w-16 bg-black/10 dark:bg-white/10 rounded" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="text-black/60 dark:text-white/60">
                    Failed to load schedule
                </div>
            )}

            {!loading && !error && data.length === 0 && (
                <div className="text-black/60 dark:text-white/60">
                    No workouts yet
                </div>
            )}

            {!loading && !error && data.length > 0 && (
                <div className="space-y-4">
                    {data.map((w) => (
                        <div
                            key={w.id}
                            className="p-4 border rounded-xl flex justify-between"
                        >
                            <div>
                                <div className="font-semibold">{w.name}</div>
                                <div className="text-sm opacity-60">{w.coach}</div>
                            </div>

                            <div className="text-sm">
                                {new Date(w.start).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SchedulePage