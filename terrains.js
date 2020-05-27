class Terrain {
    constructor(name){
        this.name = name;
        this.src = name + ".png";
        this.alt = name;
    }
}

canyon = new Terrain("canyon");
cliffs = new Terrain("cliffs");
crags = new Terrain("crags");
dunes = new Terrain("dunes");
expanse = new Terrain("expanse");
grassland = new Terrain("grassland");
mesa = new Terrain("mesa");
ruins = new Terrain("ruins");
spires = new Terrain("spires");
town = new Terrain("town");
water = new Terrain("water");
unexplored = new Terrain("unexplored");


var terrains = [unexplored, canyon, cliffs, crags, dunes, expanse, grassland, mesa, ruins, spires, water];

