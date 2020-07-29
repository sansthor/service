const express = require('express');
const app = express();
const cors = require('cors');
const ejs = require('ejs');

const { db } = require('./config');
const PORT = process.env.PORT || 5000;



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/user', require('./routes/User'))

// Routes
app.get('/', (req, res) => {
    res.render('pages/home');
});

if (db) {
    app.listen(PORT, () => {
        console.log(`Server runs on port ${PORT}`);
    });
}