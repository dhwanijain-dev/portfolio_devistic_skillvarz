import { Text3D } from "@react-three/drei";

function SectionTitle({children,...props}) {
    return (  
<Text3D font={"fonts/Inter_Bold.json"} size = {0.3} {...props} curveSegments={20}>
    {children}
            <meshPhysicalMaterial
                
                metalness={0.8}
                roughness={0.2}
                reflectivity={0.9}
                clearcoat={0.3}
                color="#99ccff"
                
            />
            

        
</Text3D>

    );
}

export default SectionTitle;