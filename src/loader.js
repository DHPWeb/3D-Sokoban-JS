window.onload = function(){
    var canvas = document.getElementById("canvas");

    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        
        var engine = new BABYLON.Engine(canvas, true);

        scene = createScene(engine);

        scene.activeCamera.attachControl(canvas);

        engine.runRenderLoop(function () 
			{
				scene.render();
			});

        window.addEventListener("resize", function ()
			{
				engine.resize();
			});
    } 
};