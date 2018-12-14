import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 2em;
  input {
    height: 2em;
    width: 100vw;
  }
`;

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.autoComplete = new mapApi.places.Autocomplete(this.searchInput, {
      country: ['gb', 'us']
    });
    this.autoComplete.addListener('place_changed', this.onPlaceChanged);
    this.autoComplete.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlaceChanged = ({ map, addplace } = this.props) => {
    const place = this.autoComplete.getPlace();

    if(!place.geometry) return;

    if(place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    addplace(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {

    return (
      <StyledDiv>
        <input
          ref={ref => (this.searchInput = ref)}
          type='text'
          onFocus={this.clearSearchBox}
          placeholder='Enter a location'
        />
      </StyledDiv>
    );
  }
}

export default AutoComplete;



// emergency code:
// state = {
//   placesLoaded: false
// };

// loadPlaces = () => {
//   this.autoComplete = new this.props.mapApi.places.Autocomplete(this.searchInput, {
//     country: ['gb', 'us']
//   });
//   this.autoComplete.addListener('place_changed', this.onPlaceChanged);
//   this.autoComplete.bindTo('bounds', this.props.map);
//   this.setState({ placesLoaded: true });
// };
// componentDidMount({ map, mapApi } = this.props) {
//   if(mapApi.places && !this.state.placesLoaded) this.loadPlaces();
// }
// componentDidUpdate(previousProps) {
//   if(previousProps !== this.props) {
//     if(!this.state.placesLoaded && this.props.mapApi.places) {
//       this.loadPlaces();
//     }
//   }
// }
