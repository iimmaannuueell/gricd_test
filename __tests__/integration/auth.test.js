const supertest = require('supertest')
const app = require('../../src/app')
const Joi = require('joi');

// jest.setTimeout(10000);

describe('Authentication', () => {
    describe('User registration', () => {

        it('should create new account on register', async() => {
            const postData = {
                firstName: 'John',
                lastName: 'doe',
                email: 'John@yopmail.com',
                password: 'password123',
            }
            const response = await supertest(app).post('/v1/auth/register')
            .send(postData)

            expect(201)
            expect(response.status).toBeTruthy()
        })

        it('should return error when input is missing', async() => {
            const postData = {
                firstName: 'John',
                lastName: 'doe',
                email: 'John@yopmail.com',
                password: 'password123',
            }
            const response = await supertest(app).post('/v1/auth/register')
            .send(postData)

            expect(response.status).toEqual(400)
        })
        
    })


    describe('Login', () => {
        it('should return 200 status code on login', async() => {
            const postData = {
                email: 'John@yopmail.com',
                password: 'password123',
            }
            const response = await supertest(app).post('/v1/auth/login')
            .send(postData)

            expect(200)
            expect(response.status).toBeTruthy()
        })

        it('should return error when input is missing', async() => {
            const postData = {
                password: 'password123',
            }
            const response = await supertest(app).post('/v1/auth/login')
            .send(postData)

            expect(response.status).toEqual(400)
        })
    })
})
