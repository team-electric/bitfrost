import React, { Component, Fragment } from 'react';

import Marker from './Marker.jsx';
import BasicMap from './BasicMap.jsx';
import AutoComplete from './AutoComplete.jsx';


class SearchMap extends Component {

  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    places: [],
    defaultCenter: [34.0522, -118.2437],
    position: []
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState({ places: [place] });
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
    const { places, mapApiLoaded, mapInstance, mapApi, defaultCenter, position } = this.state;
    return (
      <Fragment>
        {mapApiLoaded && (
          <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )}
        <BasicMap
          defaultZoom={10}
          center={position}
          defaultCenter={defaultCenter}
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {(!!places) &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />

            ))}
        </BasicMap>
      </Fragment>
    );
  }
}

export default SearchMap;
