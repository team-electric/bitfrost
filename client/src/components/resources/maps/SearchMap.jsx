import React, { Component, Fragment } from 'react';

import Marker from './Marker.jsx';
import BasicMap from './BasicMap.jsx';
import AutoComplete from './AutoComplete.jsx';

const MAP_CENTER_DEFAULT = [34.0522, -118.2437];

class SearchMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

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

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <Fragment>
        {mapApiLoaded && (
          <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )}
        <BasicMap
          defaultZoom={10}
          defaultCenter={MAP_CENTER_DEFAULT}
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
