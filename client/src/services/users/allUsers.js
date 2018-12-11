const allUsers = JSON.stringify({
  query:
    `query {
      users{
        _id
        name
        email
        phone
      }
    }`
});

export default allUsers;
