import './Map.scss'
import {FC, useState} from 'react';
import {MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

L.Icon.Default.mergeOptions( {
  iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
  iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
  shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' )
} );

type MapProps = {
  getMapLocation?: ( latitude: number, longitude: number ) => void
  latitude: number
  longitude: number
  fixedMarker: boolean
}

const Map: FC<MapProps> = ( {getMapLocation, latitude, longitude, fixedMarker} ) => {
  const center = {
    lat: latitude === 0 ? 35.7165 : latitude,
    lng: longitude === 0 ? 51.4015 : longitude,
  }

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>( [latitude, longitude] );

  const Markers = () => {
    useMapEvents( {
      click ( e: {latlng: {lat: number; lng: number;};} ) {
        if ( getMapLocation ) {
          getMapLocation( e.latlng.lat, e.latlng.lng )
          setSelectedPosition( [
            e.latlng.lat,
            e.latlng.lng
          ] );
        }
      },
    } )

    return (
      fixedMarker ?
        <Marker position={{lat: latitude, lng: longitude}} />
        :
        <Marker position={selectedPosition} />
    )

  }


  return (
    <div className="map-wrapper">
      <MapContainer
        className="map-container"
        center={center}
        zoom={16}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />
        <Markers />
      </MapContainer>
    </div>
  )
}

export default Map