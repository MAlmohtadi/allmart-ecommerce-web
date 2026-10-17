import { useEffect } from 'react';
import {
    GoogleMap, Marker, withGoogleMap, withScriptjs,
} from 'react-google-maps';

const MapPicker = withScriptjs(withGoogleMap((props) => {
    // @ts-ignore
    const onClick = (mapProps) => {
        // @ts-ignore
        props.onChangeLocation(mapProps.latLng.lat(), mapProps.latLng.lng());
    };
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation
                .getCurrentPosition((position) => (
                    // @ts-ignore
                    props.onChangeLocation(position.coords.latitude, position.coords.longitude)));
        }
    }, [navigator.geolocation]);

    return (
        <GoogleMap
            defaultZoom={18}
            // @ts-ignore
            center={props.location}
            // @ts-ignore
            defaultCenter={props.location}
            onClick={onClick}
        >
            {// @ts-ignore
                props.isMarkerShown && <Marker position={props.location} />
            }
        </GoogleMap>
    );
}));
export default MapPicker;
