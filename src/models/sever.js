const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');

class Server{

    constructor(){
        this.app  = express();
        this.port = process.env.PORT

        this.path = {
            auth: '/api/auth',
            categories: '/api/categories',
            user: '/api/users',
        }
        
        
        //dc connect
        this.database();
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
        
        this.app.use( this.path.user , require( '../routes/users.routes' ) );
        this.app.use( this.path.auth , require( '../routes/auth.routes' ) );
        this.app.use( this.path.categories, require('../routes/categories.routes') );

    }

    lister(){
        this.app.listen( this.port, ()=> {
            console.log( `Sever on port ${ this.port }`)
        } )
    }

    async database (){
        await dbConnection();
    }


}


module.exports = Server