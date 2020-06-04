var mongoose = require('mongoose');
var mapTileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        terrain: String,
        notes: String
    }, {
        collection: 'mapTiles'
    }
);

var MapTile = module.exports = mongoose.model('mapTile', mapTileSchema, 'mapTiles');
module.exports.get = function (callback, limit) {
    MapTile.find(callback).limit(limit);
}