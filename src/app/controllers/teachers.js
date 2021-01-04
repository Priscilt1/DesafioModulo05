const { age, date, graduation } = require('../../lib/utils')
const Intl = require('intl')


module.exports = {
    index(req, res) {
        return res.render("teachers/index")
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
        let { avatar_url, name, birth, schooling, classes, services } = req.body
    
       return
    },
    show(req, res) {
        return
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