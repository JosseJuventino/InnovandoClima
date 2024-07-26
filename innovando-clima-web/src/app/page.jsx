"use client";
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import PlaceInfo from '../components/PlaceInfo';

// Load the Map component dynamically to avoid issues with Next.js server-side rendering
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [leftWidth, setLeftWidth] = useState(50); // Initial width in percentage
  const [isResizing, setIsResizing] = useState(false); // State to manage dragging
  const resizerRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null); // State to store selected marker information

  const startResizing = (e) => {
    setIsResizing(true);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth >= 40 && newLeftWidth <= 55) {
      setLeftWidth(newLeftWidth);
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div
      className="flex h-screen"
      style={{ userSelect: isResizing ? 'none' : 'auto' }} // Disable text selection during dragging
    >
      <div className="flex-none" style={{ width: `${leftWidth}%` }}>
        <div className="h-full overflow-hidden z-10">
          <Map setSelectedPlace={setSelectedPlace} leftWidth={leftWidth} />
        </div>
      </div>
      <div
        ref={resizerRef}
        className="flex-none w-2 bg-gray-400 cursor-col-resize"
        onMouseDown={startResizing}
      ></div>
      <div className="flex-grow" style={{ width: `${100 - leftWidth}%` }}>
        <div className="h-full bg-white p-4 overflow-y-scroll">
          <PlaceInfo place={selectedPlace} />
        </div>
      </div>
    </div>
  );
}
