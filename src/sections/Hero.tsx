import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

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

                <h2 className="max-w-xl text-2xl font-medium text-white/90 sm:text-3xl">
                    {t('hero.subtitle')}
                </h2>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://wa.me/972547244553?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%90%D7%99%D7%9E%D7%95%D7%9F%20%D7%A0%D7%99%D7%A1%D7%99%D7%95%D7%9F%20%F0%9F%92%AA" target="_blank" rel="noreferrer">
                        <Button size="lg" variant="primary" className="!bg-orange-500 !text-white shadow-lg shadow-orange-500/30 hover:!bg-orange-600">
                            {t('hero.cta')}
                        </Button>
                    </a>
                    <Link to="/schedule">
                        <Button size="lg" variant="primary" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-black">
                            {t('hero.secondary')}
                        </Button>
                    </Link>
                </div>

                <a href="tel:+972547244553" className="inline-flex items-center gap-2 text-lg text-white/70 hover:text-orange-500" aria-label="Phone" dir="ltr">
                    <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                    054-724-4553
                </a>
            </div>
        </section>
    )
}

export default Hero