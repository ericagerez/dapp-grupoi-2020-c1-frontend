import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  leafletContainer: {
    width: "100%",
    height: "50vh"
  }
})


export default function MapExample({ center, points }) {
  const classes = useStyles()
  return (
    <LeafletMap
      center={center || [-34.705932, -58.277057]}
      zoom={25}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
      className={classes.leafletContainer}
    >
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {(points || [{
        latitude: -34.705932,
        longitude: -58.277057,
        description: "Universidad Nacional de Quilmes"
      }]).map(p => {
        return (
          <Marker position={[p.latitude, p.longitude]}>
            <Popup>
              {p.description}
            </Popup>
          </Marker>
        )
      })}
    </LeafletMap>
  );
}