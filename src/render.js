window.onload = 
function ()
{

	var env = new Environment("canvas", "Music/song.mp3", render); 
	
	env.exec();
}

function render(env)
{
	env.setSkybox("skybox/skybox");
	
	env.shapes.push(BABYLON.Mesh.CreateBox("Box", 6.0, env.scene));
	env.shapes.push(BABYLON.Mesh.CreateSphere("Sphere", 10.0, 10.0, env.scene));
	env.shapes.push(BABYLON.Mesh.CreatePlane("Plane", 50.0, env.scene));
	env.shapes.push(BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, env.scene, false));
	env.shapes.push(BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, env.scene, false));
	
	env.setShapePosition(0, -10, 0, 0);
    env.setShapePosition(1, 0, 10, 0);
	env.setShapePosition(2, 0, 0, 10);
	env.setShapePosition(3, 0, 0, -10);
	env.setShapePosition(4, 10, 0, 0);
	
	env.setShapeTexture(0, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(1, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(2, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(3, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(4, "Textures/uptron.jpg", 1.0);
}