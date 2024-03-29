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

const allowedOrigins = ['http://localhost:5173', "https://hitchhikers-guide-to-computing-plans.vercel.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
}
app.use(cors(corsOptions))

// connect to mongodb
mongoose.connect(mongoURI).then(() => {
  console.log('db connected')

})

app.get('/', (req, res) => {
  res.send({
    title: 'hello world',
  })
})


app.get('/courses', async (req, res) => {
  try {
    const groups = req.query
    const resCourses = {}
    for (const [key, group] of Object.entries(groups)) {
      const groupCourses = await Courses.find({ code: { $regex: group } })
      groupCourses.forEach(course => {
        resCourses[course.code] = {
          code: course.code,
          title: course.title,
          units: course.units,
          description: course.description,
          hours: course.hours,
          prerequisites: course.prerequisites,
          corequisites: course.corequisites,
          exclusions: course.exclusions,
          oneWayExclusions: course.oneWayExclusions,

        }
      })
    }

    console.log("api invoked")
    res.send(resCourses)

  }
  catch (error) {
  }
})



const data = JSON.parse(fs.readFileSync('./constants/requirements.json', 'utf-8'))
// const data = JSON.parse(fs.readFileSync('./dist/constants/courses.json', 'utf-8'))

// import data to MongoDB
const importData = async () => {
  try {
    console.log("trying to import data")
    for (const [key, value] of Object.entries(data)) {
      const course = new Courses({
        code: value.code,
        title: value.title,
        units: value.units,
        description: value.description,
        hours: value.hours,
        prerequisites: value.prerequisites,
        corequisites: value.corequisites,
        exclusions: value.exclusions,
        oneWayExclusions: value.one_way_exclusions,
      })
      await course.save()
    }

    console.log('data successfully imported')
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}

// importData()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))