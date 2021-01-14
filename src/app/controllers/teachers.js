const Intl = require('intl')
const Teacher = require('../models/Teacher')
const { age, date, graduation } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        let {filter, page, limit} = req.query

        // PAGINAÇÃO
        // a condicional page é igual a page ou 1. Considerando que pode haver paginacao ou nao 
        page = page || 1
        limit = limit || 2
        // A partir do limit para pular o numero exato de dados por paginação
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                
                const pagination = {
                    filter,
                    // o math para arrendar pra cima o total de pagina
                    total: Math.ceil(teachers[0].total / limit), 
                    page
                }

                // esta passando o filter depois do teachers para manter a filtragem
                return res.render("teachers/index", { teachers, filter, pagination })
            }
        }

        Teacher.paginate(params)

        
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

            teacher.age = age(teacher.birth_date)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.created_at = date(teacher.created_at).format
            teacher.education_level = graduation(teacher.education_level)

            return res.render('teachers/show', {teacher})
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("Professor não encontrado!")

            teacher.birth_date = date(teacher.birth_date).iso
            console.log(teacher)
            // teacher.education_level = graduation(teacher.education_level)
            console.log(teacher)

            return res.render('teachers/edit', {teacher})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }

        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function(){
            return res.redirect(`/teachers`)
        })
    }
}