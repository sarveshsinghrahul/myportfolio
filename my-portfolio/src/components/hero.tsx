"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

function RotatingBox(props: any) {
  const ref = useRef<any>();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.6;
    }
  });
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#ff7f50" />
    </mesh>
  );
}

export default function Hero() {
  const [entered, setEntered] = useState(false);

  return (
    <section className="h-screen w-screen bg-black">
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="splash"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="mb-6">Click below to enter my world</p>
            <button
              onClick={() => setEntered(true)}
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Enter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.div
            key="scene"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Canvas camera={{ position: [0, 1.6, 5], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1} />

              <Suspense fallback={<Loader />}>
                <RotatingBox position={[0, 0.8, 0]} />
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
