import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function MainLayout({children}:{children: React.ReactNode}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="grow">{children}</main>
            <Footer/>
        </div>
    )
}