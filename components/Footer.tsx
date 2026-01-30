"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function Footer() {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isLocked, setIsLocked] = useState(false); // Mobile: lock tooltip if tapped
    const [copiedField, setCopiedField] = useState<string | null>(null);

    // Refs for timers
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const openTimerRef = useRef<NodeJS.Timeout | null>(null);
    const footerRef = useRef<HTMLElement>(null);

    // Mobile Auto-Open Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Mobile: Auto-open after 2s if visible
                        if (window.innerWidth < 768) {
                            openTimerRef.current = setTimeout(() => {
                                setIsTooltipVisible(true);

                                // Auto-close after 4s (requested change) if not locked
                                closeTimerRef.current = setTimeout(() => {
                                    setIsTooltipVisible((prev) => {
                                        // Prevents closing if user locked interaction
                                        // We rely on external locked state clearing logic
                                        return false;
                                    });
                                }, 4000);

                            }, 2000);
                        }
                    } else {
                        // Clear timers if scrolled away
                        if (openTimerRef.current) clearTimeout(openTimerRef.current);
                        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                        setIsTooltipVisible(false);
                        setIsLocked(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    // Desktop/General Logic Handlers
    const handleMouseEnterBtn = () => {
        if (window.innerWidth >= 768) {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            setIsTooltipVisible(true);
        }
    };

    const handleMouseLeaveBtn = () => {
        if (window.innerWidth >= 768) {
            // Wait 2s before closing
            closeTimerRef.current = setTimeout(() => {
                setIsTooltipVisible(false);
            }, 2000);
        }
    };

    const handleMouseEnterCard = () => {
        if (window.innerWidth >= 768) {
            // Keep open
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        }
    };

    const handleMouseLeaveCard = () => {
        if (window.innerWidth >= 768) {
            setIsTooltipVisible(false);
        }
    };

    // Mobile Interaction
    const handleTapCard = (e: React.MouseEvent | React.TouchEvent) => {
        // Stop bubbling to prevent immediate close/conflict
        e.stopPropagation();
        setIsLocked(true);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current); // Stop auto-close
    };

    const handleTapText = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        // Toggle visibility
        setIsTooltipVisible((prev) => !prev);
        setIsLocked(true); // Treat as intentional interaction
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };

    // Global click listener to close if locked (Mobile)
    useEffect(() => {
        const handleDocClick = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node;
            if (footerRef.current && !footerRef.current.contains(target)) {
                setIsTooltipVisible(false);
                setIsLocked(false);
            }
        };
        document.addEventListener("touchstart", handleDocClick);
        document.addEventListener("mousedown", handleDocClick);
        return () => {
            document.removeEventListener("touchstart", handleDocClick);
            document.removeEventListener("mousedown", handleDocClick);
        };
    }, []);


    // Robust Copy Function (Handles HTTP/LAN contexts)
    const copyToClipboard = async (text: string, fieldId: string) => {
        try {
            // Try modern API first (works on localhost/HTTPS)
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                throw new Error("Clipboard API unavailable");
            }
        } catch (err) {
            // Fallback for non-secure contexts (like mobile IP access)
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;

                // Ensure it's not visible but part of DOM
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                textArea.setAttribute("readonly", "");

                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (!successful) throw new Error("Fallback copy failed");
            } catch (fallbackErr) {
                console.error("Copy failed:", fallbackErr);
                return; // Don't show success if it truly failed
            }
        }

        // Show success feedback
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <motion.footer
            ref={footerRef}
            className="bg-azure-deep text-white py-16 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">

                {/* Left Side: Animated Face Logo */}
                <motion.div
                    className="relative w-32 h-32 md:w-40 md:h-40"
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src="/images/rostro logo.png"
                        alt="Instituto Sobre'Viver"
                        fill
                        className="object-contain"
                    />
                </motion.div>

                {/* Right Side: Contact Info & Links */}
                <div className="text-center md:text-right flex flex-col items-center md:items-end space-y-2">
                    {/* Section Title */}
                    <motion.h3
                        className="text-3xl font-bold text-azure-vibrant mb-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Fale Conosco
                    </motion.h3>

                    {/* Address */}
                    <motion.p
                        className="text-white/80 text-sm md:text-base mb-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Rua Itaguara, 50 - Vila Espírito Santo, Divinópolis/MG
                    </motion.p>


                    {/* Donation CTA with Smart Logic */}
                    <div className="relative group mb-6 flex flex-col items-center md:items-end">
                        <motion.button
                            className="text-xl md:text-2xl font-bold text-azure-vibrant cursor-pointer transition-colors duration-300 text-center md:text-right relative z-30"
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={handleMouseEnterBtn}
                            onMouseLeave={handleMouseLeaveBtn}
                            onClick={handleTapText} // Mobile tap handler
                        >
                            <motion.div
                                animate={{
                                    y: [0, -4, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-block"
                            >
                                <motion.span
                                    animate={{
                                        color: ["#34bbce", "#ffffff", "#34bbce"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    Transforme Vidas
                                </motion.span>
                            </motion.div>
                            <br />
                            <span className="text-white text-base md:text-lg font-normal">Faça sua Doação</span>
                        </motion.button>

                        {/* Smart Tooltip Card */}
                        <div
                            className={`absolute bottom-full mb-6 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 w-80 bg-white text-azure-deep p-6 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 z-[9999] border border-azure-deep/5 backdrop-blur-sm transform origin-bottom ${isTooltipVisible ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-4 scale-95'}`}
                            onMouseEnter={handleMouseEnterCard}
                            onMouseLeave={handleMouseLeaveCard}
                            onClick={handleTapCard}
                        >
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-auto md:right-10 -mt-[1px] border-[10px] border-transparent border-t-white drop-shadow-sm"></div>

                            <div className="text-center relative z-10">
                                <h4 className="font-bold text-xl mb-3 border-b border-azure-deep/10 pb-2 text-azure-vibrant">Dados Bancários</h4>

                                <div className="space-y-3 text-sm font-medium">
                                    {/* Row 1: Banco */}
                                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-azure-deep/70">Banco</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-base">748</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); copyToClipboard("748", "banco"); }}
                                                className="text-azure-vibrant hover:text-azure-deep transition-colors p-1"
                                                title="Copiar Banco"
                                            >
                                                {copiedField === "banco" ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Row 2: Cooperativa */}
                                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-azure-deep/70">Cooperativa</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-base">0221</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); copyToClipboard("0221", "coop"); }}
                                                className="text-azure-vibrant hover:text-azure-deep transition-colors p-1"
                                                title="Copiar Agência"
                                            >
                                                {copiedField === "coop" ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Row 3: Conta */}
                                    <div className="flex justify-between items-center bg-azure-deep/10 p-2 rounded-lg border border-azure-deep/20 hover:bg-azure-deep/20 transition-colors">
                                        <span className="text-azure-deep/80">Conta</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-lg text-azure-deep">06909-8</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); copyToClipboard("06909-8", "conta"); }}
                                                className="text-azure-vibrant hover:text-azure-deep transition-colors p-1"
                                                title="Copiar Conta"
                                            >
                                                {copiedField === "conta" ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Footer: Pix */}
                                    <div className="pt-2 mt-2">
                                        <p className="text-xs uppercase tracking-wider text-azure-deep/50 mb-1">Chave Pix (CNPJ)</p>
                                        <div className="flex justify-center items-center gap-2">
                                            <p className="font-bold text-lg select-all cursor-text text-azure-deep">52.966.894/0001-72</p>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); copyToClipboard("52.966.894/0001-72", "pix"); }}
                                                className="text-azure-vibrant hover:text-azure-deep transition-colors p-1"
                                                title="Copiar PIX"
                                            >
                                                {copiedField === "pix" ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links Container */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {/* Whatsapp Link - Hover Effect: White -> Azure Vibrant, No Underline */}
                        <a
                            href="https://wa.me/553797783092"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-white hover:text-azure-vibrant transition-colors duration-300 no-underline"
                        >
                            Whatsapp Oficial
                        </a>

                        {/* Instagram Link - Hover Effect: White -> Azure Vibrant, No Underline */}
                        <a
                            href="https://instagram.com/institutosobreviver37"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-white hover:text-azure-vibrant transition-colors duration-300 no-underline"
                        >
                            Instagram
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Copyright / Bottom Bar */}
            <motion.div
                className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center md:text-left text-sm text-white/40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <p>&copy; 2026 Instituto Sobre&apos;Viver. Todos os direitos reservados.</p>
            </motion.div>
        </motion.footer>
    );
}
