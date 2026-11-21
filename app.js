import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

const app = express();
const port = 3002;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

async function handle_submission(req, res) {
    try {
        const submission = req.body;

        const sql = `INSERT INTO messages(first_name, last_name, job_title, company, linkedin, email, source, source_other, message, mailing_list, email_format)`;
        const params = 
        await pool.execute();
    } catch (err) {
        res.status(500).send("<h1>Sorry, your submission couldn't be saved.</h1><p>Please try again later.</p>");
    }
}

async function render_admin(req, res) {
    try {

    } catch (err) {
        res.status(500).send("<h1>Sorry, this page can't be displayed right now.</h1><p>Please try again later.</p>");
    }
}

app.get('/', (req, res) => {res.render('index')});
app.get('/admin', render_admin);
app.post('/submit', handle_submission);
app.listen(port, () => {console.log("Server is running")});