/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const http = require('http')
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

// const blogSchema = new mongoose.Schema({
// 	title: String,
// 	author: String,
// 	url: String,
// 	likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const blog = new Blog({
// 	title: 'HTML is Easy',
// 	author: 'me',
// 	url: 'sracle.com',
// 	likes: 5
// })

// blog.save().then(result => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })

app.use(cors())
app.use(express.json())

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

let blogs = [
	{
		title: 'Hola',
		author: 'Sara',
		url: 'sracela.com',
		likes: 5
	},
	{
		title: 'Mundo',
		author: 'Cela',
		url: 'sracela.com',
		likes: 2
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (request, response) => {
	response.json(blogs)
})

const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})