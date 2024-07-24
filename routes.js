import express from "express";
const Router = express.Router();

import { postSignUp, postSignIn, signIn, signUp, dashboard, logout } from "../controllers/controller.js";
import { signUpDataValidate, signInDataValidate, isAuthenticate } from '../middlewares/middleware.js';

// Define the routes
Router.get('/signup', signUp); // Change route from '/signUp' to '/signup'
Router.get('/signin', signIn); // Change route from '/signIn' to '/signin'

Router.post('/signin', signInDataValidate, postSignIn);
Router.post('/signup', signUpDataValidate, postSignUp);

Router.get('/', signUp); // Redirect root URL to the signup page

Router.get('/dashboard', isAuthenticate, dashboard);
Router.get('/logout', logout);

// For non-existent routes, send a 404 status code with a message
Router.get('*', (req, res) => {
    res.status(404).send('Page not found. Please use /signup or /signin to access signup or signin pages.');
});

export default Router;
