const express = require( 'express' );
const UserRouter = express.Router();
const {UserController} = require( './../controllers/userController' );

UserRouter
    .route( '/login' )
    .get( UserController.loadLogin )
    .post( UserController.userLogin );

UserRouter
    .post( '/addUser', UserController.createUser );

UserRouter
    .get( '/landing',  UserController.loadLanding );

UserRouter
    .post( '/logout', UserController.userLogout );


module.exports = { UserRouter };