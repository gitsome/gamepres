var gamepres = gamepres || {};

(function($){

    gamepres.assetLoader = {
        images : {}
    };

    gamepres.assetLoader.loadSounds = function (sounds) {
        //load our own effects assets
        gamepres.audio.loadBulk(sounds);
    };

    gamepres.assetLoader.loadImages = function (game, callback_in) {

        //load all images and get their sizes
        var imagesToLoad;
        var imagesLoaded;
        var loadImage = function (imageObj, callback) {

            gamepres.assetLoader.images[imageObj.obj.name] = new Image();
            gamepres.assetLoader.images[imageObj.obj.name].onload = function() {
                imageObj.obj.width = this.width;
                imageObj.obj.height = this.height;
                imageObj.obj.ratio = this.width / this.height;
                imagesLoaded++;
                callback(imagesLoaded, imagesToLoad);
            };
            gamepres.assetLoader.images[imageObj.obj.name].src = imageObj.image;
        };

        var loadImagesAndGetSizes = function (callback) {

            imagesToLoad = 0;
            imagesLoaded = 0;
            var i;
            var imageList = [];

            for(i=0; i < game.levels.length; i++) {
                var pList = game.levels[i].configs.parallax;
                for(var j=0; j < pList.length; j++){

                    var pImages = pList[j].images;
                    for(var k=0; k < pImages.length; k++){
                        imagesToLoad++;
                        imageList.push({image:pImages[k].image, obj:pImages[k]});
                    }

                }
                for(var j=0; j < game.levels[i].configs.stages.length; j++){
                    var stage = game.levels[i].configs.stages[j];
                    stage.objects = stage.objects || [];
                    for(var k=0; k < stage.objects.length; k++){
                        imagesToLoad++;
                        imageList.push({image: stage.objects[k].image.image, obj: stage.objects[k].image});
                    }
                }
            }

            for(i=0; i < game.images.length; i++) {
                imagesToLoad++;
                imageList.push({
                    image:game.images[i].image, obj:game.images[i]
                });
            }

            for(i=0; i < imageList.length; i++) {
                loadImage(imageList[i], callback);
            }
        };

        //and start it all up
        loadImagesAndGetSizes(callback_in);
    };



})(jQuery);