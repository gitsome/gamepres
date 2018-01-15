/**
 * Gamepres audio based off of Ben Sparks' audio code for Mine Mars
 */

var gamepres = gamepres || {};

(function($){

    gamepres.audio = {};

    gamepres.audio.buffers = {}; // store all sounds by ID

    gamepres.audio.convolver = {};

    //IMPORTANT: This needs to be called before loading any sounds
    gamepres.audio.init = function() {
        try {

            if (window['webkitAudioContext']) {
                gamepres.audio.context = new webkitAudioContext();
            } else {
                gamepres.audio.context = new AudioContext();
            }

        } catch(e) {
            gamepres.audio.context = null;
            alert("Webkit Audio API is not supported in this browser");
        }
    };

    gamepres.audio.isReady = function () {
        return !(gamepres.audio.context === undefined);
    };

    var play = function(buffer, options) {
        var source = gamepres.audio.context.createBufferSource();    // creates a sound source
        var gainNode = gamepres.audio.context.createGain();
        source.buffer = buffer;

        if(options.filter){

            //create a convolver
            var convolver = gamepres.audio.context.createConvolver();
            convolver.buffer = gamepres.audio.buffers['impulseBuffer_cave'].data;// user must provide this wav file ahead of time

            gainNode = gamepres.audio.context.createGain();
            gainNode.gain.value = 2.0;
            gainNode.connect(gamepres.audio.context.destination);

            // Connect source gain to destination.
            source.connect(gainNode);
            gainNode.connect(gamepres.audio.context.destination);

            // Connect source through convolver to gain to destination
            source.connect(convolver);
            convolver.connect(gainNode);
            gainNode.connect(gamepres.audio.context.destination);

        } else {

            // Connect source to gain.
            source.connect(gainNode);
            // Connect gain to destination.
            gainNode.connect(gamepres.audio.context.destination);

        }

        var cTime = gamepres.audio.context.currentTime;
        var duration = source.buffer.duration;

        if(options.fade){

            options.fade = options.fade / 1000;

            gainNode.gain.linearRampToValueAtTime(0, cTime);
            gainNode.gain.linearRampToValueAtTime(options.gain, cTime + options.fade);
            gainNode.gain.linearRampToValueAtTime(options.gain, cTime + duration - options.fade);
            source.start(0);   // play the source now
            gainNode.gain.linearRampToValueAtTime(0, cTime + duration);

        } else {
            gainNode.gain.linearRampToValueAtTime(options.gain, 0);
            source.start(0);   // play the source now
        }

        source.gain = gainNode.gain;
        source.loop = options.loop === true;

        return source;
    };

    var audioId = 0;
    gamepres.audio.uniqueId = function (prefix) {
        audioId++;
        return prefix + audioId;
    };

    gamepres.audio.load = function(file, id) {
        id = id || gampepres.audio.uniqueId('gamepres.audio_');

        gamepres.audio.buffers[id] = {
            url: file,
            data: null,
            ready: false
        };

        // dunno if jquery supports this type yet, so just manually doing it for now
        var request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            gamepres.audio.context.decodeAudioData(request.response, function(buffer) {
              gamepres.audio.buffers[id].data = buffer;
              gamepres.audio.buffers[id].ready = true;
            }, function(e) { console.error("Some error loading gamepres.audio data!", e); });
        };

        try{request.send();}catch(e){}
    };

    // array of objects {url: '', id: ''}
    gamepres.audio.loadBulk = function(files) {
        $.each(files, function(index, file) {
            gamepres.audio.load(file.url, file.id);
        });
    };

    gamepres.audio.play = function(id, options) {

        options = options || {};
        options.fade = options.fade || 0;
        options.gain = options.gain || 1;
        options.loop = options.loop === true ? true : false;

        if(!gamepres.audio.buffers[id]) {
            return false; // missing!!!
        }

        if(!gamepres.audio.buffers[id].ready) {
            console.warn("gamepres.audio isn't ready!", id);
            return false;
        }

        // todo: track multiple sources separately
        gamepres.audio.buffers[id].source = play(gamepres.audio.buffers[id].data, options);
        return gamepres.audio.buffers[id].source;
    };

    gamepres.audio.stop = function(id, options) {

        //fade out if we can
        var cTime = gamepres.audio.context.currentTime;
        var source = gamepres.audio.buffers[id].source;

        if(source){

            var gainNode = source.gain;
            var duration = source.buffer.duration;

            options = options || {};
            options.fade = options.fade || 0;
            options.gain = options.gain || 1;

            if(gainNode) {
                gainNode.linearRampToValueAtTime(options.gain, cTime);
                gainNode.linearRampToValueAtTime(0, cTime + options.fade);
                gainNode.linearRampToValueAtTime(0, cTime + options.fade + 1);
            }

            setTimeout(function() {
                source.stop(0);
            },options.fade * 1000);
        }

    };

})(jQuery);