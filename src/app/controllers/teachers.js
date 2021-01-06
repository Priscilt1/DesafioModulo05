const Intl = require('intl')
const Teacher = require('../models/Teacher')
const { age, date, graduation } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        Teacher.all(function(teachers){
            return res.render("teachers/index", {teachers})
        })
    },
    create(req, res) {
        return res.render ('teachers/create')
    },
    post(req, res) {    
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }
    
        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        }) 
    },
    show(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("Professor não encontrado!")

            teacher.age = age(teacher.birth)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.created_at = date(teacher.created_at).format
            teacher.education_level = graduation(teacher.education_level)

            return res.render('teachers/show', {teacher})
        })

        
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }
        return
    },
    delete(req, res) {
        return
    }
}