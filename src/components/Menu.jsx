import React, { useState } from "react";
import { useMobile } from "../hooks/useMobile";

export const Menu = () => {
    const { isMobile } = useMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="menu fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                 <img
                    className="menu__logo"
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

             {isMobile && isMenuOpen && (
                <div className="menu__mobile   shadow-md flex flex-col items-center gap-4 py-4">
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
                </div>
            )}
        </nav>
    );
};