interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'pill'
    size?: 'sm' | 'md' | 'lg'
}

const variants = {
    primary: 'bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80',
    outline: 'border border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white',
    ghost: 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10',
    pill: 'rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20',
}

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: ButtonProps) => (
    <button
        className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-bold uppercase tracking-wide
        transition-all duration-200
        ${variants[variant]} ${sizes[size]} ${className}
      `}
        {...props}
    >
        {children}
    </button>
)