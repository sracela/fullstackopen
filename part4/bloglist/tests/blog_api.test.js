const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()

	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()

	blogObject = new Blog(helper.initialBlogs[2])
	await blogObject.save()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('all blogs have unique identifier property named id,', async () => {
	const response = await api.get('/api/blogs')
	const ids = response.body.map(r => r.id)
	expect(ids[0]).toBeDefined()
	expect(ids[1]).toBeDefined()
	expect(ids[2]).toBeDefined()

})

afterAll(() => {
	mongoose.connection.close()
})