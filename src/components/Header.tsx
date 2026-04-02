import { ChevronDownIcon } from 'lucide-react'
import i18n from '../i18n'
import { useState } from 'react'

const Header = () => {

    const [open, setOpen] = useState(false)
    const changeLang = (lng: 'en' | 'ru' | 'he') => {
        i18n.changeLanguage(lng)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-black/90">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <div className="text-lg font-bold">
                    <img src="/logo.png" alt="Logo" className="w-20 object-contain" />
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 sm:flex">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition hover:bg-black dark:border-white/10 dark:hover:bg-white"
                        >
                            <img
                                src="/facebook.svg"
                                alt="facebook"
                                className="h-4 w-4 invert-0 dark:invert transition group-hover:invert"
                            />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition hover:bg-black dark:border-white/10 dark:hover:bg-white"
                        >
                            <img
                                src="/instagram.svg"
                                alt="instagram"
                                className="h-4 w-4 invert-0 dark:invert transition group-hover:invert"
                            />
                        </a>

                        <a
                            href="https://wa.me/972000000000"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition hover:bg-black dark:border-white/10 dark:hover:bg-white"
                        >
                            <img
                                src="/whatsapp.svg"
                                alt="whatsapp"
                                className="h-4 w-4 invert-0 dark:invert transition group-hover:invert"
                            />
                        </a>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
                        >
                            {i18n.language.toUpperCase()}
                            <span className={`transition ${open ? 'rotate-180' : ''}`}><ChevronDownIcon className="h-4 w-4" /></span>
                        </button>

                        {open && (
                            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-24 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-black">                                {['en', 'ru', 'he'].map((lng) => (
                                <button
                                    key={lng}
                                    onClick={() => {
                                        changeLang(lng as 'en' | 'ru' | 'he')
                                        setOpen(false)
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm transition hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    {lng.toUpperCase()}
                                </button>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header