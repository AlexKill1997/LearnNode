const fs = require('fs')
const path = require('path')
const uuid = require('uuid').v4

class Course {
    constructor(title, price, image) {
        this.title = title
        this.price = price
        this.image = image
        this.id = uuid()
    }
    toJson() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        }


    }
    static async update(course) {
        const courses = await Course.getAll()
        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'course.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })


    }
    async save() {
        const course = await Course.getAll()
        course.push(this.toJson())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'course.json'),
                JSON.stringify(course),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

    }
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'course.json'),
                'utf-8',
                (error, content) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(JSON.parse(content))
                    }



                }
            )
        })

    }
    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }
}

module.exports = Course
    // const { Shema, model } = require('mongoose')
    // const course = new Shema({
    //     title: {
    //         type: String,
    //         require: true
    //     },
    //     price: {
    //         type: Number,
    //         require: true
    //     },
    //     img: String

// })
// module.exports = model('Course', course)