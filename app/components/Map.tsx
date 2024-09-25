"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { nervionCoordinates } from "@/app/components/nervion-coordinates";

// Fix icon issues with leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {
    const [markerPosition, setMarkerPosition] = useState<L.LatLngExpression | null>(null);
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN; // Extract the token from the environment variable

    useEffect(() => {
        if (!apiToken) {
            console.error('API token is missing');
            return;
        }

        // Fetch data from the API
        const apiUrl = `https://api.eu-central-1.aws.tinybird.co/v0/pipes/all_incidences.json?page_size=100&token=${apiToken}`;
        axios.get(apiUrl)
            .then(response => {
                // Assuming the response contains an object with "data" array
                const data = response.data.data;
                if (data.length > 0) {
                    // Extract and parse the first object's incidence_coordinates
                    // const coordinates = JSON.parse(data[0].incidence_coordinates);
                    setMarkerPosition([data[0].latitude, data[0].longitude]); // Assuming the coordinates are in [lat, lon] format
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, [apiToken]);

    // Polygon coordinates delimiting the Seville town area
    const polygonCoords: L.LatLngExpression[] = nervionCoordinates;

    return (
        <MapContainer
            center={[37.38048238687146, -5.973369906729496]} // Center coordinate for Seville
            zoom={16}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerPosition && (
                <Marker position={markerPosition}>
                    <Popup>
                        Incidence Location
                    </Popup>
                </Marker>
            )}
            <Polygon
                positions={polygonCoords}
                pathOptions={{ color: 'red', weight: 2, dashArray: '4' }} // Red border with dashed lines
            />
        </MapContainer>
    );
};

export default Map;