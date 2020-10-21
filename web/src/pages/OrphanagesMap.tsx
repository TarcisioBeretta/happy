import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';
import api from '../services/api';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div className="" id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"></img>

                    <h2>Escolha um orfanato no mapa</h2>

                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São José do Rio Preto</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <div>
                <Map
                    center={[-20.8104728, -49.3734206]}
                    zoom={15}
                    style={{ width: '100%', height: '100%' }}
                >
                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {
                        orphanages.map(orphanage => {
                            return (

                                <Marker
                                    key={orphanage.id}
                                    icon={mapIcon}
                                    position={[orphanage.latitude, orphanage.longitude]}>

                                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                        {orphanage.name}
                                        <Link to={`/orphanages/${orphanage.id}`}>
                                            <FiArrowRight size={20} color="#FFF" />
                                        </Link>
                                    </Popup>
                                </Marker>

                            )
                        })
                    }
                </Map>
            </div>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap
