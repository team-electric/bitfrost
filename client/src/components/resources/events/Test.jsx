import React, { Component } from 'react';

import firebase from '../../../services/firebase';



const User = ({ user }) => {
  const { name, email } = user.data;

  return (
    <li>{name} {email}</li>
  );
};

export default class Events extends Component {

  state = {
    name: '',
    email: '',
    users: [],
    fetching: false,
  };

  // GETing data


  componentDidMount() {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userCollection = db.collection('users');
    this.unsubscribeCollection = userCollection.onSnapshot(this.onCollectionUpdate);
    this.setState({ fetching: true });
  }

  onCollectionUpdate = snapshot => {
    const users = snapshot.docs.map(userSnapshot => ({
      id: userSnapshot.id,
      data: userSnapshot.data()
    }));
    this.setState({
      users: users,
      fetching: false
    });
  };


  // POSTing data

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('users').add({
      name: this.state.name,
      email: this.state.email
    });
    this.setState({
      name: '',
      email: ''
    });
  };




  render() {
    const { name, email, users, fetching } = this.state;

    const userlist = users.map(user => (
      <User key={user.id} user={user}/>
    ));

    return (
      <>
        <div>
          {userlist}
        </div>
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </>
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
