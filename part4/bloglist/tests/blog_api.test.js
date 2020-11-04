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
test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'Prueba middleware',
		author: 'saritdsaa',
		url: 'ñsaddsadapq.com',
		likes: 10
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	const titles = blogsAtEnd.map(n => n.title)
	const authors = blogsAtEnd.map(n => n.author)
	const urls = blogsAtEnd.map(n => n.url)
	const likes = blogsAtEnd.map(n => n.likes)

	expect(titles).toContain(
		'Prueba middleware'
	)
	expect(authors).toContain(
		'saritdsaa'
	)
	expect(urls).toContain(
		'ñsaddsadapq.com'
	)
	expect(likes).toContain(
		10
	)
})

test('if likes property is missing from the request, it will default to the value 0', async () => {
	const newBlog = {
		title: 'Prueba likes',
		author: 'saritdsaa',
		url: 'ñsaddsadapq.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	const blog_no_likes = blogsAtEnd.find(n => n.title === 'Prueba likes')
	expect(blog_no_likes.likes).toBe(0)
})

test(' if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
	const newBlogNoTitle = {
		author: 'saritdsaa',
		url: 'ñsaddsadapq.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlogNoTitle)
		.expect(400)

	const newBlogNoUrl = {
		title: 'Prueba likes',
		author: 'saritdsaa'
	}

	await api
		.post('/api/blogs')
		.send(newBlogNoUrl)
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})