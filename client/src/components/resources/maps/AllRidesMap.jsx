import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Marker from './Marker.jsx';
import BasicMap from './BasicMap.jsx';

import placesJSON from './places.json';


class AllRidesMap extends Component {

  static propTypes = {
    onRideSelect: PropTypes.func
  };

  state = {
    places: [],
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

    places.forEach(place => {
      bounds.extend(new maps.LatLng(
        place.destination[0],
        place.destination[1]
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

    console.log('JSON PLACES!!!', this.state.places);


  }


  render() {
    const { defaultCenter, position } = this.state;
    const { places } = this.props;
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
              onClick={this.props.onRideSelect}
              key={place.uid}
              seats={place.seats}
              lat={place.destination[0]}
              lng={place.destination[1]}
            />
          ))}
        </BasicMap>
      </Fragment>
    );
  }
}

export default AllRidesMap;
