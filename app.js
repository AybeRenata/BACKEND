const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;
const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY } = require("./config");
const bodyParser = require("body-parser");
const { productsValidation } = require("./middlewares");
const { name, price, description, stock, brand, spec, store_id } = require("./validation");

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// trae todos los productos de una tienda
app.get("/products", async (req, res) => {
    const store_id = req.query.store_id
    if (!store_id) {
        res.status(500).json("store_id es obligatorio en la query")
    }

    const { data: stores } = await supabase
        .from('stores')
        .select('*')
        .eq("id", store_id)

    if (stores.length === 0) {
        res.status(500).json("No existe una tienda con ese id")
    }


    const order = req.query.order
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq("store_id", store_id)
        .order('stock', { ascending: order === 'asc' });
    if (error) {
        res.status(500).json("falló el get")

    }
    res.status(200).json(data)

});

// verificar que tenga un id [x]
// verificar que ese id exista en la base de datos []

// trae un producto por id
app.get("/products/:id", async (req, res) => {
    const params = req.params
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)

    if (data.length === 0) {
        res.status(500).json("No existe un producto con ese id")
    }

    if (error) {
        res.status(500).json("falló el get")

    }
    res.status(200).json(data[0])
});


// crea un producto de una tienda
app.post("/products", [name, price, description, stock, brand, spec, store_id, productsValidation], async function (req, res) {
    const { name, price, description, stock, brand, spec, store_id } = req.body

    const { data, error } = await supabase
        .from('products')
        .insert([
            { name, price, description, stock, brand, spec, store_id },
        ])

    if (error) {
        res.status(500).json("falló el post")

    }
    res.status(200).json("post exitoso")
});

// actualiza un producto 
app.put("/products/:id", [name, price, description, stock, brand, spec, store_id, productsValidation], async function (req, res) {
    const params = req.params
    const body = req.body
    const { data, error } = await supabase
        .from('products')
        .update({ ...body })
        .eq('id', params.id)
        .select()
    if (error) {
        res.status(500).json("falló el put")

    }
    res.status(200).json("put exitoso")
});

// elimina un producto 
app.delete("/products/:id", async function (req, res) {
    const params = req.params
    const body = req.body
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', params.id)
    if (error) {
        res.status(500).json("falló el delete")

    }
    res.status(200).json("delete exitoso")
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);