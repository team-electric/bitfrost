import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Marker from './Marker.jsx';
import BasicMap from './BasicMap.jsx';

class AllRidesMap extends Component {

  static propTypes = {
    onRideSelect: PropTypes.func
  };

  state = {
    rides: [],
    defaultCenter: [34.0522, -118.2437],
    position: [45.5221418, -122.67768079999999]
  };

  apiIsLoaded = (map, maps, rides) => {
  //   // Get bounds by our rides
  //   const bounds = this.getMapBounds(map, maps, rides);
  //   // Fit map to bounds
  //   map.fitBounds(bounds);
  //   // Bind the resize listener
  //   this.bindResizeListener(map, maps, bounds);
  };

  getMapBounds = (map, maps, rides) => {
    const bounds = new maps.LatLngBounds();

    rides.forEach(place => {
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
  }


  render() {
    const { defaultCenter, position } = this.state;
    const { rides } = this.props;
    return (
      <Fragment>

        <BasicMap
          defaultZoom={10}
          center={position}
          // defaultCenter={defaultCenter}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, rides)}
        >
          {!!rides && rides.map(ride => (
            <Marker
              onClick={this.props.onRideSelect}
              key={ride.id}
              seats={ride.seats}
              ride={ride.id}
              text={ride.id}
              lat={ride.destination[0]}
              lng={ride.destination[1]}
            />
          ))}
        </BasicMap>
      </Fragment>
    );
  }
}

export default AllRidesMap;
