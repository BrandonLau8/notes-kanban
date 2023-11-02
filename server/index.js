const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'kanban',
});

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

app.listen(3001, () => {
    console.log('Server running on port 3001');
})