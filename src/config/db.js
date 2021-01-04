// o metodo Pool permite que acesse sem o login
const { Pool } = require('pg')

module.exports = new Pool({
    user:priscilaribeiro,
    password:"",
    host: localhost,
    port: 5432,
    database: "my_teacher"
})