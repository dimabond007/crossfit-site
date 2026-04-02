
import type { ReactNode } from 'react'
import Header from '../components/Header'

type Props = {
    children: ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <footer className="border-t border-black/10 dark:border-white/10 p-4 text-center text-sm">
                © 2026 Crossfit
            </footer>
        </div>
    )
}

export default MainLayout