interface SectionTitleProps {
    label?: string
    title: string
    subtitle?: string
    center?: boolean
}

export const SectionTitle = ({ label, title, subtitle, center = false }: SectionTitleProps) => (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
        {label && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
                {label}
            </p>
        )}
        <h2 className="text-4xl font-black uppercase italic tracking-tighter sm:text-5xl">
            {title}
        </h2>
        {subtitle && (
            <p className="mt-4 text-lg text-black/60 dark:text-white/60">
                {subtitle}
            </p>
        )}
    </div>
)