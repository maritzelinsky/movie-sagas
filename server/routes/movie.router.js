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
    let queryText = `SELECT "movies".title, "movies".poster, array_agg("genres".name) AS "movie_genre", "movies".description FROM "movies"
                    JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
                    JOIN "genres" ON "genres".id = "movies_genres".genre_id
                    WHERE "movies".id = $1
                    GROUP BY "movies".id;`
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