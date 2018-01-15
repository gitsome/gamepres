var gamepres = gamepres || {};

(function($){

    gamepres.levelSelector = {};

    gamepres.levelSelector.openMenu = function (menuOptions) {

        gamepres.audio.play('pause');

        var currentGame = menuOptions.game;
        var onSelect = menuOptions.onSelect;
        var onCancel = menuOptions.onCancel;
        var currentLevelNum = menuOptions.currentLevelNum;

        var levels = currentGame.levels;

        var keepScanning = true;

        //wiring for the modal
        var modalBehave = function (item) {
            var node = $(item.nodes[0]);
            var modalData = item.data;

            var arrowWidth = 50;
            var levelWidth = 200;

            var cLevel = currentLevelNum;
            var totalLevels = modalData.levels.length;

            var updateSelector = function () {
                //if we are at the left end then move the cursor
                if(cLevel === 0){
                    $('.gamepres-modal-levels-selector').css('left', arrowWidth + 'px');
                } else if (cLevel == levels.length - 1 && levels.length > 2){
                    $('.gamepres-modal-levels-selector').css('left', (arrowWidth + 2 * levelWidth) + 'px');
                } else {
                    $('.gamepres-modal-levels-selector').css('left', (arrowWidth + levelWidth) + 'px');
                }
            };

            var updateLevelContent = function () {

                $('.gamepres-modal-levels-content').css('width', levels.length * levelWidth + 500 + 'px');
                var amountLeft = -1 * (cLevel-1) * levelWidth + arrowWidth;

                if(cLevel == levels.length - 1) {
                    amountLeft = -1 * (cLevel-2) * levelWidth + arrowWidth;
                }

                if(cLevel < 2) {
                    amountLeft = arrowWidth;
                }

                $('.gamepres-modal-levels-content').css('left', amountLeft +  'px');
            };

            var moveLeft = function () {
                if(cLevel !== 0) {
                    cLevel = cLevel - 1;
                    updateSelector();
                    updateLevelContent();
                    gamepres.audio.play('menu');
                }
            };
            var moveRight = function () {
                if(cLevel !== levels.length - 1) {
                    cLevel = cLevel + 1;
                    updateSelector();
                    updateLevelContent();
                    gamepres.audio.play('menu');
                }
            };
            var openLevel = function (lNum) {
                $('.gamepres-modal-levels-selector').addClass('gamepres-selected');
                gamepres.audio.play('enterlevel');
                setTimeout(function(){
                    exit(true);
                    setTimeout(function(){onSelect(lNum);}, 200);
                }, 400);
            };
            var exit = function (levelLoaded) {
                $('.gamepres-modal-levels-selector').removeClass('gamepres-selected');
                $('.gamepres-modal, .gamepres-modal-border').stop(true,true).fadeOut(200);
                keepScanning = false;

                if(!levelLoaded){
                    gamepres.audio.play('pause');
                }
            };

            var scanInpoots = function () {

                inpoot.tick();
                if(inpoot.action('left').pressed){
                    moveLeft();
                }
                if(inpoot.action('right').pressed){
                    moveRight();
                }
                if(inpoot.action('exit').pressed){
                    exit();
                    onCancel();
                }
                if(inpoot.action('start').pressed || inpoot.action('selectLevel').pressed){
                    openLevel(cLevel);
                }

                if(keepScanning) {
                    requestAnimationFrame(scanInpoots);
                }
            };

            //also wire up so click behavior
            $('.gamepres-modal-levels-left').click(moveLeft);
            $('.gamepres-modal-levels-right').click(moveRight);

            updateSelector();
            updateLevelContent();

            //start scanning
            scanInpoots();
        };

        //figure out modal data
        var modalData = {
            title: currentGame.title,
            levels: []
        };

        for(var i=0; i < currentGame.levels.length; i++) {

            var thumbnail = false;
            for(var j=0; j < currentGame.levels[i].configs.parallax.length; j++){
                for( var k=0; k < currentGame.levels[i].configs.parallax[j].images.length; k++){
                    if(currentGame.levels[i].configs.parallax[j].images[k].thumbnail){
                        thumbnail = $.extend(true, {}, currentGame.levels[i].configs.parallax[j].images[k]);
                        var maxWidth = Math.min(100, thumbnail.width);
                        var maxHeight = Math.min(100, thumbnail.height);
                        if (maxHeight * thumbnail.ratio <= maxHeight){
                            thumbnail.width = Math.round(maxHeight * thumbnail.ratio);
                        } else {
                            thumbnail.height = Math.round(maxWidth / thumbnail.ratio);
                        }
                    }
                }
            }
            modalData.levels.push({
                title: currentGame.levels[i].configs.title,
                stages: currentGame.levels[i].stages.length,
                bgColor: currentGame.levels[i].configs.bgColor || '#444',
                thumbnail: thumbnail
            });
        }

        //load the modal
        $.tmpl('gamepres.modal', modalData, {rendered: modalBehave}).appendTo(currentGame.target);

    };


    /*======== TEMPLATES =======*/

    $.template('gamepres.modal',[
        '<div class="gamepres-modal constance no-select">',
            '<div class="gamepres-modal-title itsame">${title}</div>',
            '<div class="gamepres-modal-levels no-select">',
                '<div class="gamepres-modal-levels-left fade-left"><span class="gamepres-arrow-left arrow-left easy"></span></div>',
                '<div class="gamepres-modal-levels-content easy">',
                    '{{tmpl(levels) "gamepres.modal.levels"}}',
                '</div>',
                '<div class="gamepres-modal-levels-selector easy"></div>',
                '<div class="gamepres-modal-levels-right fade-right"><span class="gamepres-arrow-right arrow-right easy"></span></div>',
            '</div>',
        '</div>',
        '<div class="gamepres-modal-border"></div>'
    ].join(''));

    $.template('gamepres.modal.levels',[
        '<div class="gamepres-modal-levels-level no-select">',
            '<div class="gamepres-modal-levels-level-title">${title}</div>',
            '<div class="gamepres-modal-levels-level-visual" style="background-color:${bgColor};">',
                '{{if thumbnail.fixBottom == true}}',
                    '<img src="${thumbnail.image}" width="${thumbnail.width}" height="${thumbnail.height}" style="margin-left: -${thumbnail.width/2}px;"/>',
                '{{else}}',
                    '<img src="${thumbnail.image}" width="${thumbnail.width}" height="${thumbnail.height}" style="margin-left: -${thumbnail.width/2}px; top:50%; bottom:auto; margin-top: -${thumbnail.height/2}px;"/>',
                '{{/if}}',
            '</div>',
        '</div>'
    ].join(''));

})(jQuery);