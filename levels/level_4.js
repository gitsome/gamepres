//the gamepres namespace as a reminder
var gamepres = gamepres || {};

(function($) {

    //add a new level
    gamepres.addLevel({
        title : 'Fullscreen & Mouse',
        description : 'Fullscreen API Goodness',
        bgColor : '#9FFFF3',
        song : 'airship',
        stages : [
            {
                template : 'stages.title',
                templateData : {
                    title : 'FULLSCREEN & POINTER',
                    subTitle : 'LOCK, GO BIG OR GO',
                    description : 'HOME'
                },
                templateBehavior : function (item) {},
                objects : []
            },
            {
                template : 'stages.4.1',
                templateBehavior: function(item){
                    var node = $(item.nodes[0]);
                    node.find('#fullscreen-button').click(function(){
                        var elem = document.getElementById("presentation");
                        if (elem.requestFullScreen) {
                            elem.requestFullScreen();
                        } else if (elem.mozRequestFullScreen) {
                          elem.mozRequestFullScreen();
                        } else if (elem.webkitRequestFullScreen) {
                          elem.webkitRequestFullScreen();
                        }
                    });
                    node.find('#fullscreen-button-slide').click(function(){
                        var elem = item.nodes[0];
                        console.log(elem, node);
                        if (elem.requestFullScreen) {
                            elem.requestFullScreen();
                        } else if (elem.mozRequestFullScreen) {
                          elem.mozRequestFullScreen();
                        } else if (elem.webkitRequestFullScreen) {
                          elem.webkitRequestFullScreen();
                        }
                    });
                }
            },
            {
                template : 'stages.4.2'
            },
            {
                template : 'stages.4.3'
            },
            {
                template : 'stages.4.4'
            },
            {
                template : 'stages.4.5'
            },
            {
                template : 'stages.4.6'
            },
            {
                template : 'stages.4.7'
            },
            {
                template : 'stages.4.8'
            }
        ],
        parallax : [
            {
                layer: 1,
                padding : 0.6,
                images : [

                    //let's add a few green hills
                    {
                        name : 'ship_anchor',
                        image : 'gameimages/ship_anchor.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 0,
                padding: 0,
                images : [
                    {
                        name : 'ship_bottom',
                        image : 'gameimages/ship_bottom.png',
                        fixFloor : true
                    }
                ]
            },
            {
                layer: 0,
                padding: 0.25,
                images : [
                    {
                        name : 'ship_stick_cannon_small',
                        image : 'gameimages/ship_pole_cannon_short.png',
                        fixBottom : true,
                        thumbnail: true
                    }
                ]
            },
            {
                layer: 0,
                padding: 0.22,
                images : [
                    {
                        name : 'ship_mast',
                        image : 'gameimages/ship_mast.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 1,
                padding: 0.70,
                images : [
                    {
                        name : 'ship_porthole',
                        image : 'gameimages/ship_porthole.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 0,
                padding: 0.60,
                images : [
                    {
                        name : 'ship_cannon_pole',
                        image : 'gameimages/ship_cannon_pole.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 2,
                padding: 0.40,
                images : [
                    {
                        name : 'ship_support',
                        image : 'gameimages/ship_support.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 0,
                padding: 0.40,
                images : [
                    {
                        name : 'ship_support',
                        image : 'gameimages/ship_support.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 4,
                padding : 0.3,
                images : [

                    //and let's add the curtain
                    {
                        name : 'ship_big_pole',
                        image : 'gameimages/ship_bigpole.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 0,
                padding : 0.4,
                images : [

                    //and add the funky clouds
                    {
                        name : 'mega_cannon',
                        image : 'gameimages/ship_mega_cannon.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            },
            {
                layer: 0,
                padding : 0.3,
                images : [

                    //and add the funky clouds
                    {
                        name : 'ship_cannons_1',
                        image : 'gameimages/ship_cannons_1.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            },
            {
                layer: 5,
                padding : 0.3,
                images : [

                    //and add the funky clouds
                    {
                        name : 'cloud',
                        image : 'gameimages/funkycloud_large.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            },
            {
                layer: 3,
                padding : 0.3,
                images : [

                    //and add the funky clouds
                    {
                        name : 'cloud',
                        image : 'gameimages/funkycloud_large.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            }
        ]

    });

    $.template('stages.4.1', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Fullscreen API</h2>',
            '<p>You can utilize the fullscreen api on any element</p>',
            '<button id="fullscreen-button" class="css3button opaque">Go Fullscreen Presentation</button>',
            '<button id="fullscreen-button-slide" class="css3button opaque">Go Fullscreen Slide</button>',
        '</div>'
    ].join(''));

    $.template('stages.4.3', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Browser Support</h1>',
            '<div class="centered">',
                '<img src="levels/assets/images/can_i_use_fullscreen.png"/>',
            '</div>',
        '</div>'
    ].join(''));

    $.template('stages.4.4', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Good Uses</h2>',
            '<ol>',
                '<li>Games :-)</li>',
                '<li>Video</li>',
                '<li>Presentations :-)</li>',
            '</ol>',
            '<p>Build an accessible video player with HTML controls</p>',
        '</div>'
    ].join(''));

    $.template('stages.4.5', [
        '<div class="stage-box constance">',
            '<h2 class="itsame">Pointer Lock API</h2>',
            '<p>EXPLAINED: When pointer lock is enabled clientX, clientY, screenX, and screenY remain constant. movementX and movementY are updated with the number of pixels the pointer would have moved since the last event was delivered</p>',
            '<ul>',
                '<li><a href="http://media.tojicode.com/q3bsp/?tesselate=2" target="_blank">Quake Demo</a></li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.4.6', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Uses and Gotchas</h2>',
            '<ol>',
                '<li>Games :-)</li>',
                '<li>Minority Report type interface!</li>',
                '<li>???</li>',
            '</ol>',
            '<p>Support is still sketchy and spotty. Additionally, some browsers require fullscreen mode to be on before mouse lock can be triggered.</p>',
        '</div>'
    ].join(''));

    $.template('stages.4.7', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Technology Used in This Presentation</h1>',
            '<ul>',
                '<li>CSS3</li>',
                '<li>WEBGL (mention webgl wrapper for 2d context</li>',
                '<li>WEBGL <a href="http://badassjs.com/post/4064873160/webgl-2d-an-implementation-of-the-2d-canvas-context-in" target="_blank">Webgl_2d</a></li>',
                '<li>BOX2d</li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.4.8', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Resources</h1>',
            '<ul>',
                '<li><a href="https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode" target="_blank">Fullsceen</a></li>',
                '<li><a href="http://www.html5rocks.com/en/tutorials/pointerlock/intro/" target="_blank">Pointer Lock</a></li>',
            '</ul>',
        '</div>'
    ].join(''));


})(jQuery);