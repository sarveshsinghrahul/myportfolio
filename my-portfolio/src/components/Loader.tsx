"use client";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <p className="text-xl font-bold">Loading...</p>
        <p className="mt-2">{progress.toFixed(0)} %</p>
      </div>
    </Html>
  );
}
