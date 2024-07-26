import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { getAllStations } from '@/services/station.service';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ map, stations, setSelectedPlace, selectedStationId, setSelectedStationId }) => {
    return (
        <>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {stations.map((station) => (
                <Marker
                    key={station._id}
                    position={station.location}
                    icon={L.divIcon({
                        className: `${selectedStationId === station._id ? 'selected animate' : ''}`,
                        html: `<div class="w-8 h-8 border-[3px] ${selectedStationId === station._id ? 'border-blue-600' : 'border-white'} rounded-full overflow-hidden">
                                 <img src="${station.images[0]}" class="w-full h-full object-cover" />
                               </div>`
                    })}
                    eventHandlers={{
                        click: () => {
                            setSelectedPlace(station);
                            setSelectedStationId(station._id);
                        }
                    }}
                >
                    <Tooltip>{station.name}</Tooltip>
                </Marker>
            ))}
        </>
    );
}

const MapWrapper = ({ setSelectedPlace, leftWidth }) => {
    const [stations, setStations] = useState([]);
    const [selectedStationId, setSelectedStationId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [map, setMap] = useState(null);

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
        if (searchTerm) {
            const filtered = stations.filter(station =>
                station.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, stations]);

    const handleSuggestionClick = (station) => {
        setSelectedPlace(station);
        setSelectedStationId(station._id);
        setSearchTerm(""); // Clear the search input
        setSuggestions([]); // Clear suggestions after selection
        if (map) {
            map.flyTo(station.location, 13); // Fly to the station's location with a zoom level of 13
        }
    };

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                <input
                    type="text"
                    placeholder="Buscar estación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='px-5 py-2 outline-none shadow-xl border-none rounded-full'
                />
                {suggestions.length > 0 && (
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, backgroundColor: 'white', border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', position: 'absolute', width: '100%' }}>
                        {suggestions.map(suggestion => (
                            <li
                                key={suggestion._id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{ padding: '5px', cursor: 'pointer' }}
                            >
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <MapContainer center={[13.794185, -88.896529]} zoom={8.5} style={{ height: "100%", width: "100%", zIndex: 2 }} whenCreated={setMap}>
                <MapComponent
                    map={map}
                    stations={stations}
                    setSelectedPlace={setSelectedPlace}
                    selectedStationId={selectedStationId}
                    setSelectedStationId={setSelectedStationId}
                />
            </MapContainer>
        </div>
    );
}

export default MapWrapper;
