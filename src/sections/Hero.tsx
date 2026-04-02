import { useTranslation } from 'react-i18next'

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

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center px-4 text-center">
                <img
                    src="/logo.png"
                    alt="Logo"

                />

                <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                    {t('hero.title')}
                </h1>
            </div>
        </section>
    )
}

export default Hero