import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export const metadata = {
    title: "NextCart. - Shop smarter",
    description: "NextCart. - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={outfit.className} suppressHydrationWarning>
                <StoreProvider>
                    <AuthProvider>
                        <Navbar />        
                        {children}
                        <Toaster position="top-right" />
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}