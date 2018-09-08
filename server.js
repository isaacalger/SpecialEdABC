const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Models
const Student = require('./models').Student;
const Antecedent = require('./models').Antecedent;
const Consequence = require('./models').Consequence;

//Init app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', (req, res) => {
    Student.findAll().then(students => {
      console.log(students);
      res.render('index', {
          title:'ABC Data Tracker',
          students: students
      });
    });
});

// Create Routes
app.get('/edit', (req, res) => {
    res.render('edit', {
        title: 'Create Record'
    });
});

// Students
    app.get('/edit/students', (req, res) => {
        res.render('edit_students', {
            title: 'Modify Students'
        });       
    });

    app.post('/student/add', (req, res) => {
        Student.create(req.body)
            .then(() => res.redirect('/edit/students'));
    });

// Antecedents
    app.get('/edit/antecedents', (req, res) => {
        res.render('edit_antecedents', {
            title: 'Modify Antecedents',
        });  
    });

    app.post('/antecedent/add', (req, res) => {
        Antecedent.create(req.body)
            .then(() => res.redirect('/edit/antecedents'));
    });

/* Behaviors
    app.get('/edit/behaviors', (req, res) => {
        res.render('edit_behaviors', {
            title:'ABC Data Form'
        });
    });

    app.post('/behavior/add', (req, res) => {
        Antecedent.create(req.body)
            .then(() => res.redirect('/edit/behavior'));
    });
*/

// Consequences
    app.get('/edit/consequences', (req, res) => {
        res.render('edit_consequences', {
            title:'ABC Data Form'
        });
    });

    app.post('/consequence/add', (req, res) => {
        Consequence.create(req.body)
            .then(() => res.redirect('/edit/consequences'));
    });

app.get('/student/:id', (req, res) => {
    Student.findById(req.params.id).then( student => {
      res.render('student', {
        title: student.first_name + ' ' + student.last_name
      });
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Example app listening on port 3000! :)')
});

//commented out
{


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
}