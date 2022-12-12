const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should work when its a valid id', () => {
        Recipe.create({ id: '6162e9b2-5487-4695-8106-5274443dceaa' });
      });
    });
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({dishSummary: "It's a wish of chicken"})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
    describe('dishSummary', () => {
      it('should throw an error if dishSummary is null', async () => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid dishSummary')))
          .catch(() => done());
      });
      it('should work when its a valid dishSummary', () => {
        Recipe.create({ dishSummary: 'To prepare a smoked chicken we need...' });
      });
    });
  });
});
