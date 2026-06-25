import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "NextCart - Store Dashboard",
    description: "NextCart - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
