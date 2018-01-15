var gamepres = gamepres || {};

(function($){

    gamepres.levelObject = {};
    gamepres.levelObject.presets = {};

    //create a shortcut for presets
    glop = gamepres.levelObject.presets;

    gamepres.levelObject.addObject = function (type, x, y, options) {

        options = options || {};

        var levelObj = glop[type]();

        levelObj.x = x;
        levelObj.y = y;

        $.extend(levelObj, options);

        return levelObj;
    };


    /*======= OBJECT PRESETS =======*/

    glop.flower = function () {
        return {
            type:'rect',
            image: {
                name: 'flower',
                image: 'gameimages/flower.png'
            },
            props: {
                restitution:0.3,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'fire',
                    noRotate:true
                }
            }
        };
    };

    glop.grass_blocks_indy_green = function () {
        return {
            type:'rect',
            image: {
                name: 'grass_blocks_indy_green',
                image: 'gameimages/grass_blocks_indy_green.png'
            },
            props: {
                restitution:0.0,
                density:0.1
            }
        };
    };

    glop.grass_blocks_indy_green_flat = function () {
        return {
            type:'rect',
            image: {
                name: 'grass_blocks_indy_green_flat',
                image: 'gameimages/grass_blocks_indy_green_flat.png'
            },
            props: {
                restitution:0.0,
                density:0.1
            }
        };
    };

    glop.grass_blocks_indy_white = function () {
        return {
            type:'rect',
            image: {
                name: 'grass_blocks_indy_white',
                image: 'gameimages/grass_blocks_indy_white.png'
            },
            props: {
                restitution:0.0,
                density:0.1
            }
        };
    };

    glop.grass_blocks_indy_orange = function () {
        return {
            type:'rect',
            image: {
                name: 'grass_blocks_indy_orange',
                image: 'gameimages/grass_blocks_indy_orange.png'
            },
            props: {
                restitution:0.0,
                density:0.1
            }
        };
    };

    glop.grass_blocks_indy_orange_tall = function () {
        return {
            type:'rect',
            image: {
                name: 'grass_blocks_indy_orange_tall',
                image: 'gameimages/grass_blocks_indy_orange_tall.png'
            },
            props: {
                restitution:0.0,
                density:0.1
            }
        };
    };

    glop.mushroom = function () {
        return {
            type:'rect',
            image: {
                name: 'mushroom',
                image: 'gameimages/mushroom.png'
            },
            props: {
                friction:0,
                restitution:0.0,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'mushroom',
                    noRotate:true
                }
            }
        };
    };

    glop.feather = function () {
        return {
            type:'rect',
            image: {
                name: 'feather',
                image: 'gameimages/feather.png'
            },
            props: {
                friction:0,
                restitution:0.0,
                density:0.01,
                userData : {
                    isInteractive: true,
                    interactiveType: 'feather',
                    noRotate:true
                }
            }
        };
    };

    glop.coin = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'coin',
                image: 'gameimages/coin.png'
            },
            props: {
                restitution:0.8,
                density:0.6,
                userData : {
                    isInteractive: true,
                    interactiveType: 'coin',
                    pass: true
                }
            }
        };
    };

    glop.block = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'block',
                image: 'gameimages/block_gold.png'
            },
            props: {
                restitution:0.0,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'block'
                }
            }
        };
    };

    glop.block_wood = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'block_wood',
                image: 'gameimages/block_wood.png'
            },
            props: {
                restitution:0.0,
                density:0.1,
                userData : {
                    isInteractive: false,
                    interactiveType: false
                }
            }
        };
    };

    glop.sand_block = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name : 'sand_block',
                image : 'gameimages/sand_block.png',
            },
            props: {
                restitution:0.0,
                density:0.1,
                userData : {
                    isInteractive: false,
                    interactiveType: false
                }
            }
        };
    };

    glop.block_hidden_metal = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'block',
                image: 'gameimages/block_gold.png'
            },
            props: {
                restitution:0.0,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'block_hidden_metal'
                }
            }
        };
    };

    glop.block_power_up = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'block',
                image: 'gameimages/block_gold.png'
            },
            props: {
                restitution:0.3,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'block_power_up'
                }
            }
        };
    };

    glop.question_power_up = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'question',
                image: 'gameimages/question.png'
            },
            props: {
                restitution:0.3,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'question_power_up'
                }
            }
        };
    };

    glop.question_apple_up = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'question',
                image: 'gameimages/question.png'
            },
            props: {
                restitution:0.3,
                density:0.1,
                userData : {
                    isInteractive: true,
                    interactiveType: 'question_apple_up'
                }
            }
        };
    };

    glop.fiscal = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name: 'fiscal',
                image: 'gameimages/fiscal.png'
            },
            props: {
                restitution:0.3,
                density:0.1,
                userData : {
                    isInteractive: false,
                    interactiveType: false,
                    pass: true
                }
            }
        };
    };

    glop.pipe = function () {
        return {
            type:'rect',
            physicsType: 'static',
            image: {
                name : 'grass_pipe',
                image : 'gameimages/grass_pipe.png',
            },
            props: {
                restitution:0,
                density:200,
                userData : {
                    isInteractive: false,
                    interactiveType: false
                }
            }
        };
    };




})(jQuery);