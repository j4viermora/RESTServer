const User   = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );

const userPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt )    
    // save data base
    const userSave = await user.save();
    res.json({
        msg:"post",
        userSave,
    })
}

const userGet = async (req, res) => {   
    // const query = req.query   
    const { limit = 5 , offset = 5 } = req.query;

    const query = { state: true }
    //TODO hacer la validacion que lleguen numeros validos por las quieries
    const users =  User.find( query )
                            .skip(Number(offset))
                            .limit( Number(limit) )
    const total =  User.countDocuments( query );

    const [ respuser, resptotal ] = await Promise.all([ 
        users, 
        total
     ])

    res.json({
            msg:"get",
            respuser,
            resptotal
        })
} 

const userPut = async(req, res) => {
   
    const { id }= req.params;
    const { password, google, email ,...rest } = req.body;

    //TODO validar con base db

    if( password ){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( salt )  
    };

    const resp  = await User.findByIdAndUpdate( id, rest )

    res.json({
        msg:"put user",
        resp
    })
}




const userDelete = (req, res) => {
    res.json({
        msg:"delete"
    })
}

const userPatch = (req, res) => {
    res.json({
        msg:"patch"
    })
}

module.exports = {
    userGet,
    userPost,
    userDelete,
    userPut,
    userPatch

}