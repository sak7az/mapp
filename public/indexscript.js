
    var baseUrl = 'https://amsurna-mapp.herokuapp.com/api/amsurna/';

    function populateDropDownMenus() {
        var allDropDowns = $(".tiledropdown");
        for (var i = 0; i< allDropDowns.length; i++){
            var currentDropDown = allDropDowns[i];
            for(var terrainType of terrains){
                var newOpt = document.createElement('option');
                newOpt.appendChild(document.createTextNode(terrainType.name));
                newOpt.value = terrainType.name; 
                currentDropDown.appendChild(newOpt);
            }
        }
    }

    function updateTileTerrain (tileId, newTerrain) {
        var url = baseUrl + tileId;
        var data = 'terrain=' + newTerrain;
        $.ajax({
            url: url,
            type: 'PUT',
            success: function (res) {},
            data: data
        });
    };

    function updateTileNotes (tileId, newNotes) {
        var url = baseUrl + tileId;
        var data = 'notes=' + newNotes;
        $.ajax({
            url: url,
            type: 'PUT',
            success: function (res) {},
            data: data
        });
    }

    function loadAllTiles(){
        $.get(baseUrl, function (res) {
            var tileArray = res.data;
            for (var i =0; i< tileArray.length; i++){
                var mapTile = tileArray[i];
                var selector = "#" + mapTile.name;
                var imgSrc = "mapTiles/" + mapTile.terrain + ".png";
                $(selector).attr('src', imgSrc);
                $(selector).attr('alt', mapTile.terrain);
                $(selector).attr('data-notes', mapTile.notes);
            }
        });    
    };


            
    $(document).ready(function(){
        populateDropDownMenus();
        loadAllTiles();
        var selected;

        function periodicallySave(){
            if(selected){
                var notes = $('#tileNotesEditor').val();
                updateTileNotes(selected.substr(1), notes);
            }
        }

        var interval = setInterval(periodicallySave, 10000);
        
        $('.tiledropdown').change(function(){
            var terrain = $(this).children("option:selected").val();
            var tileName = this.id.substring(0,8);
            var newImageSrc = "mapTiles/" + terrain + ".png";
            $('#'+ tileName).attr("src", newImageSrc);
            updateTileTerrain(tileName, terrain);
        });

        $('.tilediv').hover(
            function(){
                $(this).children(".tiledropdown").css({ 
                    "opacity": "1"
                })
            }, 
            function(){
                $(this).children(".tiledropdown").css({ 
                    "opacity": "0"
                });
            }
        );

        $('.tile').click(function(){
            if (selected){
                $(selected).attr("style", "-webkit-filter: none ;filter: none;");
                var notes = $('#tileNotesEditor').val();
                updateTileNotes(selected.substr(1), notes);
            }
            var imgSrc = $(this).attr('src');
            var token = $(this).attr('id');
            var notes = $(this).attr('data-notes');
            $(this).attr('style', "-webkit-filter: invert(1);filter: invert(1);");
            $('#selectedTileImg').attr('src', imgSrc);
            $('#tileNotesEditor').focus();
            $('#tileNotesEditor').val(notes);
            selected = "#" + token;            
        });

        $('#saveTile').click(function(){
            if(selected != ""){
                var newNotes = $('#tileNotesEditor').val();
                updateTileNotes(selected.substr(1), newNotes);
                $(selected).attr("data-notes", $('#tileNotesEditor').val());
            }
        });

        var eventSource = new EventSource('/updates');


        eventSource.onmessage = function(event){
            console.log(`There/'s an update happening`);
        }
        eventSource.addEventListener('update', function(event) {
            loadAllTiles();
        });

    });
    
