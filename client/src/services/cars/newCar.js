const newUser = user => JSON.stringify({
  query:
    `mutation {
      createUser(
        name: "${user.name}"
        email: "${user.email}"
        phone: "${user.phone}"
        address: {
          zip: "${user.address.zip}"
        }
      )
      {
        _id
        name
        email
        phone
        address {
          street
          city
          state
          zip
        }
      }
    }`
});

export default newUser;
