import bodyParser from 'body-parser';
import express from 'express';
import Session from 'express-session';
import logger from 'morgan';
import passport from 'passport';
import {localStrategyConfig} from './controllers/passport';
import * as auth from './routes/auth-api';
import * as email from './routes/email-api';
import clientAssets from './routes/serve-assets';
import clientCore from './routes/serve-client-core';

localStrategyConfig(passport);
auth.authRoutes(passport);

// TODO Document/Comment server application
const app = express();
const port = process.env.PORT || 3000;

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Session({secret: 'raiwind-road', resave: false, saveUninitialized: false}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// router files can be found under src/routes
// using configured asset and core routers to serve angular front end application
app.use('/assets/*', clientAssets);
app.use('/auth', auth.router);
app.use('/email', email.router);
app.use('/', clientCore);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
