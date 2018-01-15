var gamepres = gamepres || {};

(function($){

    gamepres.levelLoader = {};

    gamepres.levelLoader.bottomPercent = 0.08;
    gamepres.levelLoader.minimumPadding = 0.03;
    gamepres.levelLoader.punit = 15;

    gamepres.levelLoader.loadLevel = function (game, levelNum) {

        /*====== SETUP NEW LEVEL BASIC CONFIGS AND PRIVATE FUNCTIONS =======*/

        var newLevel = {
            parallaxLayers: [],
            parallaxConfigs : [],
            objects: [],
            stages: [],
            bgColor: '',
            title:'',
            description:''
        };

        newLevel.bgColor = game.levels[levelNum].configs.bgColor;
        newLevel.title = game.levels[levelNum].configs.title;
        newLevel.description = game.levels[levelNum].configs.description;
        newLevel.parallaxConfigs = game.levels[levelNum].configs.parallax;
        newLevel.stages = game.levels[levelNum].configs.stages;
        newLevel.song = game.levels[levelNum].configs.song || false;

        newLevel.objects = {};
        for(var i=0; i < newLevel.stages.length; i++){
            newLevel.objects[i] = [];
            for(var j=0; j < newLevel.stages[i].objects.length; j++){
                newLevel.objects[i].push(newLevel.stages[i].objects[j]);
            }
        }

        /*====== CREATE THE NEW 2D CONTEXT =======*/

        var getGameCanvas = function () {

            game.target.html('');
            game.target.css('position', 'relative');

            if($('game-canvas').length > 0){$('game-canvas').remove();}
            $('<canvas id="game-canvas" style="height:100%; width:100%;"></canvas>').appendTo(game.target);
            var canvas = document.getElementById("game-canvas");
            //WebGL2D.enable(canvas); // adds "webgl-2d" context to cvs

            return canvas.getContext("2d");
        };

        //clear the area and create a new 2d context for the game object
        game.canvas = getGameCanvas();


        /*====== CREATE THE PARALLAX CONFIGURATIONS =======*/
        //this is done once, it sets up positioning of the parrlax images based on percentage of their layer

        //create a function to generate a random image
        var getRandomImage = function (pBuckets) {
            var randomNum = Math.random();
            var onGoingPercent = 0;
            for(var k=0; k < pBuckets.length; k++) {

                onGoingPercent = onGoingPercent + pBuckets[k].percent;

                if(randomNum < onGoingPercent){
                    return pBuckets[k].image;
                }
            }
        };

        for(var i=0; i < newLevel.parallaxConfigs.length; i++){

            var pConfigs = newLevel.parallaxConfigs[i];

            if(!pConfigs.thumbnailOnly){

                var padding = pConfigs.padding;
                var images = pConfigs.images;
                var layerNum = pConfigs.layer;

                var y, aImage, ymin, ymax;

                var layer = [];

                //setup the percent buckets
                var percentBuckets = [];
                var percent = 0;
                for(var j=0; j < images.length; j++) {

                    cImage = images[j];

                    //if we are using probabilities
                    if(cImage.probability && !cImage.thumbnailOnly) {

                        percent = percent + cImage.probability;
                        percentBuckets.push({
                            percent: percent,
                            image: cImage
                        });

                    } else if (!cImage.thumbnailOnly) {

                        percentBuckets.push({
                            percent: 1 - percent,
                            image: cImage
                        });
                    }
                }

                //if we need random spacing with padding
                if(padding > 0){
                    var x = 0;
                    while(x < 1) {

                        aImage = getRandomImage(percentBuckets);

                        //calculate x
                        var rp = Math.max(gamepres.levelLoader.minimumPadding, Math.random() * padding);
                        x = x + rp;

                        if(x < 1){
                            //calculate y
                            if(aImage.fixTop) {
                                y = 'fixTop';
                            } else if( aImage.fixBottom){
                                y = 'fixBottom';
                            } else {

                                ymin = aImage.ymin ? aImage.ymin : gamepres.levelLoaderbottomPercent;
                                ymax = aImage.ymax ? aImage.ymax : 1;

                                y = ymin + ( Math.random() * (ymax - ymin) );
                            }

                            layer.push({x:x, y:y, image: aImage});
                        }
                    }

                } else {

                    aImage = getRandomImage(percentBuckets);
                    if(aImage.fixTop) {
                        y = 'fixTop';
                    } else if( aImage.fixBottom){
                        y = 'fixBottom';
                    } else if( aImage.fixFloor){
                        y = 'fixFloor';
                    } else {

                        ymin = aImage.ymin ? aImage.ymin : gamepres.levelLoader.bottomPercent;
                        ymax = aImage.ymax ? aImage.ymax : 1;

                        y = ymin + ( Math.random() * (ymax - ymin) );
                    }


                    layer.push({x:'continuous', y: y, image: aImage});
                }

                if(newLevel.parallaxLayers[layerNum]){
                    newLevel.parallaxLayers[layerNum] = newLevel.parallaxLayers[layerNum].concat(layer);
                } else {
                    newLevel.parallaxLayers[layerNum] = layer;
                }

            }
        }

        return newLevel;
    };

    //This should be called when the viewport is resized so that we have actual
    gamepres.levelLoader.getParallaxImages = function (width, height, level) {

        var totalStages = level.stages.length;
        var totalWidth = totalStages * width;
        var bottom = 0;

        var pLayers = level.parallaxLayers;

        var pLaxImages = [];

        //for each layer generate the images
        for(var i=0; i < pLayers.length; i++){

            pLaxImages[i] = [];

            if(pLayers[i]){

                for(var j=0; j < pLayers[i].length; j++){

                    var image = pLayers[i][j];
                    var px, py, off;

                    //calculate position for continuous objects
                    if(image.x == "continuous"){

                        for(var xpos = 0; xpos < totalWidth; xpos = xpos + image.image.width){

                            //get the y
                            if(image.y == 'fixBottom'){
                                py = height - 2 * gamepres.levelLoader.punit - image.image.height;
                            } else if( image.y == 'fixTop'){
                                py = 0;
                            } else if( image.y == 'fixFloor'){
                                py = height - gamepres.levelLoader.punit * 2;
                            } else {
                                py = height * (1 - image.y);
                            }

                            off =  (1 / (i+1));

                            pLaxImages[i].push({
                                x: Math.round(xpos / off), y: Math.round(py), image: pLayers[i][j], repeat:true, layer: i
                            });
                        }

                    } else {

                        //calculate position for non-continuous objects

                        px = totalWidth * image.x;

                        //get the y
                        if(image.y == 'fixBottom'){
                            py = height - 2 * gamepres.levelLoader.punit - image.image.height;
                        } else if( image.y == 'fixTop'){
                            py = 0;
                        } else {
                            py = height * (1 - image.y);
                        }

                        off =  (1 / (i+1));

                        pLaxImages[i].push({
                            x: Math.round(px / off), y: Math.round(py), image: pLayers[i][j], layer: i
                        });
                    }
                }
            }
        }

        return pLaxImages;
    };


})(jQuery);