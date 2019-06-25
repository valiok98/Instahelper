const express = require('express');
const service = require('./src/api/service.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/src`));

app.set('views', '.') // specify the views directory
app.set('view engine', 'pug') // register the template engine

app.get('/', (req, res) => {
    res.render('index', { title: 'Instahelper' });
});

app.get('/js/api/get_user_id/:inputHandle', (req, res) => {
    service.get_user_id(req.params.inputHandle)
        .then(response => res.send(response))
        .catch(err => console.error(err));
});

app.get('/js/api/get_followers', (req, res) => {
    service.get_followers()
        .then(response => res.send(response))
        .catch(err => console.error(err));
});

app.get('/js/api/get_following', (req, res) => {
    service.get_following()
        .then(response => res.send(response))
        .catch(err => console.error(err));
});

app.get('/js/api/get_hashtags', (req, res) => {
    service.get_hashtags()
        .then(response => res.send(response))
        .catch(err => console.error(err));
});

app.listen(PORT, () => console.log('Finally running on a server !'));