//Adding dependancies
const express = require( 'express' );
const session = require( 'express-session' );
const flash = require( 'express-flash' );
const path = require( 'path' );
const {UserRouter} = require( './server/routes/userRouter' );


//Connecting database with the server
require( './server/config/database' );
require( 'dotenv' ).config();

//Initializing express app
const app = express();

//Setting locations of views
app.set( 'views', __dirname + '/client/views' );
app.set( 'view engine', 'ejs' );
//Setting location of static folder
app.use(express.static(path.join(__dirname, "/client/static")));
app.use(express.static(__dirname + "/client/static"));

//Setting dependancies  specs required
app.use( flash() );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use(session({
    //secret: process.env.SESSION_TOKEN,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 20 }
}));

//Setting which routers will be used
app.use( '/users', UserRouter );

//Setting the Port used to run the server
//app.listen( process.env.PORT, function(){
app.listen( 8800, function(){    
    console.log( "The users server is running in port 8800." );
});