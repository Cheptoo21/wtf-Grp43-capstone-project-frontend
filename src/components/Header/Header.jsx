
import Logo from "../Logo/Logo";
import ResponsiveNav from "../ui/responsive-nav";

    const navItems = [
        { label: "Features", to: "/" },
        { label: "About", to: "/signup" },
        { label: "Help", to: "/profile-setup" },
    ];

export default function Header() {
    return (
        <header className="py-6 flex items-center justify-between mx-auto">
            <Logo />
            <ResponsiveNav navItems={navItems} />
        </header>
    );
}