"use client"

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { getAllStations } from '@/services/station.service';

// Fix for default icon issue with React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ setSelectedPlace, leftWidth }) => {
    const map = useMap();
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const data = await getAllStations();
                setStations(data);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchStations();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            map.invalidateSize();
        };

        handleResize(); // Initial call to set correct size
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [map, leftWidth]);

    return (
        <div className='z-10'>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                className='z-10'
            />
            {stations.map((station) => (
                <Marker
                    key={station._id}
                    position={station.location}
                    icon={L.divIcon({
                        className: 'custom-marker',
                        html: `<div class="w-8 h-8 border-2 outline-none border-white rounded-full overflow-hidden">
                                 <img src="${station.images[0]}" class="w-full h-full object-cover" />
                               </div>`
                    })}
                    eventHandlers={{
                        click: () => {
                            setSelectedPlace(station);
                        }
                    }}
                />
            ))}
        </div>
    );
}

const MapWrapper = ({ setSelectedPlace, leftWidth }) => (
    <MapContainer className='z-10' center={[13.794185, -88.896529]} zoom={8.5} style={{ height: "100%", width: "100%" }}>
        <MapComponent setSelectedPlace={setSelectedPlace} leftWidth={leftWidth} />
    </MapContainer>
);

export default MapWrapper;
