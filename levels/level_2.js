//the gamepres namespace as a reminder
var gamepres = gamepres || {};

(function($) {

    //add a new level
    gamepres.addLevel({
        title : 'INPOOT',
        description : 'The meat and potatoes',
        bgColor : '#9FFFF3',
        song: 'world1',
        stages : [
            {
                template : 'stages.title',
                templateData : {
                    title : 'INPOOT INTRODUCTION',
                    subTitle : 'BE SAFE WRAP YOUR',
                    description : 'INPUTS'
                },
                templateBehavior : function (item) {},
                objects : []
            },
            {
                template : 'stages.2.1'
            },
            {
                template : 'stages.2.2',
                objects: gamepres.stageSetup.justAPipe()
            },
            {
                template : 'stages.2.3',
                objects: gamepres.stageSetup.onePowerUps()
            },
            {
                template : 'stages.2.4'
            },
            {
                template : 'stages.2.5',
                objects : gamepres.stageSetup.someCoins()
            },
            {
                template : 'stages.2.6'
            },
            {
                template : 'stages.2.7'
            },
            {
                template : 'stages.2.8',
                objects: gamepres.stageSetup.twoPowerUps()
            },
            {
                template : 'stages.2.9'
            },
            {
                template : 'stages.2.10'
            },
            {
                template : 'stages.2.11',
                objects: gamepres.stageSetup.fiscalCliff()
            },
            {
                template : 'stages.2.12'
            }
        ],
        parallax : [
            {
                layer: 0,
                padding : 0.1,
                images : [

                    //let's add a few green hills
                    {
                        name : 'bush',
                        image : 'gameimages/bush.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 2,
                padding : 0.1,
                images : [

                    //let's add a few green hills
                    {
                        name : 'bush',
                        image : 'gameimages/bush.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 1,
                padding: 0,
                images : [
                    {
                        name : 'grass_floor',
                        image : 'gameimages/grass_floor.png',
                        fixFloor : true
                    }
                ]
            },
            {
                layer: 0,
                thumbnailOnly: true,
                padding: 0.25,
                images : [
                    {
                        name : 'grass_pipe',
                        image : 'gameimages/grass_pipe.png',
                        fixBottom : true,
                        thumbnail: true
                    }
                ]
            },
            {
                layer: 1,
                padding: 0.12,
                images : [
                    {
                        name : 'bush_group',
                        image : 'gameimages/bigbushgroup.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 1,
                padding: 0.30,
                images : [
                    {
                        name : 'blocks_big',
                        image : 'gameimages/grass_blocks_big.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 2,
                padding: 0.23,
                images : [
                    {
                        name : 'blocks_tall',
                        image : 'gameimages/grass_blocks_tall.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 2,
                padding : 0.22,
                images : [

                    //and let's add the curtain
                    {
                        name : 'blocks_2',
                        image : 'gameimages/grass_blocks_2.png',
                        fixBottom : true
                    }
                ]
            },
            {
                layer: 3,
                padding : 0.1,
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
                padding : 0.1,
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

/**
 * FIRST WE ARE GOING TO TALK ABOUT INPOOT:
    INPOOT IS A WORK IN PROGRESS
        ABSTRACTS OUT INPUT HANDLING ACTIONS
            KEYBOARD
            MOUSE
            GAMEPADS
        NORMALIZATION OF INPUTS

    HOW DO YOU USE IT?
        CODE INCLUSION
        INITIALIZATION
        THE UI AND MAPPING
        EXPORTING SAVED MAPPINGS

    ABSTRACTS OUT INPUT HANDLING
        ACTIONS
        PRESSED VERSUS VAL
        PLAYER NUM

    NORMILIZATION
        EVERYTHING 0-1
        GAMEPAD TO KEYBOARD EXPLAINATION

    RESOURCES
 */

    $.template('stages.2.1', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">INTRODUCTION TO INPOOT</h2>',
            '<ul>',
                '<li>Abstracts input handling',
                    '<ul>',
                        '<li>Keyboard</li>',
                        '<li>Mouse</li>',
                        '<li>Gamepads</li>',
                    '</ul>',
                '</li>',
                '<li>Normalizes inputs</li>',
                '<li>Provides a UI element to create mappings</li>',
                '<li>Allows exporting and ingestion default mappings</li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.2.2', '<div></div>');

    $.template('stages.2.3', '<div></div>');

    $.template('stages.2.4', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">HOW DO YOU SET IT UP?</h2>',
            '<ul>',
                '<li>Download It <a href="http://inpoot.com" target="_blank">INPOOT Docs</a></li>',
                '<li>Put it in your project</li>',
                '<li>Include the required files</li>',
            '</ul>',
            '<div class="small-code">',
                '<pre >&lt;!-- inpoot depends on jquery, jquery tmpl --&gt;</pre>',
                '<pre >&lt;script type="text/javascript" src="inpoot/lib/depends/jquery/jquery-1.7.2.min.js"&gt;&lt;/script&gt;</pre>',
                '<pre >&lt;script type="text/javascript" src="inpoot/lib/depends/tmpl/jquery.tmpl.js"&gt;&lt;/script&gt;</pre>',
                '<pre >&lt;script type="text/javascript" src="inpoot/lib/depends/tmpl/jquery.tmplPlus.js"&gt;&lt;/script&gt;</pre>',
                '<pre >&lt;!-- INPOOT --&gt;</pre>',
                '<pre >&lt;link rel="stylesheet" href="lib/inpoot/styles/inpoot.css" type="text/css" charset="utf-8" /&gt;</pre>',
                '<pre >&lt;script type="text/javascript" src="inpoot/inpoot.js"&gt;&lt;/script&gt;</pre>',
                '<pre >&lt;script type="text/javascript" src="inpoot/lib/resources/inpoot_gamepads.js"&gt;&lt;/script&gt;</pre>',
                '<pre >&lt;script type="text/javascript" src="inpoot/lib/resources/inpoot_keyboards.js"&gt;&lt;/script&gt;</pre>',
            '</div>',
        '</div>'
    ].join(''));

    $.template('stages.2.5', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">INPOOT SETUP step 1</h2>',
            '<ul>',
                '<li><a href="http://inpoot.com" target="_blank">INPOOT Demo Code</a></li>',
            '</ul>',
            '<p>Initialize INPOOT with your options</p>',
            '<pre class="code">inpoot.initialize(myOptions);</pre>',
        '</div>'
    ].join(''));

    $.template('stages.2.6', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">INPOOT SETUP step 2</h2>',
            '<ul>',
                '<li><a href="http://inpoot.com" target="_blank">INPOOT Demo Code</a></li>',
            '</ul>',
            '<p>Let INPOOT Get a snapshot</p>',
            '<pre class="code">inpoot.tick();</pre>',
        '</div>'
    ].join(''));

    $.template('stages.2.7', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">INPOOT SETUP setp 3</h2>',
            '<p>Test Values</p>',
            '<pre class="code">if(inpoot.action("jump", 1).val){</pre>',
            '<pre class="code">    /*your code here*/</pre>',
            '<pre class="code">}</pre>',
            '<pre class="code">if(inpoot.action("fireball", 1).pressed){</pre>',
            '<pre class="code">    /*your code here*/</pre>',
            '<pre class="code">}</pre>',
            '<div>NOTE: Call the action method once!!</div>',
        '</div>'
    ].join(''));

    $.template('stages.2.8', [
        '<div></div>'
    ].join(''));

    $.template('stages.2.9', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Action Mapping</h2>',
            '<p>You have passed in your actions but how do you map them?</p>',
            '<ul>',
                '<li><a href="http://inpoot.com" target="_blank">INPOOT Demo</a></li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.2.10', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Normalizing</h2>',
            '<p>Regardless of inputs, INPOOT normalizes it to between 0 and 1</p>',
            '<p>This makes it more effecient to write your logic, and provides flexibility for gamepads</p>',
            '<pre class="code">player1.x = player1.x + acceleration * </pre>',
            '<pre class="code">  (inpoot.action("run-right", 1).val</pre>',
            '<pre class="code">    - inpoot.action("run-left", 1).val)</pre>',
        '</div>'
    ].join(''));

    $.template('stages.2.11', '<div></div>');

    $.template('stages.2.12', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Demos</h2>',
            '<ul>',
                '<li><a href="http://inpoot.com" target="_blank">INPOOT Demo</a></li>',
                '<li><a href="#" target="_blank">Mine Mars</a></li>',
                '<li><a href="#" target="_blank">This Presentation</a></li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.2.13', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Resources</h1>',
            '<ul>',
                '<li><a href="http://www.html5rocks.com/en/tutorials/doodles/gamepad/" target="_blank">Gamepad HTML5 Rocks!</a></li>',
            '</ul>',
        '</div>'
    ].join(''));



})(jQuery);