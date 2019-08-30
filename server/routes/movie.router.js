const express = require('express');
const router = express.Router();
const pool =  require('../modules/pool');

// pulls information from the database saga_movies_weekend, movies table
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "movies";';
    pool.queryText(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log("Error in movie.router GET:", error)
        res.sendStatus(500);
    })
});

module.exports = router;