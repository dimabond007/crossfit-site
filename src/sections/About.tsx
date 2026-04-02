import { useTranslation } from 'react-i18next'

const About = () => {
    const { t } = useTranslation()

    const benefits = t('about.benefits', { returnObjects: true }) as string[]
    const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]
    return (
        <section className="bg-white px-4 py-20 text-black dark:bg-black dark:text-white">
            <div className="mx-auto grid max-w-6xl gap-12  md:items-start">
                <div >
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                        {t('about.title')}
                    </h2>

                    <p className="mb-6 text-lg leading-8 text-black/75 dark:text-white/75">
                        {t('about.lead')}
                    </p>

                    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {benefits.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]"
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-5 text-base leading-8 text-black/75 dark:text-white/75">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    )
}

export default About