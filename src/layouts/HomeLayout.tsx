import Nav from "../components/organisms/Nav";

export default function HomeLayout({ children } : {children: React.ReactNode}) {
    return (
        <main className="HomeLayout">
            <Nav />
            <section className="HeroSection">
                {children}
            </section>
        </main>
    )
}