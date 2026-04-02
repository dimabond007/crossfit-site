import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type InstagramPost = {
    id: string
    caption: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
    image: string
    permalink: string
    timestamp: string
}

const InstagramSection = () => {
    const { t } = useTranslation()
    const [posts, setPosts] = useState<InstagramPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const res = await fetch('/api/instagram')

                if (!res.ok) {
                    throw new Error('Failed to load instagram posts')
                }

                const data = await res.json()
                setPosts(data.posts ?? [])
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        loadPosts()
    }, [])

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
                            {t('instagram.title')}
                        </h2>

                        <p className="text-black/60 dark:text-white/60">
                            {t('instagram.subtitle')}
                        </p>
                    </div>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
                    >
                        {t('instagram.follow')}
                    </a>
                </div>

                {loading && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="aspect-square animate-pulse rounded-3xl bg-black/5 dark:bg-white/10"
                            />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="text-black/60 dark:text-white/60">
                        Failed to load Instagram posts.
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={post.permalink}
                                target="_blank"
                                rel="noreferrer"
                                className="group block overflow-hidden rounded-3xl"
                            >
                                <img
                                    src={post.image}
                                    alt={post.caption || 'Instagram post'}
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default InstagramSection