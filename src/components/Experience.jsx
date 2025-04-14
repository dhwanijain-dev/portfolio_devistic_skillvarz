import { Center, ContactShadows, Environment, Float, MeshDistortMaterial, MeshReflectorMaterial, PointMaterial, Points, RoundedBox, Sky, Stars, Text, useScroll } from "@react-three/drei";
import { Avatar } from "./Avatar";
import SectionTitle from "./SectionTitle";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MacBookPro } from "./MacBookPro";
import * as THREE from "three";
import { config } from "../config";
import { BookCase } from "./BookCase";
import {Monitor} from "./Monitor"
import {Lamp} from "./Lamp"
import { Balloon } from "./Balloon";
import { Mailbox } from "./Mailbox";
import { ParkBench } from "./ParkBench";
import {motion} from "framer-motion-3d";
import { MonitorScreen } from "./MonitorScreen";
import { Heart } from "./Heart";
import { useMobile } from "../hooks/useMobile";
import { Easel } from "./easel";
import { CouchLarge } from "./couch";
import { Html } from '@react-three/drei'
import { PhoneBooth } from "./Phonebooth";
import Confetti from "react-confetti-boom";
import { Pigeon } from "./Pigeon";
import RotatingText from "./RotatingText";
const SECTION_DISTANCE =  10
function Particles() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i] = (Math.random() - 0.5) * 5;
    }
    return arr;
  });
  

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="black" size={0.05} transparent />
    </Points>
  );
}


export const Experience = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleMailboxClick = () => {
    const email = "dhwanijain2601@gmail.com";
    const subject = encodeURIComponent("Hello");
    const body = encodeURIComponent("Hi there!");
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 3000);
  };
  const[section,setSection] = useState(config.sections[0])
  const { isMobile, scaleFactor } = useMobile();
  const sceneContainer = useRef()
  const scrollData = useScroll()

  useFrame(()=>{
    if (isMobile) {
      sceneContainer.current.position.x =
        -scrollData.offset * SECTION_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.z = 0;
    } else {
      sceneContainer.current.position.z =
        -scrollData.offset * SECTION_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.x = 0;
    }

    setSection(config.sections[Math.round(scrollData.offset * (scrollData.pages-1))])
  })

  useEffect(() => {
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(
        window.location.hash.replace("#", "")
      );
      if (sectionIndex !== -1) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) *
          (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        );
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return (
    <>
      <Environment preset="sunset"  />
      <Sky sunPosition={[0, 10, 0]}/>
      <Avatar position-z={isMobile ? -5 : 0} />
      {/* Shadows and floor*/}

      <ContactShadows opacity={0.5} scale={[30,30]} color="#9c8e66"/>
      <mesh position-y={-0.005} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        
                <meshBasicMaterial color="#fff" />

      </mesh>

        <motion.group ref={sceneContainer} animate={section} >
          {/* home */}
          <motion.group
          position-y={-5}
          variants={{
            home:{
              y:0,

            }
          }}
          >
          
          <Float floatIntensity={2} speed={2}>
            <MacBookPro
              position-x={isMobile ? -0.5 : -1.5}
              position-y={isMobile ? 1 : 0.5}
              position-z={isMobile ? -2 : 0}
              scale={0.3}
              rotation-y={Math.PI / 4}
            />
          </Float>
          <Easel
            scale={0.40}
            rotation-y={THREE.MathUtils.degToRad(0)}
            position={isMobile ? [2, 1, -4] : [scaleFactor * 4, 1.3, -2]}
          />
          
            
          
          
            <Center  disableY disableZ>
              <SectionTitle
                size={0.8}
                position-y={1.6}
              position-z={isMobile ? -6  : -3}
                bevelEnabled
                bevelThickness={0.3}
              >
                {config.home.title}
              </SectionTitle>
            </Center>
            <Heart position-z={isMobile ? -6 : -2.5} position-x={1.8} position-y={2.7} scale={0.1} />

          
          <Center disableY disableZ>
            <SectionTitle
              size={1.2}
              position-x={-2.6}
              position-z={isMobile ? -6 : -3}
              bevelEnabled
              bevelThickness={0.3}
              rotation-y={Math.PI / 10}
            >
              {config.home.subtitle}
            </SectionTitle>
          </Center>
          </motion.group>
          <motion.group 
          position-x={isMobile ? SECTION_DISTANCE : 0}
          position-z={isMobile ? -4 : SECTION_DISTANCE}
          
          
           position-y={-5} variants={
            {
              skills:{
                y:0
              }

            }
          }>
          <group position-x={isMobile ? 0 : -2}>
            <SectionTitle position-z={1.5} rotation-y={Math.PI / 6}>
              SKILLS
            </SectionTitle>
            <BookCase position-z={-2} />
            <CouchLarge
              scale={0.4}
              position-z={0}
              position-x={-0.2}
              position-y={0.5}

              rotation-y={Math.PI / 3}
            />
            <Lamp
              position-z={0.6}
              position-x={-0.4}
              position-y={-0.8}
              rotation-y={-Math.PI}
            />
          </group>
          <Particles />
          </motion.group>
          {/* projects */}
        <motion.group 
          position-x={isMobile ? 2 * SECTION_DISTANCE : 0}
          position-z={isMobile ? -3 : 2 * SECTION_DISTANCE}
        position-y={-5}
        variants={{
          projects:{
            y:0
          }
        }}
        >
          <group position-x={isMobile ? -0.25 : 1}>
            <SectionTitle
              position-x={-0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
            >
              PROJECTS
            </SectionTitle>

            <group
              position-x={0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
              scale={0.8}
            >
            <MonitorScreen 
            rotation-x={-0.18}
            position-z={-0.895}
            position-y={1.74}

            />
              <Monitor
                scale={0.02}
                position-y={1}
                rotation-y={-Math.PI / 2}
                position-z={-1}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color="white" />
              </RoundedBox>
            </group>
          </group>
        </motion.group>
          {/* contact */}
        <motion.group 
        position-y={-5} 
          position-x={isMobile ? 3 * SECTION_DISTANCE : 0}
          position-z={isMobile ? -4 : 3 * SECTION_DISTANCE}
        variants={{
          contact:{
            y:0
          }
        }}
        >
          <SectionTitle 
            position-x={isMobile ? -1.1 : -2 * scaleFactor}
          position-z={0.6}>
            CONTACT
          </SectionTitle>
          <group position-x={-2 * scaleFactor}>
 
            <PhoneBooth

              scale={0.45}
              position-x={-0.5}
              position-z={isMobile ? -2.52 : -1.5}
              position-y={-0.3}
              rotation-y={-Math.PI / 4}
            />
           
          </group>

          <Mailbox
            scale={0.25}
            rotation-y={1.25 * Math.PI}
            position-x={1}
            position-y={0.25}
            position-z={0.5}
            onClick={handleMailboxClick} 
          />

          
           <Float floatIntensity={1.5} speed={3}>
              <Pigeon
                scale={0.25}
                position-x={ 1.4}
              position-y={1.5}
              />
          </Float>
        </motion.group>
      </motion.group> 
    </>
  );
};
 