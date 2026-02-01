"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import QuemSomosModal from './QuemSomosModal';

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const [isAutoAnimating, setIsAutoAnimating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileTapActive, setMobileTapActive] = useState(false);

    // Mobile Check
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, []);

    // Auto Animation Loop
    useEffect(() => {
        let activeTimer: NodeJS.Timeout;
        let inactiveTimer: NodeJS.Timeout;
        let isMounted = true;

        const startLoop = () => {
            if (!isMounted) return;
            setIsAutoAnimating(true);

            // Active for 5 seconds
            activeTimer = setTimeout(() => {
                if (!isMounted) return;
                setIsAutoAnimating(false);

                // Inactive for 7 seconds, then restart
                inactiveTimer = setTimeout(() => {
                    if (!isMounted) return;
                    startLoop();
                }, 7000);
            }, 5000);
        };

        // Start initially
        startLoop();

        return () => {
            isMounted = false;
            clearTimeout(activeTimer);
            clearTimeout(inactiveTimer);
        };
    }, []);

    // Logic for showing waves: 
    // Mobile: ONLY auto animation (ignore hover/tap for waves)
    // Desktop: Auto OR Hover
    const showWaves = isMobile ? isAutoAnimating : (isHovered || isAutoAnimating);

    // Animation variants for the waves
    const waveVariants = {
        hidden: { x: '-100%', opacity: 0 },
        visible: (custom: number) => ({
            x: '0%',
            opacity: 1,
            transition: {
                duration: 1.2,
                delay: custom * 0.2,
                ease: "easeInOut" as const
            }
        }),
        exit: (custom: number) => ({
            x: '-100%',
            opacity: 0,
            transition: {
                duration: 0.8,
                delay: custom * 0.1,
                ease: "easeInOut" as const
            }
        }),
        // Oscillating movement when visible
        animate: (custom: number) => ({
            x: ['0%', showWaves ? (custom % 2 === 0 ? '5%' : '-5%') : '-100%'],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "mirror" as const,
                    duration: 3 + custom,
                    ease: "easeInOut" as const,
                }
            }
        })
    };

    // Pink Circle Variants
    const circleVariants = {
        hidden: { pathLength: 0, opacity: 0, rotate: -90 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 0.4, // Fast creation
                ease: "easeOut" as const
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1.0, // Slow fade
                ease: "easeIn" as const
            }
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-bone">

            <QuemSomosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Interlacing Waves Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                {/* Wave 1: Deep Slate Teal (Back) - Visible but soft */}
                <motion.div
                    className="absolute bottom-0 w-[300%] md:w-[150%] h-[120%] text-[#24526e]/15 fill-current"
                    custom={0}
                    initial="hidden"
                    animate={showWaves ? "visible" : "exit"}
                    variants={waveVariants}
                    style={{ left: '-20%' }}
                >
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </motion.div>

                {/* Wave 2: Medium Soft Teal (Middle) - The main color */}
                <motion.div
                    className="absolute bottom-0 w-[300%] md:w-[150%] h-[100%] text-[#4a8ea1]/15 fill-current"
                    custom={1}
                    initial="hidden"
                    animate={showWaves ? "visible" : "exit"}
                    variants={waveVariants}
                    style={{ left: '-10%' }}
                >
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </motion.div>

                {/* Wave 3: Lightest Slate (Front) - Subtle overlay */}
                <motion.div
                    className="absolute bottom-0 w-[300%] md:w-[150%] h-[90%] text-[#8bbcc4]/12 fill-current"
                    custom={2}
                    initial="hidden"
                    animate={showWaves ? "visible" : "exit"}
                    variants={waveVariants}
                    style={{ left: '-15%' }}
                >
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,133.3C672,139,768,213,864,229.3C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </motion.div>

            </div>

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Area - Left */}
                <motion.div
                    className="flex flex-col items-start text-left z-10 order-2 md:order-1"
                    animate={{ scale: isHovered ? 1.05 : 1, x: isHovered ? 10 : 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-azure-deep mb-6 drop-shadow-sm leading-tight">
                        Instituto <br />
                        Sobre&apos;Viver
                    </h1>
                    <p className="text-xl md:text-2xl text-azure-deep/70 mb-8 leading-relaxed font-light">
                        &quot;Para quem tem fé, a vida nunca acaba.&quot; <br />
                        Cuidamos de pessoas que enfrentam doenças graves, progressivas e sem possibilidade de cura, oferecendo cuidados paliativos com respeito, dignidade e acolhimento.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-azure-vibrant text-bone rounded-full font-bold text-lg hover:bg-azure-deep hover:text-white transition-all transform hover:scale-105 shadow-lg text-center cursor-pointer"
                        >
                            Quem Somos
                        </button>
                    </div>
                </motion.div>

                {/* Logo Area - Right */}
                <motion.div
                    className="relative w-full h-[400px] md:h-[600px] flex justify-center items-center order-1 md:order-2 cursor-pointer"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onTapStart={() => {
                        // On Mobile, Tap does NOT trigger waves (isHovered stays false effectively for wave logic due to showWaves check)
                        if (!isMobile) setIsHovered(true);

                        setMobileTapActive(true);
                        setTimeout(() => setMobileTapActive(false), 2000); // 2s total lifecycle
                    }}
                    onTapCancel={() => setIsHovered(false)}
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ rotate: [0, -2, 2, 0], transition: { duration: 2, repeat: Infinity } }}
                >
                    {/* Pink Circle Animation (Mobile Only) - Z-Index 20 to be ABOVE logo */}
                    {isMobile && (
                        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                            <svg
                                className="w-[108%] h-[108%] max-w-[500px] max-h-[500px] mt-4"
                                viewBox="0 0 100 100"
                                style={{ transform: 'rotate(-90deg)' }}
                            >
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="49"
                                    fill="none"
                                    stroke="#ffccd5"
                                    strokeWidth="2"
                                    variants={circleVariants}
                                    initial="hidden"
                                    animate={mobileTapActive ? "visible" : "exit"}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    )}

                    <Image
                        src="/images/logo.png"
                        alt="Instituto Sobre'Viver Logo"
                        fill
                        className="object-contain drop-shadow-2xl relative z-10"
                        priority
                    />
                </motion.div>

            </div>
        </section>
    );
}
