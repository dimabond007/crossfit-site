import { useEffect, useState } from 'react'

type Workout = {
    id: string
    name: string
    coach: string
    start: string
    end?: string
}

const SchedulePage = () => {
    const [data, setData] = useState<Workout[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/boostapp')
            .then(async (res) => {
                const json = await res.json()

                if (!res.ok) {
                    throw new Error(json?.details || json?.error || 'Failed to load schedule')
                }

                return json
            })
            .then((res) => setData(Array.isArray(res.data) ? res.data : []))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="mx-auto max-w-4xl p-10">
            <h1 className="mb-6 text-3xl font-bold">Schedule</h1>

            {loading && (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex justify-between rounded-xl border p-4 animate-pulse"
                        >
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-black/10 dark:bg-white/10" />
                                <div className="h-3 w-20 rounded bg-black/10 dark:bg-white/10" />
                            </div>
                            <div className="h-4 w-16 rounded bg-black/10 dark:bg-white/10" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {!loading && !error && data.length === 0 && (
                <div className="text-black/60 dark:text-white/60">No workouts yet</div>
            )}

            {!loading && !error && data.length > 0 && (
                <div className="space-y-4">
                    {data.map((w) => (
                        <div
                            key={w.id}
                            className="flex justify-between rounded-xl border p-4"
                        >
                            <div>
                                <div className="font-semibold">{w.name}</div>
                                <div className="text-sm opacity-60">{w.coach}</div>
                            </div>

                            <div className="text-right text-sm">
                                <div>
                                    {new Date(w.start).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>

                                {w.end && (
                                    <div className="opacity-60">
                                        {new Date(w.end).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SchedulePage