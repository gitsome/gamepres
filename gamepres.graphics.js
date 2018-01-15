var gamepres = gamepres || {};

(function($){

    gamepres.graphics = {};

    gamepres.graphics.drawBackground = function (game, level) {

        var width = game.width;
        var height = game.height;

        var ctx = game.canvas;
        ctx.fillStyle   = level.bgColor || "#fff";

        //Clear with the standard bgColor background
        ctx.fillRect (0,0, width, height);
    };

    var getOffset = function (layerNum, x, offset) {
        return Math.round((x-offset) * (1 / (layerNum + 1)));
    };

    var pI, pJ;
    var aX;
    var pCTX;
    gamepres.graphics.drawParallax = function (game, offset, pLayers) {

        pWidth = game.width;

        pCTX = game.canvas;

        for(pI=pLayers.length -1; pI >= 0; pI--) {
            for (pJ=0; pJ < pLayers[pI].length; pJ++){
                var pLax = pLayers[pI][pJ];

                aX = getOffset(pI, pLax.x, offset);
                if(aX >= 0 - pWidth && aX <= 2 * pWidth){
                    pCTX.drawImage(gamepres.assetLoader.images[pLax.image.image.name], aX, pLax.y);
                }

            }
        }
    };

    var count = 0;

    gamepres.graphics.drawObjects = function (game, level, offset, objects) {
        var width = game.width;
        var height = game.height;
        var totalWidth = game.totalWidth;
        var ctx = game.canvas;

        for(ob in objects){
            var pos = objects[ob].fixture.GetBody().GetPosition();
            var x = gamepres.physics.unscale(pos.x);
            var y = gamepres.physics.unscale(pos.y);
            var image = gamepres.assetLoader.images[objects[ob].obj.image.name];

            ctx.save();

            if(objects[ob].fixture.m_userData.noRotate){
                objects[ob].fixture.GetBody().SetAngle(0);
            }

            ctx.translate(x - offset, y - 2 * gamepres.levelLoader.punit);
            ctx.rotate(objects[ob].fixture.GetBody().GetAngle());
            ctx.drawImage(image, 0 - image.width/2, -image.height/2);
            ctx.restore();
        }
    };

    gamepres.graphics.drawPlayers = function (game, level, offset, players) {

        var width = game.width;
        var height = game.height;
        var totalWidth = game.totalWidth;
        var ctx = game.canvas;

        var alpha = 1;
        if(level.finished){
            alpha = (50 - Math.min(50, level.finishedCount))/50;
        }

        ctx.globalAlpha = alpha;
        for(var ply in players) {

            var player = players[ply];
            var pos = gamepres.player.spriteMap[player.type][player.direction][player.state];
            var x = Math.round(player.x-offset);
            var y = Math.round(player.y);
            ctx.drawImage(gamepres.assetLoader.images['player_sprite_' + ply],pos.x1, pos.y1, pos.x2 - pos.x1, pos.y2 - pos.y1, x, height - y - player.height,  pos.x2 - pos.x1, pos.y2 - pos.y1);
        }

        ctx.globalAlpha = 1;
    };

    gamepres.graphics.drawMarkup = function (game, level) {

        var target = game.target;
        target.find('#slides').remove();

        var slides = $('<div id="slides" class=""></div>');
        var stages = level.stages;
        var stageNum = stages.length;

        for(var i=0; i < stageNum; i++) {

            var stage = stages[i];
            var stageMarkup = $.tmpl('gamepres.stages.stage', {num:i});
            var stageTemplate = $.tmpl(stage.template, stage.templateData || {}, {rendered:stage.templateBehavior || $.noop});

            stageTemplate.appendTo(stageMarkup.find('.gamepres-stage-inner'));

            stageMarkup.appendTo(slides);
            slides.appendTo(target);
        }
    };

    gamepres.graphics.drawDoor = function (game, level, offset) {

        var width = game.width;
        var height = game.height;
        var totalWidth = game.totalWidth;
        var pos = gamepres.sprites['doorClosed'];

        var ctx = game.canvas;
        if(level.finished){
            var pos = gamepres.sprites['doorOpen'];
        }
        ctx.drawImage(gamepres.assetLoader.images['door'], pos.x1, pos.y1, pos.x2 - pos.x1, pos.y2 - pos.y1, totalWidth - 250 - offset, height - 2 * gamepres.levelLoader.punit - (pos.y2 - pos.y1),  pos.x2 - pos.x1, pos.y2 - pos.y1);
    };

    gamepres.graphics.updateMarkup = function (game, level, offset) {

        var width = game.width;
        var height = game.height;
        var totalWidth = game.totalWidth;
        var target = game.target;

        var stages = level.stages;

        $('#slides').css({left:-offset});

        var containers = target.find('.gamepres-stage-container');
        for(var i=0; i < containers.length; i++){
            $(containers[i]).css({width:width, left:width * i});
        }
    };

    gamepres.graphics.resizeStages = function (game) {
        var stages = game.target.find('.gamepres-stage');
        var stageWidth = $(stages[0]).width();
        stages.css({'margin-left':-Math.round(stageWidth/2)});

    };

    /*======= TEMPLATES =======*/

    $.template('gamepres.stages.stage',[
        '<div id="stage-${num}" class="gamepres-stage-container"><div class="gamepres-stage"><div class="gamepres-stage-inner"></div></div></div>'
    ].join(''));



})(jQuery);