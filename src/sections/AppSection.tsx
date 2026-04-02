import { useTranslation } from 'react-i18next'
import {
    Calendar,
    Bell,
    CalendarDays,
    CreditCard,
} from 'lucide-react'

const icons = [
    Calendar,
    Bell,
    CalendarDays,
    CreditCard,
]

const AppSection = () => {
    const { t } = useTranslation()
    const items = t('app.items', { returnObjects: true }) as string[]

    return (
        <section className="px-4 py-20">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
                <div>
                    <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
                        {t('app.title')}
                    </h2>

                    <div className="space-y-5">
                        {items.map((item, i) => {
                            const Icon = icons[i]

                            return (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 text-lg"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                                        <Icon size={20} />
                                    </div>

                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <img
                        src="/app.png"
                        alt="App"
                        className="w-full rounded-3xl object-cover"
                    />
                </div>
            </div>
        </section>
    )
}

export default AppSection