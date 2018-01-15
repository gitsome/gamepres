//the gamepres namespace as a reminder
var gamepres = gamepres || {};

(function($) {

    //add a new level
    gamepres.addLevel({
        title : 'GAMEPAD API',
        description : 'GET YOUR GAME ON',
        bgColor : '#5c94fc',
        song : 'world2',
        stages : [
            {
                template : 'stages.title',
                templateData : {
                    title : 'GAMEPAD API',
                    subTitle : 'SICK BIRD IT\'S',
                    description : 'GAMETIME'
                },
                templateBehavior : function (item) {},
                objects : []
            },
            {
                template : 'stages.3.1'
            },
            {
                template : 'stages.3.2',
                objects: gamepres.stageSetup.twoPowerUps()
            },
            {
                template : 'stages.3.3'
            },
            {
                template : 'stages.3.4',
                objects: gamepres.stageSetup.steveUp()
            },
            {
                template : 'stages.3.5'
            }
        ],
        parallax : [
            {
                layer: 1,
                padding : 0.1,
                images : [

                    //let's add a few green hills
                    {
                        name : 'sand_bush',
                        image : 'gameimages/sand_bush.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 0,
                padding: 0,
                images : [
                    {
                        name : 'sand',
                        image : 'gameimages/sand.png',
                        fixFloor : true
                    }
                ]
            },
            {
                layer: 1,
                padding: 0.22,
                images : [
                    {
                        name : 'sand_tree',
                        image : 'gameimages/sand_tree.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 4,
                padding : 0.4,
                images : [

                    //and let's add the curtain
                    {
                        name : 'bgpyramid',
                        image : 'gameimages/sand_bgpyramid.png',
                        fixBottom : true,
                        thumbnail: true
                    }
                ]
            },
            {
                layer: 5,
                padding : 0.3,
                images : [

                    //and add the funky clouds
                    {
                        name : 'sand_cloud',
                        image : 'gameimages/sand_cloud.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            },
            {
                layer: 3,
                padding : 0.1,
                images : [

                    //and add the funky clouds
                    {
                        name : 'sand_cloud',
                        image : 'gameimages/sand_cloud.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            }
        ]

    });

    $.template('stages.3.1', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Where are they?</h2>',
            '<pre class="code">var gamepadSupportAvailable = !!navigator.webkitGetGamepads</pre>',
            '<pre class="code">  || !!navigator.webkitGamepads;</pre>',
        '</div>'
    ].join(''));

    $.template('stages.3.2', '<div></div>');

    $.template('stages.3.3', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">How do I talk to them?</h2>',
            '<a href="http://www.html5rocks.com/en/tutorials/doodles/gamepad/">HTML5 Rocks!!</a>',
        '</div>'
    ].join(''));

    $.template('stages.3.4', '<div></div>');

    $.template('stages.3.5', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">The Complexity of Gamepads</h2>',
            '<ul>',
                '<li>Different Controllers</li>',
                '<li>Different Browsers</li>',
                '<li>Different OS</li>',
                '<li>Strange detection behavior</li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.3.5', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Getting Gamepads to talk to your Computer</h2>',
            '<ul>',
                '<li><a href="http://tattiebogle.net/index.php/ProjectRoot/Ps3Controller" target="_blank">Playstation 3 Controller</a></li>',
                '<li><a href="http://www.maclife.com/article/howtos/how_use_xbox_360_wireless_controller_your_mac" target="_blank">XBOX 360 Controller</a></li>',
            '</ul>',
        '</div>'
    ].join(''));




})(jQuery);