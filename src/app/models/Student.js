const db = require('../../config/db')
const { age, date, graduation } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function(err, results){
            if(err) throw `Erro no banco de dados!${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth_date,
                email,
                schoolyear,
                workload
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.email,
            data.schoolyear,
            data.workload
        ]
        
        db.query(query, values, function(err, results) {
            if(err) throw `Erro no banco de dados!${err}`
            callback(results.rows[0])
        })

    },
    find(id, callback) {
        db.query(`
            SELECT * 
            FROM students 
            WHERE id =$1`, [id], 
            function(err, results) {
                if(err) throw `Erro no banco de dados!${err}`
                callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                birth_date=($3),
                email=($4),
                schoolyear=($5),
                workload=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.email,
            data.schoolyear,
            data.workload,
            data.id
        ]

        db.query(query, values, function (err, results){
            if(err) throw `Erro no banco de dados!${err}`
            callback()

        })    
    },
    delete(id, callback) {
        db.query(` DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `Erro no banco de dados!${err}`
            return callback()
        })
    }
}
