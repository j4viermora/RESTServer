const { 
    searchCategories, 
    searchUsers, 
    searchProducts } = require("../services/searchEngine");

const collectionPermitted = [
    "users",
    "categories",
    "products",
    "role"
]

const search = ( req, res ) => {

    const { collection, term } = req.params;

    if( !collectionPermitted.includes( collection ) ){
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${collectionPermitted}`
        })
    }

    switch( collection ){

        case 'users':
            searchUsers( term, res )
        break;

        case 'categories':
            searchCategories( term, res )
        break

        case 'products':
            searchProducts( term, res )
        break

        default:
            res.status(500).json({
                msg: "La busqueda no está contemplada"
            })
    }
}

module.exports = {
    search
}