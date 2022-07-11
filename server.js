const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use('/images', express.static(path.join(__dirname, '/public/images')))



app.use(session(sess));
app.use(routes);

// app.listen(PORT, () => console.log(`Now listening on ${PORT}`));


sequelize.sync({ force: false }).then(() => {
 app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
