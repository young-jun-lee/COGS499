import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'

import { Courses } from './models/courses.js'

dotenv.config({ path: './config.env' })

const mongoURI = process.env.MONGODB_URL
console.log(mongoURI)

const app = express()

app.use(express.json())
app.use(cors())

// connect to mongodb
mongoose.connect(mongoURI).then(() => console.log('db connected'))

app.get('/', (req, res) => {
  res.send({
    title: 'hello world',
  })
})

// file path is relative to the root of the project

// to get current working directory
console.log(process.cwd())
const data = JSON.parse(fs.readFileSync('./dist/data/courses.json', 'utf-8'))


// import data to MongoDB
const importData = async () => {
  try {
    console.log("trying to import data")
    await Courses.create(data)
    console.log('data successfully imported')
    // to exit the process
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}

importData()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))