import supertest from 'supertest'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import 'regenerator-runtime/runtime'
import helper from './test_helper.js'
import User from '../models/user.js'
import app from '../app.js'

const api = supertest(app)

describe('When there is initially one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.getUsers()

    const newUser = {
      username: 'gabriel',
      name: 'Gabriel Tester',
      password: 'testpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Creation fails if username is already taken', async () => {
    const usersAtStart = await helper.getUsers()

    const newUser = {
      username: 'root',
      name: 'Root Tester',
      password: 'testpassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})