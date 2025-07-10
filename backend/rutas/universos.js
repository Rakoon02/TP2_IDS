const express = require('express');
const router = express.Router();
const pool = require('../base_de_datos'); 

router.delete('api/universos/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM universos WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar universo.");
        }
        res.send("Universo eliminado");
    });
});

module.exports = router;
