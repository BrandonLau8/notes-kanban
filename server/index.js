const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()

app.use(cors());
app.use(express.json());

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
    connectionLimit: 100,
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

const port = process.env.PORT


db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log('DB connected succesfully:' + connection.threadId)
})

app.post('/create', (req, res) => {
    
    const input = req.body.input;
    const content = req.body.content;
    
    db.query(
        `INSERT INTO kanban (input, content) VALUES (?,?)`,
        [input, content],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send('Values Inserted')
            }
        }
    );
    console.log(req.body);
});

app.get('/boxes', (req, res) => {
    db.query('SELECT * FROM kanban', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    console.log(req.body)
    const content = req.body.content;
    const input = req.body.input;
        db.query(
        'UPDATE kanban SET content = ? WHERE input = ?',
        [content, input],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/delete/:input', (req, res) => {
    const input = req.params.input;
    console.log(req.params)
    db.query(
        'DELETE FROM kanban WHERE input = ?', 
        input, 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.listen(port, () => console.log(`Server Started on port ${port}...` ))