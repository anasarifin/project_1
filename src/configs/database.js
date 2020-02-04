const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_1'
})

db.connect(err => {
    if (err) throw err;
})

module.exports = db