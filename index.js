const express = require("express");
const app = express();
const { insertar, consultar, editar, eliminar } = require('./db')

app.listen(3000, () =>
{
    console.log("Conectado al servidor 3000");
})

app.use(express.json());

app.get("/", async (req, res) =>
{
    res.sendFile(__dirname + "/index.html");
})

app.post("/cancion", async (req, res) =>
{
    const payload = req.body;
    try 
    {
        const response = await insertar(payload);
        res.send(response.rows)
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: 'No fue posible guardar el registro'})
    }
})

app.get("/canciones", async (req, res) => 
{
    try 
    {
        const response = await consultar()
        res.json(response.rows)
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: "No es posible ver los registros"})
    }
})

app.put("/cancion/:id", async (req, res) =>
{
    const id = req.params.id;
    const payload = req.body;
    payload.id = id;

    try 
    {
        const response = await editar(payload);
        res.send(response.rows);
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: 'No fue posible editar el registro.'})
    }
})

app.delete("/cancion", async (req, res) =>
{
    const queryString = req.query;
    
    try 
    {
        const result = await eliminar(queryString);
        res.json({message: ''})
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: 'No fue posible eliminar el registro.'})
    }
})