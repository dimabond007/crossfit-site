import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'

const Hero = () => {
    const { t } = useTranslation()

    return (
        <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
            <picture className="absolute inset-0">
                <source media="(max-width: 767px)" srcSet="/hero_mobile.jpg" />
                <img
                    src="/hero_desktop.jpg"
                    alt="Crossfit hero background"
                    className="h-full w-full object-cover"
                />
            </picture>

            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-8 px-4 text-center">
                <img src="/logo.png" alt="Logo" />

                <h1 className="max-w-4xl text-5xl font-black uppercase italic leading-[0.9] tracking-tighter text-white sm:text-7xl md:text-8xl">
                    {t('hero.title')}
                </h1>

                <p className="max-w-xl text-lg text-white/70">
                    {t('hero.subtitle')}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" variant="primary">
                        {t('hero.cta')}
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black">
                        {t('hero.secondary')}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Hero