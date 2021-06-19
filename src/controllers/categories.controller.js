const { response } = require('express');
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

const getCategories = async( req, res )  => {

    const { limit = 5 , offset = 0 } = req.query;

    const query = { state: true }
    //TODO hacer la validacion que lleguen numeros validos por las quieries
    const categories =  Category.find( query )
                            .populate( 'user', 'name' )
                            .skip(Number(offset))
                            .limit( Number(limit) )
    const total =  Category.countDocuments( query );

    // const [ respCategory, resptotal ] = await Promise.all([ 
    //     categories, 
    //     total,
    //  ])
    const [ categoriesRes, totalRes ] = await Promise.all([ 
        categories, 
        total,
     ])

    res.json({
            msg:"get",
            categoriesRes,
            totalRes
        })
}


const getCategoryById = async ( req, res = response ) => {

    const { id } = req.params;
    const category = await Category.findById( id ).populate( 'user', 'name' );

    res.json({
        category
    })
 
}

const updateCategory = async ( req, res ) => {

    const { id } = req.params;

    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true } )

    res.json( category );

};

const deleteCategory = async ( req, res ) => {

    const { id } = req.params;

    const deleteCategory = await Category.findByIdAndUpdate( id, { state : false }, { new : true } )

    res.json( deleteCategory )

};
 
module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}