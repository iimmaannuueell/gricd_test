const supertest = require('supertest')
const app = require('../../src/app')


test('Returns 200 Ok when request hits base URL', async() => {
    await supertest(app).get('/v1/test').expect(200)
})