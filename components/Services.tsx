"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const services = [
    {
        title: "Terapias Integrativas",
        description: "Ozonioterapia, Acupuntura, Auriculoterapia, Reiki e Massoterapia para alívio da dor e bem-estar.",
        image: "/images/3.png",
        className: "object-center"
    },
    {
        title: "Suporte Profissional",
        description: "Equipe multidisciplinar com Psicologia e Suporte Jurídico para garantir direitos e saúde mental.",
        image: "/images/service_focus.png",
        className: "object-center"
    },
    {
        title: "Atividades & Inclusão",
        description: "Aulas de Artes e eventos comunitários (Bazar, Feijuca) para integração social e angariação de fundos.",
        image: "/images/service3.jpg",
        className: "object-center"
    }
];

export default function Services() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Listener
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="servicos" className="pb-24 bg-white/40">
            {/* Full Width Ribbon Header */}
            <div className="w-full mb-16 group relative cursor-default transition-all duration-500 ease-in-out py-10 shadow-lg">
                {/* Ribbon Background Shape - Full Width */}
                <motion.div
                    className="absolute inset-0 bg-azure-vibrant md:group-hover:bg-azure-deep transition-colors duration-500"
                    animate={isMobile ? {
                        backgroundColor: ["#24526e", "#24526e", "#34bbce", "#34bbce", "#24526e"],
                    } : {}}
                    transition={{
                        duration: 9, // 4s + 5s
                        times: [0, 0.44, 0.45, 0.99, 1], // 0-44%(4s) Dark, 45-99%(5s) Light, 100% Loop
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Content Container - Centered */}
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    {/* Main Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-azure-deep mb-2 transition-colors duration-500 group-hover:text-white md:group-hover:text-white relative">
                        {/* We might need to animate text color too on mobile to match background contrast? 
                            Azure Deep BG -> Text White.
                            Azure Vibrant BG -> Text Azure Deep (default).
                        */}
                        <motion.span
                            animate={isMobile ? {
                                color: ["#ffffff", "#ffffff", "#24526e", "#24526e", "#ffffff"],
                            } : {}}
                            transition={{
                                duration: 9,
                                times: [0, 0.44, 0.45, 0.99, 1],
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="md:group-hover:text-white"
                        >
                            Nossos Serviços
                        </motion.span>
                    </h2>
                    {/* Subtitle/Quote */}
                    <p className="text-xl text-gray-600 font-medium italic transition-colors duration-500 group-hover:text-azure-vibrant relative">
                        <motion.span
                            animate={isMobile ? {
                                color: ["#34bbce", "#34bbce", "#4b5563", "#4b5563", "#34bbce"], // Vibrant on Dark BG, Gray on Light BG
                            } : {}}
                            transition={{
                                duration: 9,
                                times: [0, 0.44, 0.45, 0.99, 1],
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="md:group-hover:text-azure-vibrant"
                        >
                            &quot;Curar algumas vezes, aliviar frequentemente, confortar sempre.&quot;
                        </motion.span>
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className={`object-cover ${service.className} grayscale-transition group-hover:scale-110 duration-700`}
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-azure-deep mb-3 group-hover:text-azure-vibrant transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            <div className="h-1 bg-azure-deep w-0 group-hover:w-full transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
