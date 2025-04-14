import React, { useState } from "react";
import { useMobile } from "../hooks/useMobile";
import { motion, AnimatePresence } from "framer-motion";

export const Menu = () => {
    const { isMobile } = useMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="menu fixed top-0left-0 w-full bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 py-2">
                <img
                    className="menu__logo mt-2"
                    src="logo.png"
                    alt="logo"
                />

                {!isMobile && (
                    <div className="menu__buttons flex gap-6 text-lg font-semibold text-gray-800">
                        <a href="#home" className="menu__button">
                            Home
                        </a>
                        <a href="#skills" className="menu__button">
                            Skills
                        </a>
                        <a href="#projects" className="menu__button">
                            Projects
                        </a>
                        <a href="#contact" className="menu__button">
                            Contact
                        </a>
                    </div>
                )}

                {isMobile && (
                    <button
                        className="menu__toggle text-gray-800 text-2xl"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? "✖" : "☰"}
                    </button>
                )}
            </div>

            {/* Mobile Menu with Smooth Transition */}
            <AnimatePresence>
                {isMobile && isMenuOpen && (
                    <motion.div
                        className="menu__mobile flex flex-col items-center gap-4 py-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <a href="#home" className="menu__button" onClick={toggleMenu}>
                            Home
                        </a>
                        <a href="#skills" className="menu__button" onClick={toggleMenu}>
                            Skills
                        </a>
                        <a href="#projects" className="menu__button" onClick={toggleMenu}>
                            Projects
                        </a>
                        <a href="#contact" className="menu__button" onClick={toggleMenu}>
                            Contact
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};