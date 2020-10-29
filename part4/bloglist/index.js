
/* eslint-disable no-unused-vars */
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

// const logger = require('./utils/logger')

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})


app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})