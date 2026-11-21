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

function handle_checkbox_field(f) {
    return f ? 1 : 0;
}

async function handle_submission(req, res) {
    try {
        const contact = req.body;

        contact.mailing_list = handle_checkbox_field(contact.mailing_list);
        if (contact.email_format == undefined) {
            contact.email_format = "";
        }

        console.log(contact);

        const sql = `INSERT INTO contacts(first_name, last_name, job_title, company, linkedin, email, source, source_other, message, mailing_list, email_format) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [contact.first_name, contact.last_name, contact.job_title, contact.company, contact.linkedin, contact.email, contact.source, contact.source_other, contact.message, contact.mailing_list, contact.email_format];
        await pool.execute(sql, params);
        res.render('confirmation', { contact })
    } catch (err) {
        res.status(500).send("<h1>Sorry, your information couldn't be saved.</h1><p>Please try again later.</p>");
        console.log(err);
    }
}

async function render_admin(req, res) {
    try {
        const [contacts] = await pool.execute("SELECT * FROM contacts");
        res.render('admin', {contacts} );
    } catch (err) {
        res.status(500).send("<h1>Sorry, this page can't be displayed right now.</h1><p>Please try again later.</p>");
    }
}

app.get('/', (req, res) => {res.render('index')});
app.get('/admin', render_admin);
app.post('/submit', handle_submission);
app.listen(port, () => {console.log("Server is running")});