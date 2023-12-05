import CheckAuth from "./CheckAuth";

export default function DashboardLayout({ children }){
    return(
        <main >
            <CheckAuth />
            {children}
        </main>
    )
}