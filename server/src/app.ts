import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'

import { Courses } from './models/courses.js'

import pickBy from 'lodash.pickby'


dotenv.config({ path: './config.env' })

const mongoURI = process.env.MONGODB_URL
console.log(mongoURI)

const app = express()

app.use(express.json())
app.use(cors())

// connect to mongodb
mongoose.connect(mongoURI).then(() => {
  console.log('db connected')

})

app.get('/', (req, res) => {
  res.send({
    title: 'hello world',
  })
})

// create a pathway for client to call and get courses
// client will include the query string in the url
// app.get('/courses', async (req, res) => {
//   try {

//     const groups = req.query

//     const rawData = "./constants/requirements.json"
//     const courses = JSON.parse(fs.readFileSync(rawData, 'utf-8'))

//     const resCourses = {}
//     for (const [key, group] of Object.entries(groups)) {
//       const filteredCourses = pickBy(courses, (value, key) => key.startsWith(group))
//       // add each course in filteredCourses to resCourses
//       for (const [key, value] of Object.entries(filteredCourses)) {
//         resCourses[key] = value
//       }
//     }
//     console.log(Object.keys(resCourses).length)
//     res.send(resCourses)
//   }
//   catch (error) {
//     res.send(error)
//   }
// })

app.get('/courses', async (req, res) => {
  try {
    const groups = req.query
    const resCourses = {}
    console.log(groups)
    for (const [key, group] of Object.entries(groups)) {
      const groupCourses = await Courses.find({ code: { $regex: group } })
      console.log(groupCourses)
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
    // for (const [key, group] of Object.entries(groups)) {
    //   const filteredCourses = await Courses.find({ code: { $regex: group } })
    //   console.log(filteredCourses)
    //   // for (const [key, value] of Object.entries(filteredCourses)) {
    //   //   resCourses[key] = value
    //   // }
    // }
    console.log(Object.keys(resCourses).length)
    res.send(resCourses)

  }
  catch (error) {
  }
})



// file path is relative to the root of the project

// to get current working directory
console.log(process.cwd())
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

    // await Courses.create(data)
    console.log('data successfully imported')
    // to exit the process
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}

// importData()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))