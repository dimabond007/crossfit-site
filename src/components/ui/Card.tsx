interface CardProps {
    children: React.ReactNode
    className?: string
    accent?: string   // цвет левой полоски
    hover?: boolean
}

export const Card = ({ children, className = '', accent, hover = true }: CardProps) => (
    <div
        className={`
        relative rounded-2xl border border-black/10 bg-white p-5
        dark:border-white/10 dark:bg-white/5
        ${hover ? 'transition-all hover:border-black/20 hover:shadow-lg dark:hover:border-white/20' : ''}
        ${className}
      `}
    >
        {accent && (
            <div
                className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                style={{ backgroundColor: accent }}
            />
        )}
        {children}
    </div>
)