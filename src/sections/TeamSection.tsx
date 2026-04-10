import { useTranslation } from 'react-i18next'
import { teamImages } from '../data/team'
import { SectionTitle } from '../components/ui/SectionTitle'

const TeamSection = () => {
    const { t } = useTranslation()
    const members = t('team.members', { returnObjects: true }) as any[]

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <SectionTitle title={t('team.title')} />

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                    {members.map((member, index) => (
                        <div key={index} className="group text-center">
                            <div className="mb-4 overflow-hidden rounded-3xl">
                                <img
                                    src={teamImages[member.name.toLowerCase().replace(/ /g, '') as keyof typeof teamImages]}
                                    alt={member.name}
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-lg font-black uppercase italic tracking-tight">
                                {member.name}
                            </div>
                            <div className="text-sm text-black/60 dark:text-white/60">
                                {member.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TeamSection