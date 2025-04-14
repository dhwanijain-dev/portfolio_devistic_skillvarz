import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PhoneBooth(props) {
    const { nodes, materials } = useGLTF('/models/Phonebooth.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane_1.geometry}
                material={materials['Material.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane_2.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane_3.geometry}
                material={materials['Material.003']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane_4.geometry}
                material={materials['03___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane_5.geometry}
                material={materials['08___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane_6.geometry}
                material={materials['04___Default']}
            />
        </group>
    )
}

useGLTF.preload('/models/Phonebooth.glb')
