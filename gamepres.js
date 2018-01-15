/*
*   gampres.js
*   @author john david martin / johndavidfive@gmail.com
*   Thanks to Ben Sparks for contributions in concept and code especially the gamepres.audio code
*   A presentation framework in a silly side scrolling game environment
*   Sounds used from http://themushroomkingdom.net/
*   Images used from http://www.mariomayhem.com/downloads/mario_game_maps/
*/

//gamepres namespace
var gamepres = gamepres || {};

//now game loop logic (cross browser requestAnimationFrame object)
var requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//create private scope
(function($){

    /*======== PRIVATE FUNCTIONS =========*/

    //update the dimenions and do some recalculations
    var updateDimensions = function () {

        var width = $(currentGame.target).width();
        var height = $(currentGame.target).height();

        //first make sure we are actually in a game and check for a canvas
        if(currentGame.canvas && currentGame.canvas.canvas){

            //setup proper widths
            currentGame.target.find('canvas').css({width: width, height: height});
            currentGame.canvas.canvas.width = width;
            currentGame.canvas.canvas.height = height;

            currentGame.width = width;
            currentGame.height = height;
            currentGame.totalWidth = width * currentGame.levels[currentLevelNum].stages.length;

            //calculate bumper size, the limits where scrolling will occur when a player reaches it
            var numPlayers = 0;
            for(var p in players){
                numPlayers++;
            }
            numPlayers = Math.max(numPlayers, 1);
            var bumperPercentage = 0.50 - 0.40 * (numPlayers / 4);
            BUMPER_SIZE = Math.round(currentGame.width * bumperPercentage);

            //since we are resizing we need to go get the updated parrallaxImages with adjusted positions
            if(currentLevel && gameMode == "play"){
                currentLevel.parallaxImages = gamepres.levelLoader.getParallaxImages(width, height, currentLevel);
            }

            //and the stages (the slides) need to be resized as well
            gamepres.graphics.resizeStages(currentGame);
        }
    };


    /*======== PRIVATE STATE =========*/

    //draw Box2D debug
    var drawBox2DDebug = false;

    //currentGame
    var currentGame = {};

    //currentLevel
    var currentLevel = {};

    //currentLevelNum
    var currentLevelNum = 0;

    //game loop mode
    var gameMode = "none";

    //levels
    var levels = [];

    //players
    var players = {};
    var activePlayers = {
        1 : {
                active:true,
                stats:{coins: 0, type:'small'}
            }
    };

    //offset
    var physicsoffset = 0;
    var offset = 0;
    var BUMPER_SIZE = 200;

    //inpoot actions
    var inpootOptions = {
        maxPlayers: 4,
        namespace: 'gamepres',
        actions: {
            left: {
                descr: "Previous Level",
                category: "Select Level"
            },
            right: {
                descr: "Next Level",
                category: "Select Level"
            },
            start: {
                descr: "Start",
                category: "Select Level"
            },
            selectLevel: {
                descr: "Select Level (enter)",
                category: "Select Level"
            },
            exit: {
                descr: "Exit Menu",
                category: "Select Level"
            },

            warpLeft: {
                descr: "Warp left a stage",
                category: "Stage warp"
            },
            warpRight: {
                descr: "Warp right a stage",
                category: "Stage warp"
            },

            moveLeft: {
                descr: "Player move left",
                category: "Player move"
            },
            moveRight: {
                descr: "Player move right",
                category: "Player move"
            },
            jump : {
                descr: "Player Jump!",
                category: "Player move"
            },
            kick : {
                descr: "Kick",
                category: "Player move"
            },
            run : {
                descr: "Run faster",
                category: "Player move"
            },
            crouch: {
                descr: "Crouch",
                category: "Player move"
            },
            up: {
                descr: "Up",
                category: "Player move"
            }
        }
    };

    //use audio ?
    var useAudio = true;

    //instead of looping the songs should we just play the first 5 seconds?
    gamepres.fadeSongs = true;

    /*======== CLASSES =========*/

    //a game class that stores game info that other classes should have access to
    var Game = function (options) {

        //create a game object
        var that = {
            target: {},
            levels: [],
            title: 'Gamepres Presentation',
            canvas: {},
            images: [
                {
                    name: 'player_sprite_1',
                    image:'sprites/player_sprite_1.png'
                },
                {
                    name: 'player_sprite_2',
                    image:'sprites/player_sprite_2.png'
                },
                {
                    name: 'player_sprite_3',
                    image:'sprites/player_sprite_3.png'
                },
                {
                    name: 'player_sprite_4',
                    image:'sprites/player_sprite_4.png'
                },
                {
                    name: 'door',
                    image:'sprites/door.png'
                },
                {
                    name: 'fireball',
                    image:'gameimages/fireball.png'
                },
                {
                    name: 'fireball_white',
                    image:'gameimages/fireball_white.png'
                },
                {
                    name: 'fireball_black',
                    image:'gameimages/fireball_black.png'
                },
                {
                    name: 'apple',
                    image:'gameimages/apple.png'
                },
                {
                    name: 'mushroom',
                    image:'gameimages/mushroom.png'
                },
                {
                    name: 'flower',
                    image:'gameimages/flower.png'
                },
                {
                    name: 'question',
                    image:'gameimages/question.png'
                },
                {
                    name: 'block_busted',
                    image:'gameimages/block_busted.png'
                },
                {
                    name: 'block_metal',
                    image:'gameimages/block_metal.png'
                },
                {
                    name: 'fiscal',
                    image:'gameimages/fiscal.png'
                }
            ],
            sounds: [
                {id: "breakblock", url: "sounds/breakblock.wav"},
                {id: "mushroom", url: "sounds/mushroom.wav"},
                {id: "coin", url: "sounds/coin.wav"},
                {id: "levelclear", url: "sounds/levelclear.wav"},
                {id: "enterlevel", url: "sounds/enterlevel.wav"},
                {id: "pause", url: "sounds/pause.wav"},
                {id: "match", url: "sounds/match.wav"},
                {id: "jump", url: "sounds/jump.wav"},
                {id: "fireball", url: "sounds/fireball.wav"},
                {id: "powerup", url: "sounds/powerup.wav"},
                {id: "damage", url: "sounds/damage.wav"},
                {id: "enterdoor", url: "sounds/enterdoor.wav"},
                {id: "powerdown", url: "sounds/powerdown.wav"},
                {id: "world1", url: "sounds/world1.wav"},
                {id: "world2", url: "sounds/world2.wav"},
                {id: "airship", url: "sounds/airship.wav"},
                {id: "menu", url: "sounds/menu.wav"},
                {id: "bump", url: "sounds/bump.wav"}
            ],
            tickMax:3, //todo move these counts to each object
            tickCount:0
        };

        $.extend(that, options);
        return that;
    };

    //level class
    var Level = function (configs) {

        //factory style passback
        var that = {};

        //defaults
        var defaults = {};

        //merge in the incoming configs
        that.configs = $.extend({}, defaults, configs);

        //each level has an array of horizontaly loaded stages (think columns)
        that.stages = that.configs['stages'] || [];

        //start not finished
        that.finished = false;
        that.finishedCount = 0;

        //return the new level
        return that;
    };


    /*======== PUBLIC API =========*/

    gamepres.addLevel = function (obj) {
        levels.push(Level(obj));
    };

    gamepres.clearLevels = function () {
        levels = [];
    };

    //initialize the game
    gamepres.initialize = function (title_in, target_in, levels_in) {

        //setup sound
        gamepres.audio.init();

        //wire up resizing
        $(window).resize(updateDimensions);

        //if levels were passed in add them
        if(levels_in){
            for(var i=0; i < levels_in.length; i++) {
                gamepres.addLevel(levels_in[i]);
            }
        }

        //create the game object
        currentGame = Game({
            target: target_in,
            title: title_in,
            levels: levels
        });

        //add some required styles to the target
        currentGame.target.css({'position':'relative'});

        //setup a loop to caption inpoot
        inpootOptions.mappings = gamepres.defaultMapping;
        inpootOptions.players = gamepres.defaultPlayers;
        inpoot.initialize(inpootOptions);

        //load images and start the game loop
        gamepres.assetLoader.loadImages(
            currentGame,
            function(done, total){
                //start the gameLoop
                if(done == total) {
                    requestAnimationFrame(mainGameLoop);
                }
            }
        );

        //load all needed sounds
        if(useAudio){
            gamepres.assetLoader.loadSounds(currentGame.sounds);
        }
    };


    /*======== LOGIC FOR SPECIAL COLLISIONS AND OBJECT INTERACTION =======*/

    var updateObjectsStack = [];

    //our handler for dealing with contacts
    var dealWithContact = function (player, obj) {

        switch (obj.m_userData.interactiveType) {

            case 'fireball':
                hitByFireball(player.m_userData.playerNum);
            break;

            case 'fire':
                if(players[player.m_userData.playerNum].type != "fire"){

                    gamepres.audio.play('powerup');
                    //update the player
                    changePlayerType(players[player.m_userData.playerNum], "fire");
                    //remove the fire flower
                    var removeFlower = function (){gamepres.physics.removeFixture(obj); removeObject(obj); };
                    updateObjectsStack.push(removeFlower);
                }
            break;

            case 'mushroom':
                if(players[player.m_userData.playerNum].type == "small"){

                    gamepres.audio.play('powerup');
                    //update the player
                    changePlayerType(players[player.m_userData.playerNum], "big");
                    //remove the shroom
                    var removeShroom = function (){gamepres.physics.removeFixture(obj); removeObject(obj);};
                    updateObjectsStack.push(removeShroom);
                }
            break;

            case 'apple':
                gamepres.audio.play('powerup');
                //update the player
                changePlayerType(players[player.m_userData.playerNum], "steve");
                //remove the shroom
                var removeApple = function (){gamepres.physics.removeFixture(obj); removeObject(obj);};
                updateObjectsStack.push(removeApple);
            break;

            case 'flower':
                if(players[player.m_userData.playerNum].type != "fire"){

                    gamepres.audio.play('powerup');
                    //update the player
                    changePlayerType(players[player.m_userData.playerNum], "fire");
                    //remove the shroom
                    var removeFlower = function (){gamepres.physics.removeFixture(obj); removeObject(obj);};
                    updateObjectsStack.push(removeFlower);
                }
            break;

            case 'coin':
                gamepres.audio.play('coin');

                activePlayers[player.m_userData.playerNum].stats.coins++;
                activePlayers[player.m_userData.playerNum].stats.changed = true;

                var removeCoin = function (){gamepres.physics.removeFixture(obj); removeObject(obj);};
                updateObjectsStack.push(removeCoin);
            break;

            case 'block':

                var yV = player.GetBody().GetLinearVelocity().y;
                if(yV < -4 && players[player.m_userData.playerNum].type != 'small'){

                    var blockPos = obj.GetBody().GetPosition();
                    var bPos = {x:blockPos.x, y:blockPos.y};

                    gamepres.audio.play('breakblock');

                    //kill the original block
                    var removeBlock = function (){gamepres.physics.removeFixture(obj); removeObject(obj);};
                    updateObjectsStack.push(removeBlock);

                    //pushout four broken temporary pieces
                    var addBlockUL = function (){
                        var UL = $.extend(true,{}, timedObjectDefaults.blockUL);
                        UL.pos = bPos;

                        var block = TimedObject(UL);
                        timedObjects[block.fixture.m_userData.bodyId] = {
                            obj: block,
                            fixture: block.fixture
                        };
                    };
                    var addBlockUR = function (){
                        var UR = $.extend(true,{}, timedObjectDefaults.blockUR);
                        UR.pos = bPos;

                        var block = TimedObject(UR);
                        timedObjects[block.fixture.m_userData.bodyId] = {
                            obj: block,
                            fixture: block.fixture
                        };
                    };
                    var addBlockLL = function (){
                        var LL = $.extend(true,{}, timedObjectDefaults.blockLL);
                        LL.pos = bPos;

                        var block = TimedObject(LL);
                        timedObjects[block.fixture.m_userData.bodyId] = {
                            obj: block,
                            fixture: block.fixture
                        };
                    };
                    var addBlockLR = function (){
                        var LR = $.extend(true,{}, timedObjectDefaults.blockLR);
                        LR.pos = bPos;

                        var block = TimedObject(LR);
                        timedObjects[block.fixture.m_userData.bodyId] = {
                            obj: block,
                            fixture: block.fixture
                        };
                    };

                    updateObjectsStack.push(addBlockUL);
                    updateObjectsStack.push(addBlockUR);
                    updateObjectsStack.push(addBlockLL);
                    updateObjectsStack.push(addBlockLR);

                } else if (yV < -4) {
                    gamepres.audio.play('bump');
                }

            break;

            case 'block_hidden_metal':

                var yV = player.GetBody().GetLinearVelocity().y;
                if(yV < -4 && players[player.m_userData.playerNum].type != 'small'){

                    var blockPos = obj.GetBody().GetPosition();
                    var bPos = {x:blockPos.x, y:blockPos.y};
                    var currentImage = stageObjects[obj.m_userData.bodyId].obj.image.name;

                    if(currentImage != "block_metal"){

                        gamepres.audio.play('breakblock');
                        stageObjects[obj.m_userData.bodyId].obj.image.name = "block_metal";

                        //pushout four broken temporary pieces
                        var addBlockUL = function (){
                            var UL = $.extend(true,{}, timedObjectDefaults.blockUL);
                            UL.pos = bPos;

                            var block = TimedObject(UL);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };
                        var addBlockUR = function (){
                            var UR = $.extend(true,{}, timedObjectDefaults.blockUR);
                            UR.pos = bPos;

                            var block = TimedObject(UR);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };
                        var addBlockLL = function (){
                            var LL = $.extend(true,{}, timedObjectDefaults.blockLL);
                            LL.pos = bPos;

                            var block = TimedObject(LL);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };
                        var addBlockLR = function (){
                            var LR = $.extend(true,{}, timedObjectDefaults.blockLR);
                            LR.pos = bPos;

                            var block = TimedObject(LR);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };

                        updateObjectsStack.push(addBlockUL);
                        updateObjectsStack.push(addBlockUR);
                        updateObjectsStack.push(addBlockLL);
                        updateObjectsStack.push(addBlockLR);
                    }

                } else if (yV < -4) {
                    gamepres.audio.play('bump');
                }

            break;


            case 'block_power_up':

                var yV = player.GetBody().GetLinearVelocity().y;
                if(yV < -4){

                    var blockPos = obj.GetBody().GetPosition();
                    var bPos = {x:blockPos.x, y:blockPos.y - gamepres.physics.scale(40)};
                    var currentImage = stageObjects[obj.m_userData.bodyId].obj.image.name;

                    if(currentImage != "block_metal"){

                        gamepres.audio.play('bump');
                        setTimeout(function(){
                            gamepres.audio.play('mushroom');
                        }, 50);

                        stageObjects[obj.m_userData.bodyId].obj.image.name = "block_metal";

                        if(players[player.m_userData.playerNum].type == "small") {

                            var addShroom = function (){
                                var shrm = $.extend(true,{}, timedObjectDefaults.shroom);
                                shrm.pos = bPos;

                                //lets create a little randomness
                                shrm.initialImpulse.angle = Math.round(shrm.initialImpulse.angle + Math.random() * 20 - 10);
                                shrm.initialImpulse.power = shrm.initialImpulse.power + Math.random() * 5;

                                var shroom = TimedObject(shrm);

                                timedObjects[shroom.fixture.m_userData.bodyId] = {
                                    obj: shroom,
                                    fixture: shroom.fixture
                                };
                            };

                            updateObjectsStack.push(addShroom);

                        } else {

                            var addFire = function (){
                                var fireFlower = $.extend(true,{}, timedObjectDefaults.fire);
                                fireFlower.pos = bPos;

                                //lets create a little randomness
                                fireFlower.initialImpulse.angle = Math.round(fireFlower.initialImpulse.angle + Math.random() * 20 - 10);
                                fireFlower.initialImpulse.power = fireFlower.initialImpulse.power + Math.random() * 5;

                                var fireF = TimedObject(fireFlower);

                                timedObjects[fireF.fixture.m_userData.bodyId] = {
                                    obj: fireF,
                                    fixture: fireF.fixture
                                };
                            };

                            updateObjectsStack.push(addFire);
                        }

                        //pushout four broken temporary pieces
                        var addBlockUL = function (){
                            var UL = $.extend(true,{}, timedObjectDefaults.blockUL);
                            UL.pos = bPos;

                            var block = TimedObject(UL);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };
                        var addBlockUR = function (){
                            var UR = $.extend(true,{}, timedObjectDefaults.blockUR);
                            UR.pos = bPos;

                            var block = TimedObject(UR);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };
                        var addBlockLL = function (){
                            var LL = $.extend(true,{}, timedObjectDefaults.blockLL);
                            LL.pos = bPos;

                            var block = TimedObject(LL);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };
                        var addBlockLR = function (){
                            var LR = $.extend(true,{}, timedObjectDefaults.blockLR);
                            LR.pos = bPos;

                            var block = TimedObject(LR);
                            timedObjects[block.fixture.m_userData.bodyId] = {
                                obj: block,
                                fixture: block.fixture
                            };
                        };

                        updateObjectsStack.push(addBlockUL);
                        updateObjectsStack.push(addBlockUR);
                        updateObjectsStack.push(addBlockLL);
                        updateObjectsStack.push(addBlockLR);
                    }

                } else if (yV < -4) {
                    gamepres.audio.play('bump');
                }

            break;

            case 'question_power_up':

                var yV = player.GetBody().GetLinearVelocity().y;
                if(yV < -4){

                    var blockPos = obj.GetBody().GetPosition();
                    var bPos = {x:blockPos.x, y:blockPos.y - gamepres.physics.scale(40)};
                    var currentImage = stageObjects[obj.m_userData.bodyId].obj.image.name;

                    if(currentImage != "block_metal"){

                        gamepres.audio.play('bump');
                        setTimeout(function(){
                            gamepres.audio.play('mushroom');
                        }, 50);

                        stageObjects[obj.m_userData.bodyId].obj.image.name = "block_metal";

                        if(players[player.m_userData.playerNum].type == "small") {

                            var addShroom = function (){
                                var shrm = $.extend(true,{}, timedObjectDefaults.shroom);
                                shrm.pos = bPos;

                                //lets create a little randomness
                                shrm.initialImpulse.angle = Math.round(shrm.initialImpulse.angle + Math.random() * 20 - 10);
                                shrm.initialImpulse.power = shrm.initialImpulse.power + Math.random() * 5;

                                var shroom = TimedObject(shrm);

                                timedObjects[shroom.fixture.m_userData.bodyId] = {
                                    obj: shroom,
                                    fixture: shroom.fixture
                                };
                            };

                            updateObjectsStack.push(addShroom);

                        } else {

                            var addFire = function (){
                                var fireFlower = $.extend(true,{}, timedObjectDefaults.fire);
                                fireFlower.pos = bPos;

                                //lets create a little randomness
                                fireFlower.initialImpulse.angle = Math.round(fireFlower.initialImpulse.angle + Math.random() * 20 - 10);
                                fireFlower.initialImpulse.power = fireFlower.initialImpulse.power + Math.random() * 5;

                                var fireF = TimedObject(fireFlower);

                                timedObjects[fireF.fixture.m_userData.bodyId] = {
                                    obj: fireF,
                                    fixture: fireF.fixture
                                };
                            };

                            updateObjectsStack.push(addFire);
                        }
                    }

                } else if (yV < -4) {
                    gamepres.audio.play('bump');
                }

            break;

            case 'question_apple_up':

                var yV = player.GetBody().GetLinearVelocity().y;
                if(yV < -4){

                    var blockPos = obj.GetBody().GetPosition();
                    var bPos = {x:blockPos.x, y:blockPos.y - gamepres.physics.scale(40)};
                    var currentImage = stageObjects[obj.m_userData.bodyId].obj.image.name;

                    if(currentImage != "block_metal"){

                        gamepres.audio.play('bump');
                        setTimeout(function(){
                            gamepres.audio.play('mushroom');
                        }, 50);

                        stageObjects[obj.m_userData.bodyId].obj.image.name = "block_metal";

                            var addApple = function (){
                                var apple = $.extend(true,{}, timedObjectDefaults.apple);
                                apple.pos = bPos;

                                //lets create a little randomness
                                apple.initialImpulse.angle = Math.round(apple.initialImpulse.angle + Math.random() * 20 - 10);
                                apple.initialImpulse.power = apple.initialImpulse.power + Math.random() * 5;

                                var appleObj = TimedObject(apple);

                                timedObjects[appleObj.fixture.m_userData.bodyId] = {
                                    obj: appleObj,
                                    fixture: appleObj.fixture
                                };
                            };

                            updateObjectsStack.push(addApple);
                    }

                } else if (yV < -4) {
                    gamepres.audio.play('bump');
                }

            break;
        }
    };

    //our listener for contact between objects
    var onBeginContact = function (contact) {
        if(contact.m_fixtureA.m_userData && contact.m_fixtureB.m_userData){

            if(contact.m_fixtureA.m_userData.isPlayer && contact.m_fixtureB.m_userData.isInteractive){
                dealWithContact(contact.m_fixtureA, contact.m_fixtureB, contact);
            }
            if(contact.m_fixtureA.m_userData.isInteractive && contact.m_fixtureB.m_userData.isPlayer){
                dealWithContact(contact.m_fixtureB, contact.m_fixtureA, contact);
            }
        }
    };

    var onPreSolve = function (contact, oldManifold) {
        if(
            contact.m_fixtureA.m_userData && contact.m_fixtureA.m_userData.pass ||
            contact.m_fixtureB.m_userData && contact.m_fixtureB.m_userData.pass
        ){
            contact.SetEnabled(false);
        }
    };

    //player hit by fireball
    var hitByFireball = function (playerNum) {
        if(players[playerNum].type == "fire" || players[playerNum].type == "steve"){
            gamepres.audio.play('powerdown');
            changePlayerType(players[playerNum], "big");
        } else if (players[playerNum].type == "big"){
            gamepres.audio.play('powerdown');
            changePlayerType(players[playerNum], "small");
        } else {
            gamepres.audio.play('damage');
        }
    };


    /*======== PRIVATE LEVEL LOADING / INITIALIZE PLAYER AND OBJECTS / PARALLAX SETUP =======*/

    var loadLevel = function (levelNum) {

        if(currentGame.currentSong){
            gamepres.audio.stop(currentGame.currentSong);
            currentGame.currentSong = false;
        }

        //set the currentLevelNum
        currentLevelNum = levelNum;

        //set the game loop mode
        gameMode = "play";

        //load the level
        currentLevel = gamepres.levelLoader.loadLevel(currentGame, currentLevelNum);

        currentLevel.finished = false;
        currentLevel.finishedCount = 0;

        //back to the beginning
        physicsoffset = 0;
        offset = 0;

        //draw the general markup and size it accordingly
        gamepres.graphics.drawMarkup(currentGame, currentLevel, offset);
        gamepres.graphics.updateMarkup(currentGame, currentLevel, offset);

        //trigger a resize
        updateDimensions();
        setTimeout(updateDimensions,1);

        //set up the physics
        gamepres.physics.initializeWorld(currentGame.canvas, currentGame.totalWidth, currentGame.height, {BeginContact: onBeginContact, PreSolve: onPreSolve});

        //add the player stats markup
        $.tmpl('gamepres-player-stats').appendTo(currentGame.target);
        updatePlayerStats(1, true);

        //load the physics objects
        stageObjects = {};
        timedObjects = {};
        loadStageObjects();

        //setup the players positions
        players = {};
        for(var playerNum in activePlayers) {
            addActivePlayer(playerNum);
        }

        //is there music?
        if(currentLevel.song){
            gamepres.audio.play(currentLevel.song, {loop:true});
            currentGame.currentSong = currentLevel.song;

            //if we only want to listen to the first part... start fading it out
            if(gamepres.fadeSongs){
                gamepres.audio.stop(currentLevel.song, {fade:10});
            }
        }

        //start the game loop
        mainGameLoop();
    };


    /*======= STAGE OBJECTS AND TIMED OBJECTS =======*/

    var stageObjects = {};
    var timedObjects = {};

        //some default timedObject defaults
    var timedObjectDefaults = {
        fireball_black : {
            scaled:true,
            imageName:'fireball_black',
            initialImpulse : {
                power: 1.5,
                angle: 0,
                torque: 200
            },
            type:'circ',
            props : {
                restitution:1,
                density: 0.1,
                friction: 0.5,
                userData: {
                    isInteractive:true,
                    interactiveType: 'fireball'
                }
            }
        },
        fireball_white : {
            scaled:true,
            imageName:'fireball_white',
            initialImpulse : {
                power: 1.5,
                angle: 0,
                torque: 200
            },
            type:'circ',
            props : {
                restitution:1,
                density: 0.1,
                friction: 0.5,
                userData: {
                    isInteractive:true,
                    interactiveType: 'fireball'
                }
            }
        },
        fireball : {
            scaled:true,
            imageName:'fireball',
            initialImpulse : {
                power: 400,
                angle: 0,
                torque: 200
            },
            type:'circ',
            props : {
                restitution:0.8,
                density: 40,
                friction: 0.5,
                userData: {
                    isInteractive:true,
                    interactiveType: 'fireball'
                }
            }
        },
        blockUL : {
            lifespan: 100,
            scaled:true,
            imageName:'block_busted',
            initialImpulse : {
                power: 0.07,
                angle: -110,
                torque: 5
            },
            type:'circ',
            props : {
                restitution:0.9,
                density: 0.01,
                friction: 0,
                userData: {
                    isInteractive:false,
                    interactiveType: false
                }
            }
        },
        blockUR : {
            lifespan: 90,
            scaled:true,
            imageName:'block_busted',
            initialImpulse : {
                power: 0.07,
                angle: -70,
                torque: 5
            },
            type:'circ',
            props : {
                restitution:0.9,
                density: 0.01,
                friction: 0,
                userData: {
                    isInteractive:false,
                    interactiveType: false
                }
            }
        },
        blockLL : {
            lifespan: 120,
            scaled:true,
            imageName:'block_busted',
            initialImpulse : {
                power: 0.07,
                angle: -135,
                torque: 5
            },
            type:'circ',
            props : {
                restitution:0.9,
                density: 0.01,
                friction: 0,
                userData: {
                    isInteractive:false,
                    interactiveType: false
                }
            }
        },
        blockLR : {
            lifespan: 100,
            scaled:true,
            imageName:'block_busted',
            initialImpulse : {
                power: 0.07,
                angle: -45,
                torque: 5
            },
            type:'circ',
            props : {
                restitution:0.9,
                density: 0.01,
                friction: 0,
                userData: {
                    isInteractive:false,
                    interactiveType: false
                }
            }
        },
        shroom : {
            lifespan: 800,
            scaled:true,
            imageName:'mushroom',
            initialImpulse : {
                power: 0.8,
                angle: -90,
                torque: 20
            },
            type:'rect',
            props : {
                restitution:0.0,
                density: 0.1,
                friction: 0,
                userData: {
                    isInteractive:true,
                    interactiveType: 'mushroom',
                    noRotate: true
                }
            }
        },
        fire : {
            lifespan: 800,
            scaled:true,
            imageName:'flower',
            initialImpulse : {
                power: 0.8,
                angle: -90,
                torque: 20
            },
            type:'rect',
            props : {
                restitution:0.0,
                density: 0.1,
                friction: 0,
                userData: {
                    isInteractive:true,
                    interactiveType: 'flower',
                    noRotate: true
                }
            }
        },
        apple : {
            lifespan: 1200,
            scaled:true,
            imageName:'apple',
            initialImpulse : {
                power: 0.8,
                angle: -90,
                torque: 20
            },
            type:'rect',
            props : {
                restitution:0.0,
                density: 0.1,
                friction: 0,
                userData: {
                    isInteractive:true,
                    interactiveType: 'apple',
                    noRotate: true
                }
            }
        }
    };

    //timed object (these are physics objects that are temporary)
    var TimedObject = function (configs) {

        //factory style passback
        var that = {};

        //defaults
        var defaults = {
            scaled: true,
            lifespan: 300,
            lifetime: 0,
            imageName:'',
            image: {},
            pos: {x:0,y:0},
            fixture: {},
            initialImpulse : {
                power: 4,
                angle:0,
                torque:0
            },
            width:0,
            height:0,
            type:'circ',
            props : {
                restitution:1.0,
                density: 2,
                friction: 0
            }
        };

        //pass in true to merge deep
        $.extend(true, that, defaults, configs);

        //and get the image and image data
        that.image = gamepres.assetLoader.images[that.imageName];
        that.image.name = that.imageName;
        that.width = that.image.width;
        that.height = that.image.height;

        //add the fixture
        if(that.type == 'circ') {
            that.fixture = gamepres.physics.addDynamicCirc(
                that.pos.x,
                that.pos.y,
                gamepres.physics.scale(that.width),
                that.props
            );
        } else {
            that.fixture = gamepres.physics.addDynamicRect(
                that.pos.x,
                that.pos.y,
                gamepres.physics.scale(that.width),
                gamepres.physics.scale(that.height),
                that.props
            );
        }

        //add the initial impulse
        gamepres.physics.applyImpulse(that.fixture.GetBody(), that.initialImpulse.angle, that.initialImpulse.power);

        //add rotational force
        gamepres.physics.applyTorque(that.fixture.GetBody(), that.initialImpulse.torque);

        return that;
    };

    var updateTimedObjects = function () {
        for(var to in timedObjects){
            if(timedObjects[to].obj.lifespan){
                timedObjects[to].obj.lifetime++;
                if(timedObjects[to].obj.lifetime > timedObjects[to].obj.lifespan){
                    gamepres.physics.removeFixture(timedObjects[to].fixture);
                    delete timedObjects[to];
                }
            }
        }
    };

    var loadStageObjects = function () {

        stageObjects = {};

        var bodyOffsetY = function (obj) {
            return obj.y + obj.image.height / 2;
        };

        for(var stage in currentLevel.objects){

            var stageNum = parseInt(stage);
            var centerBottomWorld = {x: (currentGame.width/2) + stage * currentGame.width, y:currentGame.height};

            for(var i=0; i < currentLevel.objects[stage].length; i++){

                //here we need to make a copy of the original level object
                var obj = $.extend(true, {}, currentLevel.objects[stage][i]);

                //then determine which type of object to add
                if(obj.type == "rect") {

                    var fixture;
                    if(obj.physicsType && obj.physicsType == 'static'){
                        fixture = gamepres.physics.addStaticRect(
                            gamepres.physics.scale(centerBottomWorld.x + obj.x),
                            gamepres.physics.scale(centerBottomWorld.y - bodyOffsetY(obj)),
                            gamepres.physics.scale(gamepres.assetLoader.images[obj.image.name].width),
                            gamepres.physics.scale(gamepres.assetLoader.images[obj.image.name].height),
                            obj.props
                        );
                    } else {
                        fixture = gamepres.physics.addDynamicRect(
                            gamepres.physics.scale(centerBottomWorld.x + obj.x),
                            gamepres.physics.scale(centerBottomWorld.y - bodyOffsetY(obj)),
                            gamepres.physics.scale(gamepres.assetLoader.images[obj.image.name].width),
                            gamepres.physics.scale(gamepres.assetLoader.images[obj.image.name].height),
                            obj.props
                        );
                    }

                    var newRect = {
                        obj: obj,
                        fixture: fixture
                    };
                    stageObjects[newRect.fixture.m_userData.bodyId] = newRect;

                } else if (obj.type == "circ") {

                    var fixture;
                    if(obj.physicsType && obj.physicsType == 'static'){
                        fixture = gamepres.physics.addStaticCirc(
                            gamepres.physics.scale(centerBottomWorld.x + obj.x),
                            gamepres.physics.scale(centerBottomWorld.y - bodyOffsetY(obj)),
                            gamepres.physics.scale(gamepres.assetLoader.images[obj.image.name].width),
                            obj.props
                        );
                    } else {
                        fixture = gamepres.physics.addDynamicCirc(
                            gamepres.physics.scale(centerBottomWorld.x + obj.x),
                            gamepres.physics.scale(centerBottomWorld.y - bodyOffsetY(obj)),
                            gamepres.physics.scale(gamepres.assetLoader.images[obj.image.name].width),
                            obj.props
                        );
                    }

                    var newCirc = {
                        obj: obj,
                        fixture: fixture
                    };
                    stageObjects[newCirc.fixture.m_userData.bodyId] = newCirc;
                }
            }
        }
    };

    //remove the object from our internal registry (so we don't keep drawling it)
    var removeObject = function (fixture) {
        if(stageObjects[fixture.m_userData.bodyId]){
            delete stageObjects[fixture.m_userData.bodyId];
        } else if (timedObjects[fixture.m_userData.bodyId]) {
            delete timedObjects[fixture.m_userData.bodyId];
        }
    };


    /*======== GAME LOOP / PHYSICS / RESIZING =======*/

    var transformY = function (y) {
        return (currentGame.height - y + 2 * gamepres.levelLoader.punit);
    };

    var changePlayerType = function (player, type) {

        activePlayers[player.playerNum].stats.type = type;

        //height and density
        var height = type == "small" ? 15 : 27;
        var density = type == "small" ? 2.0 : 1.0;

        //change the height and type
        player.type = type;
        player.height = height;

        player.fixture.height = gamepres.physics.scale(player.height);

        //change the density and size
        player.fixture.GetBody().GetFixtureList().SetDensity(density);
        player.fixture.GetBody().GetFixtureList().GetShape().SetAsBox(player.fixture.width/2, player.fixture.height/2);
        player.fixture.GetBody().ResetMassData();
    };

    //add active player and give physics based info
    var addActivePlayer = function (playerNum, offset, x, y) {

        offset = offset || 0;

        var defaultProps = {};

        var props = $.extend({}, defaultProps);

        var playerType = activePlayers[playerNum] && activePlayers[playerNum].stats ? activePlayers[playerNum].stats.type : 'small';

        x = x || gamepres.physics.scale(50 * playerNum + BUMPER_SIZE + offset);
        y = y || gamepres.physics.scale(200);
        var type = playerType;

        var height = type == "small" ? 15 : 27;
        var density = type == "small" ? 2.0 : 1.0;
        offset = offset || 0;

        var newPlayer = {
            x: x,
            y: y,
            density: density,
            playerNum: playerNum,
            type: type,
            height: height,
            width: 16,
            state: 'stand',
            direction: 'right',
            chargedJump:0,
            frame: 0
        };

        newPlayer.fixture = gamepres.physics.addDynamicRect(newPlayer.x, newPlayer.y, gamepres.physics.scale(newPlayer.width), gamepres.physics.scale(newPlayer.height), {restitution:0.0, density: density, userData:{playerNum:playerNum, isPlayer:true} });
        newPlayer.fixture.GetBody().SetLinearDamping(0.25);
        newPlayer.fixture.width = gamepres.physics.scale(newPlayer.width);
        newPlayer.fixture.height = gamepres.physics.scale(newPlayer.height);
        players[playerNum]= newPlayer;
    };

    //game loop
    var mainGameLoop = function () {

        //get a snapshot of game inputs
        inpoot.tick();

        currentGame.tickCount = (currentGame.tickCount + 1) % currentGame.tickMax;

        //do they need to open the menu to select a new level?
        if(inpoot.action('start').pressed) {

            //store the old game mode
            var lastGameMode = gameMode;

            //stop the regular game loop by switching gameModes
            gameMode = "menu";

            //hide any intro markup
            $('.presentation-intro').hide();

            //open up the menu
            if(currentGame.currentSong){
                gamepres.audio.stop(currentGame.currentSong);
            }
            gamepres.levelSelector.openMenu({
                game: currentGame,
                currentLevelNum: currentLevelNum,
                onSelect: loadLevel,
                onCancel: function(){
                    //do we have a song?
                    if(currentGame.currentSong){
                        gamepres.audio.play(currentGame.currentSong, {loop:true});
                    }
                    //just go back to normal loopage
                    gameMode = lastGameMode;
                    $('.presentation-intro').stop(true,true).show();
                    mainGameLoop();
                }
            });
        }

        //check other normal inputs

        //update physics
        updatePlayers();

        //check on timed objects
        updateTimedObjects();

        //did we change levels?
        if(currentLevel.finished){
            currentLevel.finishedCount = currentLevel.finishedCount + 1;
            if(currentLevel.finishedCount == 1){
                if(currentGame.currentSong){
                    gamepres.audio.stop(currentGame.currentSong);
                }
                setTimeout(function(){
                    gamepres.audio.play('enterdoor');
                    setTimeout(function(){gamepres.audio.play('levelclear');}, 500);
                }, 200);
            }
            if(currentLevel.finishedCount == 100) {
                gameMode = "finished";
                setTimeout(function(){
                    var totalLevels = currentGame.levels.length;
                    currentLevelNum = Math.min(currentLevelNum + 1, totalLevels-1);
                    loadLevel(currentLevelNum);
                }, 2500);
            }
        }

        //redraw if we are playing
        if(gameMode == "play"){

            //let the physics go
            gamepres.physics.tick();

            //then go back and update objects based off of collision
            for(var k=0; k < updateObjectsStack.length; k++){
                updateObjectsStack[k]();
            }
            updateObjectsStack = [];

            gamepres.graphics.drawBackground(currentGame, currentLevel);
            gamepres.graphics.drawParallax(currentGame, offset, currentLevel.parallaxImages);
            gamepres.graphics.drawDoor(currentGame, currentLevel, offset);
            gamepres.graphics.drawObjects(currentGame, currentLevel, offset, stageObjects);
            gamepres.graphics.drawObjects(currentGame, currentLevel, offset, timedObjects);
            gamepres.graphics.drawPlayers(currentGame, currentLevel, offset, players);
            gamepres.graphics.updateMarkup(currentGame, currentLevel, offset);

            if(drawBox2DDebug){
                gamepres.physics.debug();
            }
        }

        //if we are in the none or play mode then just keep looping
        if(gameMode == "none" || gameMode == "play"){
            requestAnimationFrame(mainGameLoop);
        }
    };

    var maxSpeedChange = 0.5;
    var maxSpeed = 4;
    var maxSpeedRunning = 8;
    var jumpSpeed = 40;

    var updatePlayerStats = function (ply, force) {
        if(activePlayers[ply].stats.changed || force){
            $('.gamepres-player-count').html('x ' + activePlayers[ply].stats.coins);
            activePlayers[ply].stats.changed = false;
        }
    };

    var updatePlayers = function () {

        var theBottom = 2 * gamepres.levelLoader.punit;

        //first we need to make sure they are all in view
        var playerMin = 99999999;
        var playerMax = -999999;
        for(var ply in players){
            playerMin = Math.min(playerMin, players[ply].fixture.GetBody().GetPosition().x);
            playerMax = Math.max(playerMax, players[ply].fixture.GetBody().GetPosition().x);
        }

        var diff = (playerMax-playerMin) - gamepres.physics.scale(currentGame.width - 2 * BUMPER_SIZE);

        for(var ply in players){

            var player = players[ply];
            var skidFactor = 1;
            var skidding = false;

            updatePlayerStats(ply);

            var UP = inpoot.action('up', ply).val;
            var WARPLEFT_PRESSED = inpoot.action('warpLeft', ply).pressed;
            var WARPRIGHT_PRESSED = inpoot.action('warpRight', ply).pressed;
            var CROUCH = inpoot.action('crouch', ply).val;
            var MOVERIGHT = inpoot.action('moveRight', ply).val;
            var MOVELEFT = inpoot.action('moveLeft', ply).val;
            var RUNNING = inpoot.action('run', ply).val;
            var JUMP = inpoot.action('jump', ply).val;
            var JUMP_PRESSED = inpoot.action('jump', ply).pressed;
            var KICKED = inpoot.action('kick', ply).pressed;

            var somethingBelow = gamepres.physics.somethingBelow(player.fixture, player.playerNum);
            var traction = Math.max(0.5, somethingBelow);

            //players should always be upright
            player.fixture.GetBody().SetAngle(0);

            if(UP && player.fixture.GetBody().GetPosition().x > gamepres.physics.scale(currentGame.totalWidth - 255) && player.fixture.GetBody().GetPosition().x < gamepres.physics.scale(currentGame.totalWidth - 228) ){
                if(somethingBelow){
                    currentLevel.finished = true;
                }
            }

            //if we try to warp
            if((WARPLEFT_PRESSED || WARPRIGHT_PRESSED) && !currentLevel.finished) {

                var currentStage = Math.round(offset / currentGame.width);
                var totalStages = currentLevel.stages.length;
                if(WARPLEFT_PRESSED){
                    currentStage = Math.max(0, currentStage-1);
                } else {
                    currentStage = Math.min(totalStages-1, currentStage+1);
                }

                physicsoffset = gamepres.physics.scale(currentGame.width * currentStage);
                offset = gamepres.physics.unscale(physicsoffset);
                for(var ply2 in players){
                    var newX = gamepres.physics.scale(BUMPER_SIZE + 50 * parseInt(ply2) + currentStage * currentGame.width);
                    var newY = players[ply2].fixture.GetBody().GetPosition().y;
                    players[ply2].fixture.GetBody().SetPosition(new b2Vec2(newX, newY));
                    players[ply2].fixture.GetBody().SetAwake(true);
                }
            }

            //if we aren't crouched we can run
            if(!CROUCH && !currentLevel.finished) {

                var tryingDir = false;

                if(MOVERIGHT){
                    gamepres.physics.applyImpulse(player.fixture.GetBody(), 0, (1.5 + RUNNING * 1.2) * traction);
                    tryingDir = 'right';
                }

                if(MOVELEFT){
                    gamepres.physics.applyImpulse(player.fixture.GetBody(), 180, (1.5 + RUNNING * 1.2) * traction);
                    tryingDir = 'left';
                }

                var xVelocity = Math.abs(player.fixture.GetBody().GetLinearVelocity().x) > 0.01 ? player.fixture.GetBody().GetLinearVelocity().x : 0;

                if(xVelocity > 0.3){
                    player.direction = 'right';
                } else if (xVelocity < -0.3) {
                    player.direction = 'left';
                }

                player.x_old = player.x;
                player.y_old = player.y;

                if (tryingDir == "right" && player.direction == "left" || tryingDir == "left" && player.direction == "right") {
                    player.state = 'skid';
                } else if (xVelocity === 0 && currentGame.tickCount === 0) {
                    player.state = 'stand';
                } else if (currentGame.tickCount === 0 && currentGame.tickCount === 0) {
                    player.state = player.state == 'walk_1' ? 'walk_2' : 'walk_1';
                }
            }

            if(!currentLevel.finished) {

                player.x = gamepres.physics.unscale(player.fixture.GetBody().GetPosition().x) - Math.round(player.width/2);
                player.y = transformY(gamepres.physics.unscale(player.fixture.GetBody().GetPosition().y) + Math.round(player.height/2));

                var diffRight = player.fixture.GetBody().GetPosition().x - gamepres.physics.scale(offset + currentGame.width - BUMPER_SIZE);
                var diffLeft = player.fixture.GetBody().GetPosition().x - gamepres.physics.scale(offset + BUMPER_SIZE);

                if(diffRight > 0){
                    if(diff > 0 && player.fixture.GetBody().GetPosition().x == playerMax){
                        player.fixture.GetBody().SetPosition(new b2Vec2(player.fixture.GetBody().GetPosition().x - diff, player.fixture.GetBody().GetPosition().y));
                    } else {
                        physicsoffset = physicsoffset + diffRight;
                    }
                }
                if(diffLeft < 0){
                    if(diff > 0 && player.fixture.GetBody().GetPosition().x == playerMin){
                        player.fixture.GetBody().SetPosition(new b2Vec2(player.fixture.GetBody().GetPosition().x + diff, player.fixture.GetBody().GetPosition().y));
                    } else {
                        physicsoffset = physicsoffset + diffLeft;
                    }
                }

                physicsoffset = Math.max(0, Math.min(physicsoffset, gamepres.physics.scale(currentGame.totalWidth - currentGame.width) ));
                offset = gamepres.physics.unscale(physicsoffset);

                if(somethingBelow) {
                    player.jumped = false;

                    if(JUMP){
                        player.chargedJump = Math.min(player.chargedJump + 0.1, 1);
                    }

                    if(JUMP_PRESSED){
                        gamepres.physics.applyImpulse(player.fixture.GetBody(), -90, jumpSpeed + jumpSpeed * player.chargedJump);
                        player.jumped = true;
                        player.chargedJump = 0;
                        gamepres.audio.play('jump', {gain:0.7});
                    }

                } else {
                    if(player.jumped){
                        player.state = 'jump';
                    }
                }

                if(CROUCH){

                    player.state = 'crouch';

                } else if (KICKED && (player.type == "fire" || player.type == "steve") ) {

                    player.state = 'kick';
                    gamepres.audio.play('fireball');

                    var fireballConfigs = $.extend(true,{}, timedObjectDefaults.fireball);
                    var imageUsed = gamepres.assetLoader.images['fireball'];
                    if(player.type == "steve"){
                        if(Math.round(Math.random() *1)){
                            fireballConfigs = $.extend(true,{}, timedObjectDefaults.fireball_white);
                            imageUsed = gamepres.assetLoader.images['fireball_white'];
                        } else {
                            fireballConfigs = $.extend(true,{}, timedObjectDefaults.fireball_black);
                            imageUsed = gamepres.assetLoader.images['fireball_black'];
                        }
                    }

                    if(player.direction == 'left') {
                        fireballConfigs.pos = {
                            x: player.fixture.GetBody().GetPosition().x -
                                gamepres.physics.scale(player.fixture.width) -
                                2.25 * gamepres.physics.scale(imageUsed.width),
                            y: player.fixture.GetBody().GetPosition().y
                        };

                        fireballConfigs.initialImpulse.angle = 225;

                    } else {
                        fireballConfigs.pos = {
                            x: player.fixture.GetBody().GetPosition().x +
                                gamepres.physics.scale(player.fixture.width) +
                                2.25 * gamepres.physics.scale(imageUsed.width),
                            y: player.fixture.GetBody().GetPosition().y
                        };

                        fireballConfigs.initialImpulse.angle = -45;
                    }

                    var fireball = TimedObject(fireballConfigs);

                    timedObjects[fireball.fixture.m_userData.bodyId] = {
                        obj: fireball,
                        fixture: fireball.fixture
                    };
                }
            }
        }
    };

    /*======== TEMPLATES =======*/

    $.template('gamepres-player-stats', [
        '<div id="gamepres-player-stats" class="itsame">',
            '<span class="gamepres-player-name">PLAYER :</span>',
            '<span class="gamepres-player-coin"></span>',
            '<span class="gamepres-player-count">x 0</span>',
        '</div>'
    ].join(''));


    /*======== DEFAULT INPOOT MAPPINGS =======*/

    gamepres.defaultMapping = [{"name":"Keybaord","extra":"","gamepad":false,"keyboard":"true","mouse":"false","id":0,"mapping":{"left":{"descr":"Previous Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Left","value":"37"}]}]},"right":{"descr":"Next Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Right","value":"39"}]}]},"start":{"descr":"Start","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Enter","value":"13"}]}]},"selectLevel":{"descr":"Select Level (enter)","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Enter","value":"13"}]}]},"exit":{"descr":"Exit Menu","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Esc","value":"27"}]}]},"warpLeft":{"descr":"Warp left a stage","category":"Stage warp","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":",<","value":"188"}]}]},"warpRight":{"descr":"Warp right a stage","category":"Stage warp","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":".>","value":"190"}]}]},"moveLeft":{"descr":"Player move left","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Left","value":"37"}]}]},"moveRight":{"descr":"Player move right","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Right","value":"39"}]}]},"jump":{"descr":"Player Jump!","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Spacebar","value":"32"}]}]},"kick":{"descr":"Kick","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Shift","value":"16"}]}]},"run":{"descr":"Run faster","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Shift","value":"16"}]}]},"crouch":{"descr":"Crouch","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Down","value":"40"}]}]},"up":{"descr":"Up","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Up","value":"38"}]}]}}},{"name":"Mouse","extra":"","gamepad":false,"keyboard":true,"mouse":true,"id":1,"mapping":{"left":{"descr":"Previous Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Arrow Left","value":"37"}]}]},"right":{"descr":"Next Level","category":"Select Level","inputs":[{"id":1,"inputs":[{"type":"keyboard","text":"Arrow Right","value":"39"}]}]},"start":{"descr":"Start","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Esc","value":"27"}]}]},"selectLevel":{"descr":"Select Level (enter)","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Enter","value":"13"}]}]},"exit":{"descr":"Exit Menu","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Esc","value":"27"}]}]},"warpLeft":{"descr":"Warp left a stage","category":"Stage warp"},"warpRight":{"descr":"Warp right a stage","category":"Stage warp"},"moveLeft":{"descr":"Player move left","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"mouse","text":"mouse left","value":"mouse_left"}]}]},"moveRight":{"descr":"Player move right","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"mouse","text":"mouse right","value":"mouse_right"}]}]},"jump":{"descr":"Player Jump!","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"mouse","text":"mouse up","value":"mouse_up"}]}]},"kick":{"descr":"Kick","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"mouse","text":"right button","value":"mouse_button_right"}]}]},"run":{"descr":"Run faster","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"keyboard","text":"Shift","value":"16"}]}]},"crouch":{"descr":"Crouch","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"mouse","text":"mouse down","value":"mouse_down"}]}]},"up":{"descr":"Up","category":"Player move","inputs":[]}}},{"name":"XBOX","extra":"","gamepad":"XBOX 360","keyboard":"false","mouse":"false","id":2,"mapping":{"left":{"descr":"Previous Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpad left","value":"dpadLeft","buttonType":"button","subType":""}]}]},"right":{"descr":"Next Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpad right","value":"dpadRight","buttonType":"button","subType":""}]}]},"start":{"descr":"Start","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"start","value":"start","buttonType":"button","subType":""}]}]},"selectLevel":{"descr":"Select Level (enter)","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"A","value":"A","buttonType":"button","subType":""}]}]},"exit":{"descr":"Exit Menu","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"start","value":"start","buttonType":"button","subType":""}]}]},"warpLeft":{"descr":"Warp left a stage","category":"Stage warp","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"left bumper","value":"lBumper","buttonType":"button","subType":""}]}]},"warpRight":{"descr":"Warp right a stage","category":"Stage warp","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"right bumper","value":"rBumper","buttonType":"button","subType":""}]}]},"moveLeft":{"descr":"Player move left","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpad left","value":"dpadLeft","buttonType":"button","subType":""}]}]},"moveRight":{"descr":"Player move right","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpad right","value":"dpadRight","buttonType":"button","subType":""}]}]},"jump":{"descr":"Player Jump!","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"A","value":"A","buttonType":"button","subType":""}]}]},"kick":{"descr":"Kick","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"X","value":"X","buttonType":"button","subType":""}]}]},"run":{"descr":"Run faster","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"X","value":"X","buttonType":"button","subType":""}]}]},"crouch":{"descr":"Crouch","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpad down","value":"dpadDown","buttonType":"button","subType":""}]}]},"up":{"descr":"Up","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpad up","value":"dpadUp","buttonType":"button","subType":""}]}]}}},{"name":"Playstation","extra":"","gamepad":"Playstation 3","keyboard":"false","mouse":"false","id":3,"mapping":{"left":{"descr":"Previous Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpadLeft","value":"dpadLeft","buttonType":"button","subType":""}]}]},"right":{"descr":"Next Level","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpadRight","value":"dpadRight","buttonType":"button","subType":""}]}]},"start":{"descr":"Start","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"start","value":"start","buttonType":"button","subType":""}]}]},"selectLevel":{"descr":"Select Level (enter)","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"X","value":"X","buttonType":"button","subType":""}]}]},"exit":{"descr":"Exit Menu","category":"Select Level","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"start","value":"start","buttonType":"button","subType":""}]}]},"warpLeft":{"descr":"Warp left a stage","category":"Stage warp","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"lBumper","value":"lBumper","buttonType":"button","subType":""}]}]},"warpRight":{"descr":"Warp right a stage","category":"Stage warp","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"rBumper","value":"rBumper","buttonType":"button","subType":""}]}]},"moveLeft":{"descr":"Player move left","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpadLeft","value":"dpadLeft","buttonType":"button","subType":""}]}]},"moveRight":{"descr":"Player move right","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpadRight","value":"dpadRight","buttonType":"button","subType":""}]}]},"jump":{"descr":"Player Jump!","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"X","value":"X","buttonType":"button","subType":""}]}]},"kick":{"descr":"Kick","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"SQUARE","value":"SQUARE","buttonType":"button","subType":""}]}]},"run":{"descr":"Run faster","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"SQUARE","value":"SQUARE","buttonType":"button","subType":""}]}]},"crouch":{"descr":"Crouch","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpadDown","value":"dpadDown","buttonType":"button","subType":""}]}]},"up":{"descr":"Up","category":"Player move","inputs":[{"id":0,"inputs":[{"type":"gamepad","text":"dpadUp","value":"dpadUp","buttonType":"button","subType":""}]}]}}}];
    gamepres.defaultPlayers = [{"number":1,"title":"Keybaord","actionMapId":0,"keyboard":"true","mouse":"false","gamepad":false,"options":{"gpadIndex":0},"gamepadIndex":false},{"number":2,"title":false,"actionMapId":false,"keyboard":false,"mouse":false,"gamepad":false,"options":{},"gamepadIndex":false},{"number":3,"title":false,"actionMapId":false,"keyboard":false,"mouse":false,"gamepad":false,"options":{},"gamepadIndex":false},{"number":4,"title":false,"actionMapId":false,"keyboard":false,"mouse":false,"gamepad":false,"options":{},"gamepadIndex":false}];

})(jQuery);


/*======== UTILITIES =======*/

//prevents propagation and default for you when clicked
(function($){

    $.fn.sClick = function(callBack) {
        var item = this;
        return item.click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if (callBack) {
                callBack.apply(item, [e]);
            }
        });
    };

})(jQuery);