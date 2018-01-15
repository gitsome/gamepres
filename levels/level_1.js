//the gamepres namespace as a reminder
var gamepres = gamepres || {};

(function($) {

    var utils = gamepres.levelObject.util;


    /*======= CREATE THE LEVEL =======*/

    //add a new level
    gamepres.addLevel({
        title: 'INTRODUCTION',
        description: 'Welcome to the GamePres Presentation',
        bgColor : '#FFDBAB',
        stages : [
            {
                template : 'stages.title',
                templateData : {
                    title : 'SUPER',
                    subTitle : 'BROWSER BROS.',
                    description : '3'
                },
                templateBehavior : function (item) {},
                objects : []
            },
            {
                template : 'stages.title.2',
                templateData : {
                    title : 'SUPER',
                    subTitle : 'INPOOT BROS.',
                    description : '3'
                },
                templateBehavior : function (item) {},
                objects : []
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
                layer: 0,
                padding: 0,
                images : [
                    {
                        name : 'checker',
                        image : 'gameimages/checker.png',
                        fixFloor : true
                    }
                ]
            },
            {
                layer: 1,
                padding: 0.22,
                images : [
                    {
                        name : 'bush_tall',
                        image : 'gameimages/tallbushes.png',
                        fixBottom : true,
                        thumbnail: true
                    }
                ]
            },
            {
                layer: 2,
                padding: 0.22,
                images : [
                    {
                        name : 'bush_huge',
                        image : 'gameimages/bigbushgroup.png',
                        fixBottom : true,
                        thumbnail: true
                    }
                ]
            },
            {
                layer: 0,
                padding : 0,
                images : [

                    //and let's add the curtain
                    {
                        name : 'curtain',
                        image : 'gameimages/curtain.png',
                        fixTop : true
                    }
                ]
            },
            {
                layer: 4,
                padding : 0.3,
                images : [

                    //and add the funky clouds
                    {
                        name : 'cloud_large',
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
                        name : 'cloud_large',
                        image : 'gameimages/funkycloud_large.png',
                        ymin : 0.2,
                        ymax : 0.7
                    }
                ]
            }
        ]
    });

    $.template('stages.title', [
        '<h1 class="itsame text-shadow-dark text-primary">${title}</h1>',
        '<h2 class="itsame text-shadow-dark text-primary">${subTitle}</h2>',
        '<h3 class="itsame text-shadow-dark text-emph">${description}</h3>'
    ].join(''));

    $.template('stages.title.2', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">MODERN BROWSER Input and Output</h1>',
            '<ul>',
                '<li>Gamepad API</li>',
                '<li>Mouse Lock API</li>',
                '<li>Fullscreen API</li>',
            '</ul>',
            '<div>Why talk about these apis?</div>',
            '<ul>',
                '<li>Constructivist rational</li>',
                '<li>It is fun</li>',
            '</ul>',
            '<div>Goal: Everyone takes something home</div>',
        '</div>'
    ].join(''));

})(jQuery);