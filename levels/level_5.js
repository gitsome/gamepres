
    $.template('stages.1.1', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">CSS3 Shaders</h1>',
            '<p>',
                'Shaders are simple programs that describe the traits of either a vertex or a pixel. Vertex shaders describe the traits (position, texture coordinates, colors, etc.) of a vertex.',
            '</p>',
            '<p>',
                'While pixel shaders describe the traits (color, z-depth and alpha value) of a pixel, a vertex shader is called for each vertex in a primitive.',
            '</p>',
        '</div>'
    ].join(''));

    $.template('stages.1.2', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">CSS3 Shaders Examples</h1>',
            '<ul>',
                '<li><a href="http://adobe.github.com/web-platform/samples/css-customfilters/simple-fragment/index.html" target="_blank">Fragment Shader Driven</a></li>',
                '<li><a href="http://adobe.github.com/web-platform/samples/css-customfilters/simple-vertex/index.html" target="_blank">Vertex Shader Driven</a></li>',
                '<li><a href="http://adobe.github.com/web-platform/samples/css-customfilters/varyings/index.html" target="_blank">Fragment and Vertex Shader Driven</a></li>',
            '</ul>',
        '</div>'
    ].join(''));

    $.template('stages.1.3', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Mine Mars Example</h1>',
            '<p>Goal: Create a helmet like HUD effect for the loading screen</p>',
            '<p>Picture breaking the flat surface into pieces and pushing the middle out. Would only require changes to a vertex shader.</p>',
        '</div>'
    ].join(''));

    $.template('stages.1.4', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Mine Mars Example</h1>',
            '<p>CSS Definition</p>',
            '<pre class="code">#gamestory {</pre>',
            '<pre class="code">  -webkit-filter: custom(</pre>',
            '<pre class="code">    url(cssShaders/timeline.vs)</pre>',
            '<pre class="code">    mix(url(cssShaders/timeline.fs) multiply source-atop), 1 50,</pre>',
            '<pre class="code">    transform scale(1.0) perspective(500)</pre>',
            '<pre class="code">        rotateY(0deg) rotateX(-10deg) rotateZ(0deg)</pre>',
            '<pre class="code">  );</pre>',
            '<pre class="code">}</pre>',
        '</div>'
    ].join(''));

    $.template('stages.1.5', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Mine Mars Example</h1>',
            '<p>Markup</p>',
            '<pre class="code">&lt;div id="gamestory"&gt;</pre>',
            '<pre class="code">  -whatever you want here-</pre>',
            '<pre class="code">&lt;/div&gt;</pre>',
        '</div>'
    ].join(''));

    $.template('stages.1.6', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Mine Mars Example</h1>',
            '<p>Vertex Shader</p>',
            '<div class="small-code">',
            '<pre class="code">precision mediump float;</pre>',
            '<pre class="code">attribute vec4 a_position;</pre>',
            '<pre class="code">attribute vec2 a_texCoord;</pre>',
            '<pre class="code">attribute vec2 a_meshCoord;</pre>',
            '<pre class="code">uniform mat4 u_projectionMatrix;</pre>',
            '<pre class="code">uniform mat4 transform;</pre>',
            '<pre class="code">const float PI = 3.1415;</pre>',
            '<pre class="code">void main() {</pre>',
            '<pre class="code">  float curve = abs(sin(a_meshCoord.x * PI));</pre>',
            '<pre class="code">  vec4 pos = a_position;</pre>',
            '<pre class="code">  pos.z = -140.0 * curve;</pre>',
            '<pre class="code">  gl_Position = u_projectionMatrix * transform * pos;</pre>',
            '<pre class="code">}</pre>',
            '</div>',
        '</div>'
    ].join(''));

    $.template('stages.1.7', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">Mine Mars Example</h1>',
            '<p>Fragment Shader</p>',
            '<div class="small-code">',
            '<pre class="code">precision mediump float;</pre>',
            '<pre class="code">void main() {</pre>',
            '<pre class="code">  float r = 1.0;</pre>',
            '<pre class="code">  float g = 1.0;</pre>',
            '<pre class="code">  float b = 1.0;</pre>',
            '<pre class="code">  float a = 1.0;</pre>',
            '<pre class="code">  css_ColorMatrix = mat4( r, 0.0, 0.0, 0.0,</pre>',
            '<pre class="code">    0.0, g, 0.0, 0.0,</pre>',
            '<pre class="code">    0.0, 0.0, b, 0.0,</pre>',
            '<pre class="code">    0.0, 0.0, 0.0, a );</pre>',
            '<pre class="code">}</pre>',
            '</div>',
        '</div>'
    ].join(''));

    $.template('stages.1.8', [
        '<div class="stage-box constance">',
            '<h2 class="itsame ">CSS Shader Resources</h1>',
            '<ul>',
                '<li><a href="https://dvcs.w3.org/hg/FXTF/raw-file/tip/custom/index.html" target="_blank">W3C Documentation</a></li>',
                '<li><a href="http://adobe.github.com/web-platform/samples/css-customfilters/" target="_blank">http://adobe.github.com/web-platform/samples/css-customfilters/</a></li>',
                '<li><a href="http://alteredqualia.com/css-shaders/article/" target="_blank">http://alteredqualia.com/css-shaders/article/</a>',
            '</ul>',
        '</div>'
    ].join(''));