import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'

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

                <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {benefits.map((item) => (
                        <Card key={item} hover={false} className="px-4 py-3 text-base">
                            {item}
                        </Card>
                    ))}
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