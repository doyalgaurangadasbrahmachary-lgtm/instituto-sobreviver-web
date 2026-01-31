import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-azure-deep to-azure-vibrant shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                {/* Instagram Link */}
                <a
                    href="https://instagram.com/institutosobreviver37"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-stone-100 transition-colors flex items-center gap-2"
                >
                    <span className="text-lg tracking-wide">@institutosobreviver37</span>
                    <span className="text-xs bg-red-500 text-white px-1 rounded">DEBUG-v2</span>
                </a>

                {/* Navigation - Centered and Uniform */}
                <nav className="hidden md:flex flex-1 justify-center gap-12">
                    <Link href="#historia" className="text-sm font-semibold uppercase tracking-wider text-white hover:text-stone-200 hover:underline decoration-2 underline-offset-4 transition-all">
                        Nossa História
                    </Link>
                    <Link href="#impacto" className="text-sm font-semibold uppercase tracking-wider text-white hover:text-stone-200 hover:underline decoration-2 underline-offset-4 transition-all">
                        Impacto
                    </Link>
                    <Link href="#servicos" className="text-sm font-semibold uppercase tracking-wider text-white hover:text-stone-200 hover:underline decoration-2 underline-offset-4 transition-all">
                        Serviços
                    </Link>
                </nav>

                <a
                    href="https://wa.me/553797783092"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border border-white text-white px-8 py-2 rounded-full font-bold text-sm hover:bg-azure-deep hover:text-[#34bbce] hover:border-azure-deep transition-all shadow-lg"
                >
                    Fale Conosco
                </a>
            </div>
        </header>
    );
}
