/**
 * TODO
    *todo list section on the right side
    * tile onclick that 
    *   displays notes in the notes section for that tile. 
    *   highlights the tile selected
    *figure out using JSON file to save states
 * 
 * Stretch TODOs
    * free-form notes section on the right side. (maybe wanted/ongoing quests)
    * 
    * settings to change skins/name of map
    *  
    * https://gist.github.com/sstur/7379870 
 */

    function populateDropDownMenus(){
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
    
    $(document).ready(function(){

        var selected = "#tile0104";

        populateDropDownMenus();

        $('#tileNotesEditor').val($(selected).attr("data-notes"));
        
        $('.tiledropdown').change(function(){
            var coordinates = this.id.substring(0,8);
            var newImageSrc = $(this).children("option:selected").val()+ ".png";
            newImageSrc = "mapTiles/" + newImageSrc;
            $('#'+coordinates).attr("src", newImageSrc);
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
            var imgSrc = $(this).attr('src');
            var token = $(this).attr('id');
            var notes = $(this).attr('data-notes');
            $(this).attr('style', "-webkit-filter: invert(1);filter: invert(1);");
            $('#selectedTileImg').attr('src', imgSrc);
            $('#tileNotesEditor').focus();
            $('#tileNotesEditor').val(notes);
            selected = "#" + token;            
        });

        $('#tileNotesEditor').focusout(function(){
            if(selected != ""){
                $(selected).attr("style", "-webkit-filter: none ;filter: none;");
                $('#selectedTileImg').attr('src', 'mapTiles/unexplored.png');
                $(selected).attr("data-notes", $(this).val());
                $(this).val("");
                selected = ("");
            }
        });

        $('#saveTile').click(function(){
            if(selected != ""){
                $(selected).attr("data-notes", $('#tileNotesEditor').val());
            }
        });

        $('#saveMap').click(function(){
            saveMap();
        })

        function saveMap(){
            var row = 1;
            var column = 1; 
            var newString = "";
            while(true){
                var selector = formatTileSelector(row, column);
                if ($(selector).length){
                    newString += JSON.stringify($(selector));
                    column++;
                } else if ($(formatTileSelector(row+1, 1)).length){
                    row++;
                    column = 1;
                } else { break; }
            }
        }

        function formatTileSelector(row, column){
            var tileSelector = "#tile"
            if (row < 10) {
                tileSelector +="0";
                tileSelector += row;
            } else { tileSelector =+ row; }
            if (column < 10) {
                tileSelector += "0";
                tileSelector += column;
            } else { tileSelector += column; }
            return tileSelector;
        }
    });



