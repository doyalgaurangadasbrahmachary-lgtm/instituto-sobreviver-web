"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

// Componente Especial para el Título con Animación de Cinta
const RibbonTitle = () => {
    return (
        <div className="relative inline-block mb-4">
            {/* 1. Texto Base (Fondo) */}
            {/* Inicialmente Azul Oscuro, luego se transforma a Azul Claro y crece */}
            <motion.h2
                className="text-4xl font-bold relative z-0"
                initial={{ color: "#003366", scale: 1 }} // azure-deep approx
                whileInView={{
                    color: "#00BFFF", // azure-vibrant approx
                    scale: 1.15,
                    transition: { delay: 1.8, duration: 0.5, ease: "backOut" } // Se activa DESPUÉS de la cinta
                }}
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            >
                Nosso Impacto
            </motion.h2>

            {/* 2. La Cinta Mágica (Máscara + Texto Blanco) */}
            {/* Contenedor que se mueve de Izquierda a Derecha */}
            <motion.div
                className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
                initial={{ clipPath: "inset(0 100% 0 0)" }} // Oculto a la izquierda
                whileInView={{
                    clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"], // Entra -> Se ve -> Sale por derecha
                    transition: { duration: 1.8, ease: "easeInOut" }
                }}
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            >
                {/* Fondo de la Cinta (Azul Claro + Gradiente de Cola) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00BFFF] to-[#00BFFF] opacity-90"></div>

                {/* Texto Blanco (Sobre la cinta) */}
                {/* IMPORTANTE: Este texto debe "quedarse quieto" visualmente.
                    Si el contenedor padre se usa como máscara, el contenido se mueve con él.
                    Para que el texto parezca estático en la pantalla y solo se revele, 
                    necesitamos alinearlo perfectamente. */}
                <h2 className="text-4xl font-bold text-white relative z-20">
                    Nosso Impacto
                </h2>
            </motion.div>
        </div>
    );
};


export default function BentoGrid() {
    const items = [
        {
            id: 1,
            image: "/images/seccion2.1.png",
            title: "IMPACTO SOCIAL SUPERIOR R$145 MIL COM SERVIÇOS PALIATIVOS",
            subtitle: "21 Pacientes ativos mensalmente",
            description: "Recebendo cuidados integrais e atenção multidisciplinar personalizada.",
        },
        {
            id: 2,
            image: "/images/seccion2.2.png",
            title: "BLOQUEIO JUDICIAL DE R$384 MIL PARA TRATAMENTOS DE PACIENTES TERMINAIS",
            subtitle: "370+ Pessoas Atendidas",
            description: "Nos últimos dois anos, oferecendo suporte contínuo e humano.",
        }
    ];

    return (
        <section id="impacto" className="py-24 bg-[#f8f7f4]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 flex flex-col items-center">

                    {/* Título con Animación de Cinta */}
                    <RibbonTitle />

                    {/* Subtítulo con Fade-In Suave */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.0, duration: 0.8 }} // Aparece después de la cinta
                        className="text-xl text-azure-deep/70 max-w-2xl mx-auto font-light"
                    >
                        Transformando realidades através do cuidado integral.
                    </motion.p>
                </div>

                <div className="flex flex-col gap-16">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
                        >
                            {/* Image Container with Hover Effect */}
                            <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                                <motion.div
                                    className="relative w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                </motion.div>
                            </div>

                            {/* Text Content - Enclosed in 3D Card */}
                            <motion.div
                                className="w-full md:w-1/2 p-8 bg-white rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group/card"
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="flex flex-col items-start text-left space-y-4 relative z-10">
                                    {/* 1. Large Light Blue Text (Title) */}
                                    <h3 className="text-2xl md:text-3xl font-black text-azure-vibrant leading-tight uppercase tracking-tight drop-shadow-sm">
                                        {item.title}
                                    </h3>

                                    {/* Separator */}
                                    <div className="w-20 h-1.5 bg-gradient-to-r from-azure-vibrant to-azure-deep/20 rounded-full opacity-50"></div>

                                    {/* 2. Dark Blue Bold Text (Subtitle/Stats) */}
                                    <h4 className="text-xl font-bold text-azure-deep">
                                        {item.subtitle}
                                    </h4>

                                    {/* 3. Small No-Bold Description */}
                                    <p className="text-lg text-azure-deep/80 leading-relaxed font-normal">
                                        {item.description}
                                    </p>
                                </div>

                                {/* 3D Shine Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover/card:translate-x-full ease-in-out"></div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
