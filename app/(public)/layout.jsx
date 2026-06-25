'use client'
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {

    return (
        <>
            <Banner />
            {children}
            <Footer />
        </>
    );
}
