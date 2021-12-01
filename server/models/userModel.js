const mongoose = require( 'mongoose' );


const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true,'Your  First Name is quired'],
        minlength : [3, 'Minimum length is 3 characters' ],
        maxlength : [20, 'Maximum length is 20 characters' ]
    },
    lastName : {
        type : String,
        required : [true,'Your  Last Name is quired'],
        minlength : [3, 'Minimum length is 3 characters' ],
        maxlength : [20, 'Maximum length is 20 characters' ]
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    birthday : {
        type : Date,
        required : true
    }
});

const User = mongoose.model( 'users', UserSchema );

const UserModel = {
    createUser : function( newUser ){
        return User.create( newUser );
    },
    getUsers : function(){
        return User.find();
    },
    getUserById : function( email ){
        return User.findOne({ email });
    }
};

module.exports = {UserModel};