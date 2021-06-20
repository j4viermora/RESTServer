const Product = require("../models/product");



const createProduct = async ( req, res ) => {

    try {
        const name = req.body.name.toUpperCase();
        const productDB = await Product.findOne({ name });
        
        if ( productDB ){
            const msg = {
                msg: `El producto ${ productDB.name }, ya existe`
            }
            return res.status( 400 ).json( msg )
        }
    
        const data = {
            name,
            user: req.user._id,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price
        }
    
        const product = await new Product( data );
        //guardar 
        await product.save() ;
        res.status(201).json({
            product
        })  
    } catch (err) {
        console.log(err)

        res.status(500).json({
            msg: "Algo anda mal contacta con el administrado"
        })
    }
   

}

const getProducts = async ( req, res ) => {

    try {
        const { limit = 5, offset = 0 } = req.query;

        const query = { state: true };
    
        const productsQuery = Product.find( query )
                                .populate( 'category', 'name' )
                                .populate( 'user', 'name' )
                                .skip( Number( offset ) )
                                .limit( Number( limit ) )
        const totalQuery = Product.countDocuments( query )
    
        const [ products, total ] = await Promise.all([
            productsQuery,
            totalQuery
        ])
    
        res.status(200).json({
            total,
            products,
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Algo anda mal contacta al administrador'
        })
    }

   
    
}

const getProductById = async( req, res ) => {

    try{

        const { id } = req.params;

        const product = await Product.findById( id )
                                     .populate( 'category', 'name' )
                                     .populate( 'user', 'name' )

        res.status(200).json({
            ok: true,
            product
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Algo anda mal contacta con el administrador"
        })
    }

}

const updateProduct = async( req, res ) => {

    try{

        const { id } = req.params;

        const { state, user,  ...data } = req.body;

        data.name = data.name.toUpperCase()
        data.user = req.user._id

        const product = await Product.findByIdAndUpdate( id, data, { new: true } )

        res.status(200).json({
            product
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Algo anda mal contacta con el administrador"
        })
    }
}

const deleteProduct = async( req, res ) => {

    try{
        const { id } = req.params;
    
        const productDeleted = await Product.findByIdAndUpdate( id, { state: false }, { new : true } )
    
        res.status(200).json({
            ok:true,
            productDeleted
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: "Algo anda mal por favor contactar con el administrador"
        })
    }


}


module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}