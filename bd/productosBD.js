var conexion = require("./conexion").conexionP;
var Producto = require("../modelos/Producto");

async function mostrarProductos(){
    var prods = [];
    try {
        var productos = await conexion.get();
        //console.log(productos);
        productos.forEach(producto => {
            console.log(producto.id);
            var prod = new Producto(producto.id, producto.data());
            console.log(prod);
            if(prod.bandera == 0){
                prods.push(prod.obtenerDatos);
            }
        });
    }
    catch(err){
        console.log("Error al recuperar el producto de la BD " + err);
    }
    return prods;
}

async function buscarPorID(id){
    var prod;
    console.log(id);
    try{
        var producto = await conexion.doc(id).get();
        var productoObjeto = new Producto(producto.id, producto.data());
        if (productoObjeto.bandera == 0) {
            prod = productoObjeto.obtenerDatos;
        }
    }
    catch(err){
        console.log("Error al recuperar al producto " + err);
    }
    return prod;
}

async function nuevoProducto(datos){
    var prod = new Producto(null, datos);
    var error = 1;
    if (prod.bandera == 0) {
        try{
            await conexion.doc().set(prod.obtenerDatos);
            console.log("Producto insertado a la BD");
            error = 0;
        }
        catch(err){
            console.log("Error al capturar el nuevo producto " + err);
        }
    }
    return error;
}

async function modificarProducto(datos){
    var prod = new Producto(datos.id, datos);
    var error = 1;
    if (prod.bandera == 0) {
        try {
            await conexion.doc(prod.id).set(prod.obtenerDatos);
            console.log("Registro actualizado");
            error = 0;
        }
        catch(error){
            console.log("Error al modificar al producto " + err);
        }
    }
    return error;
}

async function borrarProducto(id) {
    var error = 1;  
    var prod = await buscarPorID(id);
    if(prod != undefined){
        try {
            await conexion.doc(id).delete();
            console.log("Registro eliminado");
            error = 0;
        }
        catch(error){ 
            console.log("Error al borrar al producto") +  err;
        }
    }
    return error;
}


module.exports = {
    mostrarProductos,
    buscarPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
};