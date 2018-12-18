const { User } = require("../../users/mongoose");
const { getErrors } = require("../../../testing/lib/errors");

describe("User Model", () => {
  it("returns a valid User Schema Model", () => {
    const data = {
      name: "joe",
      email: "joe@email.com",
      phone: "345-345-3456",
      address: {
        street: "123 Some St.",
        city: "Portland",
        state: "OR",
        zip: "97202"
      }
    };
    const user = new User(data);
    const jsonUser = user.toJSON();
    expect(jsonUser).toEqual({ ...data, _id: expect.any(Object) });
  });

  it("validates that fields are required", () => {
    const user = new User({});

    const errors = getErrors(user.validateSync(), 7);

    expect(errors.name.properties.message).toEqual("Name is required");
    expect(errors.email.properties.message).toEqual("Email is required");
    expect(errors.phone.properties.message).toEqual("Phone is required");
    expect(errors['address.city'].properties.message).toEqual("City is required");
    expect(errors['address.street'].properties.message).toEqual("Street is required");
    expect(errors['address.state'].properties.message).toEqual("State is required");
    expect(errors['address.zip'].properties.message).toEqual("ZIP code is required");

  });

});
