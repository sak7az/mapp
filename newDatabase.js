function formatTileSelector(row, column){
            var tileSelector = "tile"
            if (row < 10) {
                tileSelector +="0";
                tileSelector += row;
            } else { tileSelector += row; }
            if (column < 10) {
                tileSelector += "0";
                tileSelector += column;
            } else { tileSelector += column; }
            return tileSelector;
        }

db = db.getSiblingDB('Amsurna');
db.mapTiles.drop();

for(var row=1; row <=17; row ++){
    for (var col=1; col<=17; col++){
        db.mapTiles.insertOne({
            name: formatTileSelector(row, col),
            terrain: "unexplored",
            notes: "Enter notes here..."
        },{
            ordered: false
        });
    }
}

db.mapTiles.updateOne({
    name: "tile0909"
},{
    $set: {terrain: "town"}
})