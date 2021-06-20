const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require( '../models' )

const searchUsers = async ( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term );
    
    if( isMongoId ){
        const user = await User.findById( term );
        
        return res.status(200).json({
            results: ( user ) ? [ user ] : []
        })
    }   

    const regex = RegExp(term, 'i')

    const users = await User.find( {
        $or: [ { name: regex }, { email : regex } ],
        $and: [ { state: true } ],
    } )

    res.status(200).json({
        total: users.length,
        results: [users]
    })

};

const searchCategories = async ( term, res = response ) => {

    const isMongoId = ObjectId.isValid( term );
    
    if( isMongoId ){
        const category = await Category.findById( term );
        
        return res.status(200).json({
            results: ( category ) ? [ category ] : []
        })
    }  

    const regex = RegExp(term, 'i')

    const category = await Category.find( {
        $or: [ { name: regex } ],
        $and: [ { state: true } ],
    } )

    res.status(200).json({
        total: category.length,
        results: [category]
    })

}

const searchProducts = async ( term, res = response ) => {

    const isMongoId = ObjectId.isValid( term );
    
    if( isMongoId ){
        const product = await Product.findById( term ).populate( 'category', 'name' );
        
        return res.status(200).json({
            results: ( product ) ? [ product ] : []
        })
    }  

    const regex = RegExp(term, 'i')

    const product = await Product.find( {
        $or: [ { name: regex } ],
        $and: [ { state: true } ],
    } ).populate('category', 'name')

    res.status(200).json({
        total: product.length,
        results: [ product ]
    })

}


module.exports = {
    searchCategories,
    searchProducts,
    searchUsers
}