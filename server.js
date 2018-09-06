const express = require('express');
const path = require('path');
const sequelize = require('sequelize');
const conn = new sequelize('abcdatatracker', 'isaacalger', 'I7410123', {
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

conn.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', (req, res) => {
    let entries = [
        {
            id: 1,
            student: 'Boston',
            teacher: 'Ms. Megan',
            time: '10:32 AM',
            date: '5/6/17', 
            behavior:[
                {
                    id: 1,
                    description: 'Student forces hand down throat',
                },
                {
                    id: 2,
                    description: 'Flops on ground',
                },
            ],

            antecedent:[1,2],
            consequence:[3,4],
            location: 'classroom cubby'          
        },
        {
            id: 2,
            student: 'Izo',
            teacher: 'Ms. Rylee',
            time: '10:32 AM',
            date: '5/6/17', 
            behavior:[
                {
                    id: 1,
                    description: 'Student bites arm',
                },
                {
                    id: 2,
                    description: 'Flops on ground',
                },
            ],

            antecedent:[1,2],
            consequence:[3,4],
            location: 'classroom cubby'          
        },
    ];

    res.render('index', {
        title:'ABC Data',
        entries: entries
    });
});

app.get('/abc_entry/add', (req, res) => {
    res.render('add_entry', {
        title:'ABC Data Form'
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Example app listening on port 3000! :)')
});