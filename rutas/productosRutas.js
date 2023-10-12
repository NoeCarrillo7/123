var ruta = require("express").Router();
var subirArchivo = require("../middlwares/subirArchivo");
var { mostrarProductos, nuevoProducto, buscarPorID, modificarProducto, borrarProducto } = require("../bd/productosBD");

ruta.get("/mostrarP", async(req, res)=>{
    var productos = await mostrarProductos();
    //console.log(productos);
    res.render("productos/mostrarP", {productos});
});


ruta.get("/nuevoproducto", async(req,res)=>{
    res.render("productos/nuevoP");
});

ruta.post("/nuevoproducto",subirArchivo(), async(req, res)=>{
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/mostrarP");
});

ruta.get("/editarP/:id", async(req, res)=>{
    var prod = await buscarPorID(req.params.id);
    console.log(prod);
    res.render("productos/modificarP", {prod});
});

ruta.post("/editarP", subirArchivo(), async(req, res)=>{
    req.body.foto = req.file.originalname;
    var error = await modificarProducto(req.body);
    res.redirect("/mostrarP");
});

ruta.get("/borrarP/:id", async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/mostrarP");
});


module.exports = ruta;