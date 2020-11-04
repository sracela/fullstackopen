const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
	})

	const savedBlog = await blog.save()
	response.json(savedBlog.toJSON())
})

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
	// Blog
	// 	.find({})
	// 	.then(blogs => {
	// 		response.json(blogs)
	// 	})
})


module.exports = blogsRouter