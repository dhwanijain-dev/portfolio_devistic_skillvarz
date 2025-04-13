import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';

// Terminal-style loader component
const TerminalLoader = ({ onLoadingComplete }) => {
    const { progress } = useProgress();
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [allCommandsTyped, setAllCommandsTyped] = useState(false);
    const containerRef = useRef(null);

    // List of commands to display
    const commands = [
        "Initializing system modules...",
        "Loading 3D assets...",
        "Setting up shaders...",
        "Creating scene graph...",
        "Linking environment...",
        "Starting renderer...",
        "Compiling custom material...",
        "Establishing connection...",
        "Deploying portfolio shell...",
        "Finalizing setup..."
    ];

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    // Handle keypresses to skip animation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && allCommandsTyped) {
                onLoadingComplete();
            } else if (e.key === 'Escape') {
                // Skip to the end of the animation
                setCurrentCommandIndex(commands.length);
                setCurrentCharIndex(0);
                setAllCommandsTyped(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [allCommandsTyped, onLoadingComplete, commands.length]);

    // Typing effect for each command
    useEffect(() => {
        if (currentCommandIndex >= commands.length) {
            // All commands completed
            setAllCommandsTyped(true);
            return;
        }

        if (currentCharIndex < commands[currentCommandIndex].length) {
            // Continue typing current command
            const typingSpeed = 30 + Math.random() * 40; // Random typing speed for realism
            const timer = setTimeout(() => {
                setCurrentCharIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);

            return () => clearTimeout(timer);
        } else {
            // Current command finished typing
            const nextCommandDelay = 200 + Math.random() * 500; // Random delay between commands
            const timer = setTimeout(() => {
                setCurrentCommandIndex(prevIndex => prevIndex + 1);
                setCurrentCharIndex(0);
            }, nextCommandDelay);

            return () => clearTimeout(timer);
        }
    }, [currentCommandIndex, currentCharIndex, commands]);

    // Scroll to bottom effect
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [currentCommandIndex, currentCharIndex]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div
                className="terminal-container bg-black text-green-500 font-mono p-6 rounded shadow-lg w-full md:w-2/3 lg:w-1/2 h-80 overflow-auto"
                ref={containerRef}
            >
                <div className="terminal-header flex items-center mb-4">
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <div className="text-xs ml-2">portfolio@dhwani ~</div>
                </div>

                <div className="terminal-content">
                    {/* Progress bar */}
                    <div className="mb-4">
                        <div className="text-sm mb-1">System loading: {Math.round(progress)}%</div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Previous commands - fully typed */}
                    {commands.slice(0, currentCommandIndex).map((cmd, index) => (
                        <div key={index} className="command-line mb-1">
                            <span className="text-blue-400">$</span> <span>{cmd}</span>
                            <span className="text-green-300 ml-2">[OK]</span>
                        </div>
                    ))}

                    {/* Current command - being typed */}
                    {currentCommandIndex < commands.length && (
                        <div className="command-line">
                            <span className="text-blue-400">$</span>{" "}
                            <span>{commands[currentCommandIndex].substring(0, currentCharIndex)}</span>
                            {showCursor && <span className="cursor">_</span>}
                        </div>
                    )}

                    {/* Enter to continue - only shown when all commands are complete */}
                    {allCommandsTyped && (
                        <div className="mt-4 text-white text-center animate-pulse">
                            Press Enter to launch portfolio...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

return(
    <>
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
    </>
)




    export default TerminalLoader;