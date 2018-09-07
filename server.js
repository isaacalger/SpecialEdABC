const express = require('express');
const path = require('path');
const Student = require('./models').Student;
//const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

//Init app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', (req, res) => {

    res.render('index', {
        title:'ABC Data',
        entries: entries
    });
});

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add Objects'
    })
})

app.get('/abc_entry/add', (req, res) => {
    res.render('add_entry', {
        title:'ABC Data Form'
    });
});

app.post('/student/add', (req, res) => {
    Student.create(req.body)
        .then(() => res.redirect('/add'));
});

/*
// Init Database Connection
let sequelize = new Sequelize('abcdatatracker', 'isaacalger', 'I7410123', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    },
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
*/

// Start Server
app.listen(3000, () => {
    console.log('Example app listening on port 3000! :)')
});