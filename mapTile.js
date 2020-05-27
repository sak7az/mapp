class MapTile {
    constructor(terrain, description, coordinates){
        this.terrain = terrain; 
        this.description = "There are no notes on this area of the map yet... ";
        this.coordinates = coordinates;
    }
    getTerrain(){
        return this.terrain;
    }
    setTerrain(newTerrain){
        this.terrain = newTerrain;
    }
    getDescription(){
        return this.description;
    }
    setDescription(newDescription){
        this.description = newDescription;
    }
    getCoordinates(){
        return this.coordinates;
    }
    saveTile(){
        //TODO write to file on edit? make a decision about this
    }
}