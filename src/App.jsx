import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls, useProgress } from "@react-three/drei";
import { config } from "./config";
import { MotionConfig } from "framer-motion";
import { Interface } from "./components/Interface";
import { Menu } from "./components/Menu";
 
const TerminalLoader = ({ onLoadingComplete }) => {
  const { progress } = useProgress();
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [allCommandsTyped, setAllCommandsTyped] = useState(false);
  const containerRef = useRef(null);

  const commands = [
    "Initializing system modules...",
    "Loading 3D assets...",
    "Setting up shaders...",
    "Creating scene graph...",
    "Linking environment...",
    "Deploying portfolio shell...",
    "Finalizing setup..."
  ];
 
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && allCommandsTyped) {
        onLoadingComplete();
      } else if (e.key === "Escape") {
 
        setCurrentCommandIndex(commands.length);
        setCurrentCharIndex(0);
        setAllCommandsTyped(true);
      }
    };

    const handleTap = () => {
      if (allCommandsTyped) {
        onLoadingComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleTap);  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleTap);
    };
  }, [allCommandsTyped, onLoadingComplete, commands.length]);

 
  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
 
      setAllCommandsTyped(true);
      return;
    }

    if (currentCharIndex < commands[currentCommandIndex].length) {
 
      const typingSpeed = 30 + Math.random() * 40; 
      const timer = setTimeout(() => {
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
 
      const nextCommandDelay = 200 + Math.random() * 500;  
      const timer = setTimeout(() => {
        setCurrentCommandIndex((prevIndex) => prevIndex + 1);
        setCurrentCharIndex(0);
      }, nextCommandDelay);

      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex, currentCharIndex, commands]);
 
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
          <div className="mb-4">
            <div className="text-sm mb-1">System loading: {Math.round(progress)}%</div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {commands.slice(0, currentCommandIndex).map((cmd, index) => (
            <div key={index} className="command-line mb-1">
              <span className="text-blue-400">$</span> <span>{cmd}</span>
              <span className="text-green-300 ml-2">[OK]</span>
            </div>
          ))}

          {currentCommandIndex < commands.length && (
            <div className="command-line">
              <span className="text-blue-400">$</span>{" "}
              <span>{commands[currentCommandIndex].substring(0, currentCharIndex)}</span>
              {showCursor && <span className="cursor">_</span>}
            </div>
          )}

          {allCommandsTyped && (
            <div className="mt-4 text-white text-center animate-pulse">
              Press Enter or Tap to launch portfolio...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <TerminalLoader onLoadingComplete={handleLoadingComplete} />}

      <div className={`portfolio-content w-full h-screen ${isLoading ? 'hidden' : 'block'}`}>
        <Canvas camera={{ position: [0, 0.5, 5], fov: 42 }}>
          <color attach="background" args={["#f5f3ee"]} />
          <fog attach="fog" args={["#f5f3ee", 10, 50]} />

          <Suspense fallback={null}>
            <ScrollControls pages={config.sections.length} damping={0.1} maxSpeed={0.2}>
              <MotionConfig transition={{
                duration: 0.6,
              }}>
                <group position-y={-1}>
                  <Experience />
                </group>
              </MotionConfig>
              <Scroll html>
                <MotionConfig
                  transition={{
                    duration: 1,
                  }}
                >
                  <Interface />
                </MotionConfig>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>

        <Menu />
      </div>
    </>
  );
}

export default App;