const { age, date, graduation } = require('../../lib/utils')
const Intl = require('intl')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(function(students){
            return res.render("students/index", {students})
        })
    },
    create(req, res) {
        return res.render ('students/create')
    },
    post(req, res) {    
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }
    
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        }) 
    },
    show(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Professor não encontrado!")

            student.birth_date = date(student.birth_date).birthDay
            // student.subjects_taught = student.subjects_taught.split(",")
            // student.created_at = date(student.created_at).format
            // student.education_level = graduation(student.education_level)

            return res.render('students/show', {student})
        })
    },
    edit(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Professor não encontrado!")

            student.birth_date = date(student.birth_date).iso
            console.log(student)
            console.log(student)

            return res.render('students/edit', {student})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    }
}