
import About from "../sections/About";
import AppSection from "../sections/AppSection";
import Classes from "../sections/Classes";
import Hero from "../sections/Hero";
import InstagramSection from "../sections/InstagramSection";
import TeamSection from "../sections/TeamSection";

export default function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <Classes />
            <AppSection />
            <TeamSection />
            <InstagramSection />
        </>
    )
}