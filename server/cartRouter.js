const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const logHandler = require('./logHandler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/data/cart.json', 'utf8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.post(`/:id/:name`, (req, res) => {
    handler(req, res, 'add', `server/data/cart.json`);
    logHandler(req, res, 'add', `server/data/stats.json`)
});
router.put(`/:id/:name`, (req, res) => {
    handler(req, res, 'change', `server/data/cart.json`);
    logHandler(req, res, 'change', `server/data/stats.json`)
});

router.delete(`/:id/:name`, (req, res) => {
    handler(req, res, 'remove', `server/data/cart.json`);
    logHandler(req, res, 'remove', `server/data/stats.json`)
});

module.exports = router;