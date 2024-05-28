const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3008;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dripbydesign'
});

// Conexión a la base de datos MySQL
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Ruta para obtener todos los items
app.get('/api/items', (req, res) => {
    connection.query('SELECT * FROM items', (error, results) => {
        if (error) {
            console.error('Error al obtener los items:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    connection.query('INSERT INTO items SET ?', newItem, (error, results) => {
        if (error) {
            console.error('Error al agregar un nuevo item:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Item agregado correctamente', newItem });
    });
});

// Ruta para actualizar un item existente
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    connection.query('UPDATE items SET ? WHERE id = ?', [updatedItem, itemId], (error, results) => {
        if (error) {
            console.error('Error al actualizar el item:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Item actualizado correctamente', updatedItem });
    });
});

// Ruta para eliminar un item
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    connection.query('DELETE FROM items WHERE id = ?', itemId, (error, results) => {
        if (error) {
            console.error('Error al eliminar el item:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Item eliminado correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
