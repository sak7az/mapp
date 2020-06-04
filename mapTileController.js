MapTile = require('./mapTileModel');

exports.viewAll = function (req, res) {
    MapTile.get(function (err, mapTiles) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Retrieved map tiles successfully",
            data: mapTiles
        });
    });
};

exports.new = function (req, res) {
    var mapTile = new MapTile();
    mapTile.name = req.body.name ? req.body.name : mapTile.name;
    mapTile.terrain = req.body.terrain;
    mapTile.notes = req.body.notes;
    mapTile.save(function (err) {
        if (err) { res.json(err); }
        res.json({
            message: 'New map tile created',
            data: mapTile
        });
    });
};

exports.viewOne = function (req, res) {
    MapTile.findOne({name: req.params.mapTile_name}, function (err, mapTile) {
        if (err) { res.send(err); }
        console.log(res)
        res.json({
            message: 'Loading map tile...',
            data: mapTile
        });
    });
};

exports.update = function (req, res) {
    MapTile.findOne({name: req.params.mapTile_name}, function (err, mapTile) {
        if (err) { res.send(err); }
        //mapTile.name = req.body.name ? req.body.name : mapTile.name;
        if (req.body.terrain) { mapTile.terrain = req.body.terrain; }
        if (req.body.notes) { mapTile.notes = req.body.notes; }
        console.log(mapTile);
        mapTile.save(function (err) {
            if (err) { return console.log(err); }
            res.json({
                status: 'success',
                message: 'Map tile updated',
                data: mapTile 
            });
        });
    });
};

exports.delete = function (req, res) {
    MapTile.remove({
        name: req.params.mapTile_name
    }, function (err, mapTile) {
        if (err ) { res.send(err); }
        res.json({
            status: "success",
            message: 'Map tile deleted'
        });
    });
};