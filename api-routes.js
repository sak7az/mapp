let router = require('express').Router();
//default response
router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'Welcome to Amsurna',
    });
});

var mapTileController = require('./mapTileController.js');

// define routes
router.route('/amsurna')
    .get(mapTileController.viewAll)
    .post(mapTileController.new);

router.route('/amsurna/:mapTile_name')
    .get(mapTileController.viewOne)
    .patch(mapTileController.update)
    .put(mapTileController.update)
    .delete(mapTileController.delete);
//Export the routes
module.exports = router;