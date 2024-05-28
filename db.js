const { Pool } = require('pg'); 

const config = { 
    user: process.env.USER, 
    host: process.env.HOST, 
    database: process.env.DATABASE, 
    password: process.env.PASS, 
    port: process.env.PORT, 
} 

const pool = new Pool(config);

const insertar = async (payload) =>
{
    const text = "INSERT INTO canciones(titulo, artista, tono) VALUES($1, $2, $3) RETURNING *";
    const values = [payload.titulo, payload.artista, payload.tono]
    
    const queryObject = {
        text: text,
        values: values
    }

    const result = await pool.query(queryObject)
    return result
}

const consultar = async () => {

    const text = "SELECT * FROM canciones";
    
    const queryObject = {
        text : text,
        values : [],
        rowMode : "json"
    }
    const result = await pool.query(queryObject)
    return result
}

const editar = async (payload) =>
{
    const text = "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE artista = $2";
    const values = [payload.titulo, payload.artista, payload.tono];

    const queryObject = {
        text : text,
        values : values
    }

    const result = await pool.query(queryObject)
    return result
}

const eliminar = async (dato) =>
{
    const text = "DELETE FROM canciones WHERE id = $1";
    const values = [dato.id];

    const queryObject = {
        text : text,
        values : values
    }

    const result = await pool.query(queryObject);
    return result;
}

module.exports = { insertar, consultar, editar, eliminar };