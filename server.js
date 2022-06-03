const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : 'localhost',
        port : 5432,
        user : 'postgres',
        password : '1234',
        database : 'smartbrain'
    }
});

db.select('*').from('users');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    db.select('*').from('users').then(data => {
        res.send(data);
    }) 
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, () => {
    console.log('app is running on port 3001');
})

/*
/ --> res = this is workin
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user 
/image --> PUT --> user
*/