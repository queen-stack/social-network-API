// importing express module
const router = require('express').Router();

//importing routes
//API routes from /api/index.js
const apiRoutes = require('./api');


// adding  `/api` for all api routes f/ `api` dir
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 error</h1>');
});

module.exports = router;