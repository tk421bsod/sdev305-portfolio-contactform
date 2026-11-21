import express from 'express';

const app = express();
const port = 3002;

app.use(express.static('public'));
app.get('/', (req, res) => {res.sendFile(`${import.meta.dirname}/index.html`)});
app.listen(port, () => {console.log("Server is running")});