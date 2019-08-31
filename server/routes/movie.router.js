const express = require('express');
const router = express.Router();
const pool =  require('../modules/pool');

// pulls information from the database saga_movies_weekend, movies table
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "movies";';
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log("Error in movie.router / GET:", error)
        res.sendStatus(500);
    })
});

// pulls details for the selected movie when clicked
router.get('/details/:id', (req, res) => {
    let detailsId = req.params.id
    let queryText = 'SELECT * FROM "movies" WHERE "id" = $1;';
    pool.query(queryText, [detailsId])
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log("Error in movie.router /details GET:", error)
            res.sendStatus(500);
        })
});

module.exports = router;