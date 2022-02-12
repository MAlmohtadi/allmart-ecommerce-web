import { useEffect, useState } from 'react';
import {
    GoogleMap, Marker, withGoogleMap, withScriptjs,
} from 'react-google-maps';

const MapPicker = withScriptjs(withGoogleMap((props) => {
    const onClick = (mapProps, map, clickEvent) => {
        props.onChangeLocation(mapProps.latLng.lat(), mapProps.latLng.lng());
    };
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation
                .getCurrentPosition((position) => (
                    props.onChangeLocation(position.coords.latitude, position.coords.longitude)));
        }
    }, [navigator.geolocation]);

    return (
        <GoogleMap
            defaultZoom={18}
            center={props.location}
            defaultCenter={props.location}
            onClick={onClick}
        >
            {props.isMarkerShown && <Marker position={props.location} />}
        </GoogleMap>
    );
}));
export default MapPicker;
