import Logo from "../Logo/Logo";

export default function Header(){
    return (
        <header className='py-6 flex items-center justify-between mx-auto'>
            <Logo />
            <nav>
                <ul className='flex justify-center space-x-8'>
                    <li><a href="/" className='text-slate-500 hover:text-gray-900 text-sm font-medium font-manrope'>Features</a></li>
                    <li><a href="/signup" className='text-slate-500  hover:text-gray-900 text-sm font-medium font-manrope'>About</a></li>
                    <li><a href="/signup" className='text-slate-500 hover:text-gray-900 text-sm font-medium font-manrope'>Help</a></li>
                </ul>
            </nav>
        </header>
        
    )
}