


const userGet = (req, res) => {
    
    const query = req.query
    
    
    res.json({
            msg:"get",
            query
        })
    } 


const userPost = (req, res) => {
    
    const body = req.body;



    res.json({
        msg:"post",
        body
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