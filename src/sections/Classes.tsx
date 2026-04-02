import { useTranslation } from 'react-i18next'

const images = [
    '/group_img.jpg',
    '/rehabilitation_img.jpg',
    '/personal_img.jpg',
]

const Classes = () => {
    const { t } = useTranslation()
    const items = t('classes.items', { returnObjects: true }) as string[]

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl text-center">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
                    {t('classes.title')}
                </h2>

                <h3 className="mb-12 text-3xl font-bold sm:text-4xl">
                    {t('classes.subtitle')}
                </h3>

                <div className="grid gap-6 sm:grid-cols-3">
                    {items.map((item, i) => (
                        <div
                            key={item}
                            className="group overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={images[i]}
                                    alt={item}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                            </div>

                            <div className="p-5 text-lg font-medium">
                                {item}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Classes