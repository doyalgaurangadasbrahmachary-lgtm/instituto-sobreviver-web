import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-azure-deep to-azure-vibrant shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-bone">
                {/* Instagram Link */}
                <a
                    href="https://instagram.com/institutosobreviver37"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-white transition-colors flex items-center gap-2 opacity-90 hover:opacity-100"
                >
                    <span className="text-lg tracking-wide">@institutosobreviver37</span>
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

                {/* Call to Action */}
                <a
                    href="https://wa.me/message/RSUNMVLOFHJYF1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-azure-deep text-bone px-8 py-2 rounded-full font-bold text-sm hover:bg-bone hover:text-azure-deep transition-all shadow-lg border border-transparent hover:border-azure-deep"
                >
                    Fale Conosco
                </a>
            </div>
        </header>
    );
}
