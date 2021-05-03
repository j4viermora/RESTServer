const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app  = express();
        this.port = process.env.PORT
        //midlewares

        this.middlewares();


        //routes app
        this.routes();
    }   

    middlewares(){

        this.app.use( cors() );

        //read and parse of body
        this.app.use( express.json() );

        this.app.use(  express.static( 'src/public' ) )
    }


    routes(){
        
        this.app.use( '/api/users', require( '../routes/users.routes' ) )

    }

    lister(){
        this.app.listen( this.port, ()=> {
            console.log( `Sever on port ${ this.port }`)
        } )
    }


}


module.exports = Server