import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function InstrumentationDetail({ instrument, onBack }) {
    const [selectedImage, setSelectedImage] = useState(instrument.images[0]);
    const canvasRef = useRef();
    const rendererRef = useRef();

    useEffect(() => {
        if (selectedImage.endsWith('.gltf')) {
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
            rendererRef.current = renderer;
            canvasRef.current.innerHTML = '';
            canvasRef.current.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            scene.add(ambientLight);

            const loader = new GLTFLoader();
            loader.load(selectedImage, function (gltf) {
                scene.add(gltf.scene);
                gltf.scene.scale.set(0.5, 0.5, 0.5);
                gltf.scene.position.y = -0.5;

                animate();
            });

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.screenSpacePanning = false;
            controls.maxPolarAngle = Math.PI;
            controls.minPolarAngle = 0;
            camera.position.set(0, 1, 2);
            controls.update();

            const handleResize = () => {
                camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
            };

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
        }
    }, [selectedImage]);

    return (
        <div className="p-4 flex flex-col gap-8">
            <button onClick={onBack} className="mb-4 flex items-center text-black bg-gray-200 px-4 py-2 rounded-full w-max">
                <FaChevronLeft className="mr-2" />
                Volver
            </button>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center relative">
                    {selectedImage.endsWith('.gltf') ? (
                        <div ref={canvasRef} className="w-full mb-4 rounded-lg overflow-hidden" style={{ height: 'auto', aspectRatio: '16 / 9' }}>
                        </div>

                    ) : (
                        <img
                            src={selectedImage}
                            alt={instrument.name}
                            className="w-full h-auto max-h-80 object-cover mb-4 rounded-lg"
                        />
                    )}
                    <div className="flex flex-row items-center gap-2 overflow-x-auto">
                        {instrument.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${instrument.name} ${index}`}
                                className={`w-20 h-20 object-cover cursor-pointer rounded-lg ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                        <div
                            className="w-20 h-20 bg-gray-300 flex items-center justify-center cursor-pointer rounded-lg"
                            onClick={() => setSelectedImage('/3DElements/Vase_Clay.gltf')}
                        >
                            <span className="text-sm">3D View</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">{instrument.name}</h2>
                    <p className="text-gray-600 mb-2">{instrument.description}</p>
                    <p className="text-gray-600">Cantidad: {instrument.quantity}</p>
                </div>
            </div>
        </div>
    );
}
