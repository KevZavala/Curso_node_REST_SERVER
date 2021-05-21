const Producto = require('../models/producto');

const postProducto = async (req, res) => {

    const {nombre,categoria,desc} = req.body;
    const precio = Number(req.body.precio) || 0;
    const costo =  Number(req.body.costo)  || 0;
    const stock =  Number(req.body.stock)  || 0;

    const usuario = req.usuario._id;

    const data = {nombre, categoria, desc, precio, costo, stock, usuario}

    const productoDB = new Producto(data);

    productoDB.save();

    return res.json({
        producto: productoDB
    });

}

const getProductos = async (req, res) => {


    const {page=0, limit=0} = req.query;

    const productosDB = await Producto.find()
                        .limit(Number(limit))
                        .skip(Number(limit) *(Number(page) - 1))
                        .populate('categoria');

    return res.json({
        page,
        productos: productosDB
    });
    
}

const getProducto = async(req, res) => {

    const id = req.params.id;

    const productoDB = await Producto.findById(id)
                            .populate('categoria');


    if(!productoDB) {
        return res.status(400).json({
            msg: `No se ha encontrado un producto con id ${id}`
        });
    } else {
        res.json({
            producto: productoDB
        });
    }


}

const putProducto = async (req, res) => {

    const id = req.params.id;
    const {_id, usuario, estado, ...data} = req.body;

    const productoDB = await Producto.findByIdAndUpdate(id, data, {new: true});

    if(!productoDB) {
        return res.status(400).json({
            msg: `No se ha encontrado un producto con id ${id}`
        });
    } else {
        res.json({
            producto: productoDB
        })
    }

}

const deleteProducto = async (req,res) => {

    const id = req.params.id;

    const productoDB = await Producto.findByIdAndUpdate(id,{estado: false},{new: true});

    if(!productoDB) {
        return res.status(400).json({
            msg: `No se ha encotrado un producto con id ${id}`
        });
    } else {
        res.json({
            producto: productoDB
        });
    }

}

module.exports = {
    postProducto,
    getProducto,
    getProductos,
    putProducto,
    deleteProducto
}