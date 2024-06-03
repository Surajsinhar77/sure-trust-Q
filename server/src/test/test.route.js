const Route = require('express').Router;

const testRoute = Route();

testRoute.get('/', async(_, res) => {
    res.send('Test route');
});

module.exports = testRoute;

