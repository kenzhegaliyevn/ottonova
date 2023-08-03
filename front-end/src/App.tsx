import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { City } from './type';
import { formatNumber } from './utils';

const customIcon = new Icon({
  iconUrl: require('./icons/placeholder.png'),
  iconSize: [38, 38],
});

export default function App() {
  const [data, setData] = useState<City[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4200/api/data').then((res) => {
      setData(res.data.cities);
    });
  }, []);

  return (
    <MapContainer center={[48.137154, 11.576124]} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {data.map((marker, idx) => (
        <Marker
          key={idx}
          position={[+marker.latitude, +marker.longitude]}
          icon={customIcon}
        >
          <Popup className='popup'>
            <p>
              <b>Name:</b> {marker.name}
            </p>
            <p>
              <b>Native name:</b> {marker.name_native}
            </p>
            <p>
              <b>Country:</b> {marker.country}
            </p>
            <p>
              <b>Continent:</b> {marker.continent}
            </p>
            <p>
              <b>Population:</b> {formatNumber(+marker.population)}
            </p>
            <p>
              <b>Founded:</b> {marker.founded}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
