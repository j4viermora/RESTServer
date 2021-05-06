const User   = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );

const userPost = async (req, res) => {



    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //check email exist

    // const emailCheck = await User.findOne({ email });

    // if( emailCheck ){

    //     return res.status( 400 ).json({
    //         msg: "correo existente"
    //     })

    // }

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

const userGet = (req, res) => {
    
    const query = req.query
    
    res.json({
            msg:"get",
            query
        })
} 

const userPut = (req, res) => {

    const id = req.params.id;


    res.json({
        msg:"put",
        id
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