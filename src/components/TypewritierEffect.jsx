import { Text } from '@react-three/drei'
import { useState, useEffect } from 'react'

const TypewriterText = ({ fullText = "Hello, world!", position }) => {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, i + 1))
            i++
            if (i === fullText.length) clearInterval(interval)
        }, 100) // adjust typing speed
        return () => clearInterval(interval)
    }, [fullText])

    return (
        <Text
            fontSize={0.2}
            color="black"
            position={position}
            maxWidth={2}
            anchorX="center"
            anchorY="middle"
        >
            {displayedText}
        </Text>
    )
}

export default TypewriterText