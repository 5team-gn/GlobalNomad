import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function MainLayout({children}:{children: React.ReactNode}) {
    return (
        <div>
            <Header/>
            <main className="grow">{children}</main>
            <Footer/>
        </div>
    )
}