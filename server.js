const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Models
const Student = require('./models').Student;
const ABC_Entry = require('./models').ABC_Entry;
const Antecedent = require('./models').Antecedent;
const Behavior = require('./models').Behavior;
const Consequence = require('./models').Consequence;
const User = require('./models').User;

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

/*
User.create({
    username: 'Iaxx',
    password: 'abc123',
    first_name: 'Dan',
    last_name: 'Williams',
    display_name: 'Mr. Williams'
});

ABC_Entry.create({
    StudentId: 1,
    anticedent: [1,2],
    consequence: [2,3],
}).then(abc_entry => {
    abc_entry.createBehavior({
        description: 'Student forces hand down throat.'
    })
})

Student.findAll({
    include: [ABC_Entry]
}).then(students => {
    console.log(students[0].ABC_Entries);
});
*/

//Home Route
app.get('/', (req, res) => {
    Student.findAll({
        include: [ABC_Entry]
    }).then(students => {
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
        Student.findAll()
        .then( students => {
            res.render('edit_students', {
                title: 'Modify Students',
                students: students
            });  
        })
     
    });

    app.post('/add/student', (req, res) => {
        console.log('adding student');
        Student.create(req.body)
            .then(() => res.redirect('/edit/students'));
    });

// Student ABC_Entry
    app.get('/student/:student_id', (req, res) => {
        Student.findById(req.params.student_id, {
            include: [ABC_Entry]
        }).then(student => {
            let fullname = student.first_name + ' ' + student.last_name;
            console.log(student)
            res.render('student', {
                title: fullname,
                student: student,
                teacher: "Ms. Megan",
            });  
        });
    });

    app.post('/add/abc_entry/:student_id', (req, res) => {
        let student_id = req.params.student_id;
        ABC_Entry.create({...req.body, StudentId: student_id})
            .then(() => res.redirect('/student/' + student_id));
    });

    app.get('/delete/student/:student_id', (req, res) => {
        ABC_Entry.destroy({
            where: {StudentId: req.params.student_id}
        }).then(
            Student.destroy({
                where: {id: req.params.student_id}
            }).then(() => res.redirect('/edit/students'))
        );
    });

// Antecedents
    app.get('/edit/antecedents', (req, res) => {
        res.render('edit_antecedents', {
            title: 'Modify Antecedents',
        });  
    });

    app.post('/add/antecedent', (req, res) => {
        Antecedent.create(req.body)
            .then(() => res.redirect('/edit/antecedents'));
    });

// Behaviors
    app.get('/edit/behaviors', (req, res) => {
        res.render('edit_behaviors', {
            title:'ABC Data Form'
        });
    });

    app.post('/add/behavior', (req, res) => {
        Antecedent.create(req.body)
            .then(() => res.redirect('/edit/behavior'));
    });

// Consequences
    app.get('/edit/consequences', (req, res) => {
        res.render('edit_consequences', {
            title:'ABC Data Form'
        });
    });

    app.post('add/consequence', (req, res) => {
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