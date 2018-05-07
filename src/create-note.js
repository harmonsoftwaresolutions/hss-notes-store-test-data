const faker = require('faker');

module.exports = function createNote() {
    const note = {
      ID: faker.random.uuid(),
      Author: faker.name.firstName() + " " + faker.name.lastName(),
      Title: faker.lorem.words(),
      Text: faker.lorem.paragraph(),
    };
    return note;
};
