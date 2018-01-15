var gamepres = gamepres || {};

(function($){

    gamepres.stageSetup = {};

    var glob = gamepres.levelObject.addObject;

    var coinHeight = 30;

    gamepres.stageSetup.onePowerUps = function () {
        return [
            glob('coin', 100, 70),
            glob('coin', 116, 70),
            glob('coin', 132, 70),
            glob('coin', 148, 70),

            glob('block', 100, 40),
            glob('block', 116, 40),
            glob('block', 132, 40),
            glob('question_power_up', 148, 40),
            glob('block', 164, 40),
            glob('block', 180, 40),
            glob('block', 196, 40)
        ];
    };

    gamepres.stageSetup.steveUp = function () {
        return [
            glob('block', 132, 40),
            glob('question_apple_up', 148, 40),
            glob('block', 164, 40)
        ];
    };

    gamepres.stageSetup.someCoins = function () {
        return [
            glob('coin', -64, 60),
            glob('coin', -48, 60),
            glob('coin', -32, 60),
            glob('coin', -16, 60),
            glob('coin', 0, 60),
            glob('coin', 16, 60),
            glob('coin', 32, 60),
            glob('coin', 48, 60)
        ];
    };

    gamepres.stageSetup.justAPipe = function () {
        return [
            glob('pipe', 0,0)
        ];
    };

    gamepres.stageSetup.twoPowerUps = function () {
        return [
            glob('coin', 100, 70),
            glob('coin', 116, 70),
            glob('coin', 132, 70),
            glob('coin', 148, 70),

            glob('block', 100, 40),
            glob('block', 116, 40),
            glob('block', 132, 40),
            glob('question_power_up', 148, 40),
            glob('block', 164, 40),
            glob('block_hidden_metal', 180, 40),
            glob('block_power_up', 196, 40),
            glob('block', 212, 40),
            glob('block', 228, 40)
        ];
    };

    gamepres.stageSetup.threeCoinLevels = function () {

        var w = 16;
        var b1 = {x:100, y:40};

        return [
            glob('coin', b1.x, b1.y + coinHeight),
            glob('coin', b1.x + w, b1.y + coinHeight),
            glob('coin', b1.x + 2 * w, b1.y + coinHeight),

            glob('block', b1.x, b1.y),
            glob('block', b1.x + 1 * w, b1.y),
            glob('block', b1.x + 2 * w, b1.y),

            glob('block', b1.x + 4*w, b1.y + 2 * coinHeight),
            glob('block', b1.x + 5*w, b1.y + 2 * coinHeight),
            glob('block', b1.x + 6*w, b1.y + 2 * coinHeight),

            glob('coin', b1.x + 4*w, b1.y + 3 * coinHeight),
            glob('coin', b1.x + 5*w, b1.y + 3 * coinHeight),
            glob('coin', b1.x + 6*w, b1.y + 3 * coinHeight),

            glob('block', b1.x + 8*w, b1.y + 2 * coinHeight),
            glob('block', b1.x + 9*w, b1.y + 2 * coinHeight),
            glob('block', b1.x + 10*w, b1.y + 2 * coinHeight),

            glob('coin', b1.x + 8*w, b1.y + 3 * coinHeight),
            glob('coin', b1.x + 9*w, b1.y + 3 * coinHeight),
            glob('coin', b1.x + 10*w, b1.y + 3 * coinHeight)
        ];
    };

    gamepres.stageSetup.fiscalCliff = function () {

        var w = 16;
        var sand_block = {w:64, h:32};

        var b1 = {x: 0, y:sand_block.h};
        var b2 = {x: 198, y:sand_block.h};
        var b3 = {x:-50, y:0};
        var b4 = {x: 390, y:115};

        return [
            glob('fiscal', b1.x, b1.y),

            glob('sand_block', b3.x, b3.y),
            glob('sand_block', b3.x + sand_block.w, b3.y),
            glob('sand_block', b3.x + 2 * sand_block.w, b3.y),
            glob('sand_block', b3.x + 3 * sand_block.w, b3.y),
            glob('sand_block', b3.x + 4 * sand_block.w, b3.y),
            glob('sand_block', b3.x + 5 * sand_block.w, b3.y),

            glob('block_wood', b2.x, b2.y),

            glob('block_wood', b2.x + w, b2.y),
            glob('block_wood', b2.x + w, b2.y + w),

            glob('block_wood', b2.x + 2 * w, b2.y + 0 * w),
            glob('block_wood', b2.x + 2 * w, b2.y + 1 * w),
            glob('block_wood', b2.x + 2 * w, b2.y + 2 * w),

            glob('block_wood', b2.x + 3 * w, b2.y + 0 * w),
            glob('block_wood', b2.x + 3 * w, b2.y + 1 * w),
            glob('block_wood', b2.x + 3 * w, b2.y + 2 * w),
            glob('block_wood', b2.x + 3 * w, b2.y + 3 * w),

            glob('block_wood', b2.x + 4 * w, b2.y + 0 * w),
            glob('block_wood', b2.x + 4 * w, b2.y + 1 * w),
            glob('block_wood', b2.x + 4 * w, b2.y + 2 * w),
            glob('block_wood', b2.x + 4 * w, b2.y + 3 * w),
            glob('block_wood', b2.x + 4 * w, b2.y + 4 * w),

            glob('block_wood', b2.x + 5 * w, b2.y + 0 * w),
            glob('block_wood', b2.x + 5 * w, b2.y + 1 * w),
            glob('block_wood', b2.x + 5 * w, b2.y + 2 * w),
            glob('block_wood', b2.x + 5 * w, b2.y + 3 * w),
            glob('block_wood', b2.x + 5 * w, b2.y + 4 * w),
            glob('block_wood', b2.x + 5 * w, b2.y + 5 * w),

            glob('block_wood', b2.x + 6 * w, b2.y + 0 * w),
            glob('block_wood', b2.x + 6 * w, b2.y + 1 * w),
            glob('block_wood', b2.x + 6 * w, b2.y + 2 * w),
            glob('block_wood', b2.x + 6 * w, b2.y + 3 * w),
            glob('block_wood', b2.x + 6 * w, b2.y + 4 * w),
            glob('block_wood', b2.x + 6 * w, b2.y + 5 * w),

            glob('coin', b4.x + 0 * w, b4.y + 0 * w),
            glob('coin', b4.x + 0 * w, b4.y + 1 * w),
            glob('coin', b4.x + 0 * w, b4.y + 2 * w),
            glob('coin', b4.x + 0 * w, b4.y + 3 * w),

            glob('coin', b4.x + 1 * w, b4.y + 0 * w),
            glob('coin', b4.x + 1 * w, b4.y + 1 * w),
            glob('coin', b4.x + 1 * w, b4.y + 2 * w),
            glob('coin', b4.x + 1 * w, b4.y + 3 * w),

            glob('coin', b4.x + 2 * w, b4.y + 0 * w),
            glob('coin', b4.x + 2 * w, b4.y + 1 * w),
            glob('coin', b4.x + 2 * w, b4.y + 2 * w),
            glob('coin', b4.x + 2 * w, b4.y + 3 * w)
        ];
    };

})(jQuery);