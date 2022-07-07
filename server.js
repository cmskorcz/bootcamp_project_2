const path = require('path');
const express = require('express');
const sesion = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'ltdbhea',
    resave: false,
    saveUnitialized: true
}

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use('/images', express.static(path.join(__dirname, '/public/images')))




app.use(routes);

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));


//sequelize.sync({ force: false }).then(() => {
//  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
//});
