var i = 0;

function Environment(canvas, music, renderFunc)
{
	this.canvas = document.getElementById(canvas);

	if (!BABYLON.Engine.isSupported()) 
	{
        window.alert('Browser not supported');
	}
	
	this.engine = new BABYLON.Engine(this.canvas, true);
	this.scene = new BABYLON.Scene(this.engine);
	this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 10, -30), this.scene);
	this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), this.scene);
	this.shapes = new Array();
	this.music = document.getElementsByTagName("audio")[0];
	this.music.src = music;
	this.render = renderFunc;
}

Environment.prototype.setSkybox = 
function(path)
{
	this.skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
	skyboxMaterial.backFaceCulling = false;
	
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(path, this.scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	
	this.skybox.material = skyboxMaterial;
}

Environment.prototype.setShapeTexture =
function(id, path, alpha)
{
	this.shapes[id].material = new BABYLON.StandardMaterial("texture1", this.scene);
	this.shapes[id].material.diffuseTexture = new BABYLON.Texture(path, this.scene);
	this.shapes[id].material.diffuseTexture.uScale = 1.0;
	this.shapes[id].material.diffuseTexture.vScale = 1.0;
	this.shapes[id].material.alpha = alpha;
}

Environment.prototype.setShapePosition =
function(id, x, y, z)
{
	this.shapes[id].position = new BABYLON.Vector3(x,y,z);
}

Environment.prototype.exec =
function ()
{
	this.render(this);
	var scene = this.scene;

	this.scene.activeCamera.attachControl(canvas);

    this.engine.runRenderLoop(function () 
	{
		scene.render();
	});

    window.addEventListener("resize", function ()
	{
		this.engine.resize();
	});
}