interface BadgeProps {
    variant?: 'green' | 'red' | 'gray' | 'yellow'
    children: React.ReactNode
}

const variants = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    gray: 'bg-black/5 text-black/50 dark:bg-white/5 dark:text-white/50',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

export const Badge = ({ variant = 'gray', children }: BadgeProps) => (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${variants[variant]}`}>
        {children}
    </span>
)