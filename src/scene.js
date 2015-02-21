function createScene(engine)
{
    var scene = new BABYLON.Scene(engine);
	
	setSkybox(scene, "skybox/skybox");

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 10, -30), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);
	
	var box = BABYLON.Mesh.CreateBox("Box", 6.0, scene);
	var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10.0, 10.0, scene);
	var plan = BABYLON.Mesh.CreatePlane("Plane", 50.0, scene);
	var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, scene, false);
	var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);
	
	
    setPosition(sphere, 0, 10, 0);
	setPosition(plan, 0, 0, 10);
	setPosition(cylinder, 0, 0, -10);
	setPosition(torus, 10, 0, 0);	
	setPosition(box, -10, 0, 0);
	setTexture(scene, box, "Textures/uptron.jpg", 1.0);
	
	return scene;
}
	
function setSkybox(scene, path)
{
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skybox.material = skyboxMaterial;
	
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(path, scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
}

function setTexture(scene, shape, path, alpha)
{
	shape.material = new BABYLON.StandardMaterial("texture1", scene);
	shape.material.diffuseTexture = new BABYLON.Texture(path, scene);
	shape.material.diffuseTexture.uScale = 1.0;
	shape.material.diffuseTexture.vScale = 1.0;
	shape.material.alpha = alpha;
}

function setPosition(shape, x, y, z)
{
	shape.position = new BABYLON.Vector3(x,y,z);
}