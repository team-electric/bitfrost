import React, { Component } from 'react';

import events from '../../../services/events';

export default class Events extends Component {

  state = {
    name: '',
    email: ''
  };


  render() {
    return (
      <form>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
        />
        <input
          type="email"
          name="email"
          placeholder="Full name"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// const Events = () => {
//   return (
//     <div>

//     </div>
//   );
// };

// export default Events;
