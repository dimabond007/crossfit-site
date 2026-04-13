import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { LuZap, LuTarget, LuDumbbell, LuUsers, LuTrendingUp, LuHandshake } from 'react-icons/lu'

const benefitIcons = [
    LuZap,
    LuTarget,
    LuDumbbell,
    LuUsers,
    LuTrendingUp,
    LuHandshake,
]

const About = () => {
    const { t } = useTranslation()
    const benefits = t('about.benefits', { returnObjects: true }) as string[]
    const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]

    return (
        <section className="bg-white px-4 py-20 text-black dark:bg-black dark:text-white">
            <div className="mx-auto max-w-6xl">
                <SectionTitle
                    title={t('about.title')}
                    subtitle={t('about.lead')}
                />

                <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {benefits.map((item, index) => {
                        const Icon = benefitIcons[index % benefitIcons.length]
                        return (
                            <Card
                                key={item}
                                hover={true}
                                accent="#f97316"
                                className="flex items-center gap-4 px-5 py-4"
                            >
                                <Icon className="shrink-0 text-orange-500" size={24} />
                                <span className="text-base font-semibold">{item}</span>
                            </Card>
                        )
                    })}
                </div>

                <div className="space-y-5 text-base leading-8 text-black/70 dark:text-white/70">
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About