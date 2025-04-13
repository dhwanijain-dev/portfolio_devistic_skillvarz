
import { useEffect, useRef } from 'react'

const VaraText = () => {
    const containerRef = useRef()

    useEffect(() => {
        const vara = new Vara(containerRef.current, 'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json', [
            {
                text: "Hello from the easel!",
                y: 20,
                fromCurrentPosition: { y: false },
                duration: 2000
            }
        ])
    }, [])

    return (
        <Html transform position={[0, 1.2, 0.01]} rotation={[0, 0, 0]}>
            <div
                ref={containerRef}
                style={{
                    width: '300px',
                    height: '100px',
                    background: 'transparent'
                }}
            />
        </Html>
    )
}

export default VaraText