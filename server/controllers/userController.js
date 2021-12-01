const {UserModel} = require( './../models/userModel' );
const bcrypt = require( 'bcrypt' );

const UserController = {
    loadLogin : function( request, response ){
        response.render( 'login' );
    },
    createUser : function( request, response ){
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const email = request.body.email;
        const password = request.body.password;
        const birthday = request.body.birthday;
    
        bcrypt.hash( password, 10 )
            .then( encryptedPassword => {
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    password : encryptedPassword,
                    birthday
                };
                console.log( newUser );
                UserModel
                    .createUser( newUser )
                    .then( result => {
                        request.session.firstName = result.firstName;
                        request.session.lastName = result.lastName;
                        request.session.email = result.email;
                        console.log('User was created');
                        response.redirect( '/users/landing' );
                    })
                    .catch( err => {
                        request.flash( 'registration', 'email is already in use or some inputs are in blank!' );
                        response.redirect( '/users/login' );
                    });
            });
    },
    loadLanding : function( request, response ){
        if( request.session.email === undefined ){
            response.redirect( '/users/login' );
        }
        else{
            UserModel
                .getUsers()
                .then( data => {
                    console.log( data );
                    let currentUser = {
                        firstName : request.session.firstName, 
                        lastName : request.session.lastName,
                        email : request.session.email
                    }
                    response.render( 'index', { users : data, currentUser } );
                }); 
        }
    }, 
    userLogin : function( request, response ){
        let email = request.body.loginEmail;
        let password = request.body.loginPassword;
    
        UserModel
            .getUserById( email )
            .then( result => {
                if( result === null ){
                    throw new Error( "That user doesn't exist!" );
                }
    
                bcrypt.compare( password, result.password )
                    .then( flag => {
                        if( !flag ){
                            throw new Error( "Wrong credentials!" );
                        }
                        request.session.firstName = result.firstName;
                        request.session.lastName = result.lastName;
                        request.session.email = result.email;
    
                        response.redirect( '/users/landing' );
                    })
                    .catch( error => {
                        request.flash( 'login', error.message );
                        response.redirect( '/users/login' );
                    }); 
            })
            .catch( error => {
                request.flash( 'login', error.message );
                response.redirect( '/users/login' );
            });
    },
    userLogout : function( request, response ){
        request.session.destroy();
        response.redirect( '/users/login' );
    }
}

module.exports = { UserController };