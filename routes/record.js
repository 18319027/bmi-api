const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const bmi = require('../modules/bmi')

// TODO: Sesuaikan konfigurasi database
const connection = mysql.createConnection({
    host: 'public_ip_sql_instance_Anda',
    user: 'root',
    database: 'nama_database_Anda',
    password: 'password_sql_Anda'
})

router.get("/record/:username", (req, res) => {
    const username = req.params.username

    if (!username) {
        return res.status(400).send({message: "Parameter missing"})
    }

    const query = "SELECT * FROM records WHERE username = ?"
    connection.query(query, [username], (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.json(rows)
        }
    })
})

router.post("/record/:username", (req, res) => {
    const username = req.params.username
    const weight = req.body.weight
    const height = req.body.height

    if (!username || !weight || !height || isNaN(weight) || isNaN(height)) {
        return res.status(400).send({message: "Invalid parameter or parameter missing"})
    }

    let bmiIndex = bmi.getIndex
    let bmiCategory = bmi.getDescription

    const query = "INSERT INTO records (username, weight, height, bmiIndex, bmiCategory) values (?, ?, ?, ?, ?)"

    connection.query(query, [username, weight, height, bmiIndex, bmiCategory], (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            //res.send({message: "Insert Successful"})
            res.json(rows)
        }
    })
})

router.put("/record/:username", (req, res) => {
    const username = req.params.username
    const weight = req.body.weight
    const height = req.body.height

    if (!username || !weight || !height || isNaN(weight) || isNaN(height)) {
        return res.status(400).send({message: "Invalid parameter or parameter missing"})
    }

    let bmiIndex = bmi.getIndex(weight, height)
    let bmiCategory = bmi.getCategory(bmiIndex)

    const query = "UPDATE records SET weight = ?, height = ?, bmiIndex = ?, bmiCategory = ? WHERE username = ?"
    
    connection.query(query, [weight, height, bmiIndex, bmiCategory, username], (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            //res.send({message: "Update Successful"})
            res.json(rows)
        }
    })
})

module.exports = router