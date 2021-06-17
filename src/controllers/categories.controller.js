const { Category } = require( '../models' )
 
const createCategory = async( req, res) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });
    
    if ( categoryDB ){
        const msg = {
            msg: `La Categoría ${ categoryDB.name }, ya existe`
        }
        return res.status( 400 ).json(msg)
    }
    const data = {
        name,
        user: req.user._id
    }
    const category = await new Category( data );
    //guardar 
    await category.save();
    res.status(201).json({
        category
    })  
}

module.exports = {
    createCategory
}