import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to ensure it loads properly with Next.js
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const MapPage: React.FC = () => {
    return (
        <div>
            <h1>Map Centered on Seville</h1>
            <Map/>
        </div>
    );
};

export default MapPage;