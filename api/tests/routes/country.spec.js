/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const request = require('supertest');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('POST /recipes', () => {
    it('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
      const res = await request(app).post('/recipes');
      expect(res.status).to.equal(404);
      expect(res.text).to.have.string(JSON.stringify({error: {}}));
    });

    it('should return status 201 and recipe object if the recipe was succesfully created', async () => {
      const res = await request(app)
                          .post('/recipes')
                          .send({"name": "smoked chicken with potatoes", "dishSummary": "To prepare a smoked chicken we need...",
                          "diets": []});
      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal({
        success: 'La receta fue creada con exito!'
      })
    });
  })
});
