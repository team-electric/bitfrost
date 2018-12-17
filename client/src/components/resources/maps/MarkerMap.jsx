import React, { Component, Fragment } from 'react';

import Marker from './Marker.jsx';
import BasicMap from './BasicMap.jsx';

import placesJSON from './places.json';

class MarkerMap extends Component {

  state = {
    places: placesJSON.results,
    defaultCenter: [34.0522, -118.2437],
    position: [45.5221418, -122.67768079999999]
  };

  apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = this.getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    this.bindResizeListener(map, maps, bounds);
  };

  getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(
        place.geometry.location.lat,
        place.geometry.location.lng,
      ));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        this.setState({ position: [latitude, longitude] });
      });
    }
  }


  render() {
    const { places, defaultCenter, position } = this.state;
    return (
      <Fragment>

        <BasicMap
          defaultZoom={10}
          center={position}
          // defaultCenter={defaultCenter}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, places)}
        >
          {!!places && places.map(place => (
            <Marker
              key={place.id}
              text={place.name}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
            />
          ))}
        </BasicMap>
      </Fragment>
    );
  }
}

export default MarkerMap;
