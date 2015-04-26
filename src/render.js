var move = 0.5;

function render(env)
{
	env.setSkybox("skybox/skybox");
	
	env.shapes.push(BABYLON.Mesh.CreateBox("Box", 6.0, env.scene));
	env.shapes.push(BABYLON.Mesh.CreateSphere("Sphere", 10.0, 10.0, env.scene));
	env.shapes.push(BABYLON.Mesh.CreatePlane("Plane", 50.0, env.scene));
	env.shapes.push(BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, env.scene, false));
	env.shapes.push(BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, env.scene, false));
	env.shapes.push(BABYLON.Mesh.CreatePlane("Plane", 50.0, env.scene));
	
	env.setShapePosition(0, -10, 0, 0);
    env.setShapePosition(1, 0, 10, 0);
	env.setShapePosition(2, 0, 0, 10);
	env.setShapePosition(3, 0, 0, -10);
	env.setShapePosition(4, 10, 0, 0);
	env.setShapePosition(5, 0, 0, -10);
	
	env.setShapeTexture(0, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(1, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(2, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(3, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(4, "Textures/uptron.jpg", 1.0);
	env.setShapeTexture(5, "Textures/uptron.jpg", 1.0);
}

function animate(env)
{		
	if (env.shapes[0].intersectsMesh(env.shapes[2], false))
	{
		move = -1;
	} 
	
	else if (env.shapes[0].intersectsMesh(env.shapes[5], false))
	{
		move = 1;	
	}
	
	env.setShapePosition(0, 10, 0, env.shapes[0].position.z + move);
	
	env.shapes[0].material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
	
	for (i = 1 ; i < env.shapes.length ; i++)
	{
		env.shapes[i].material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
	
		if (env.shapes[0].intersectsMesh(env.shapes[i], false))
		{
			env.shapes[0].material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
			env.shapes[i].material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
		}
	}
	
}

function keyFunc(event)
{
	var key = event.keyCode;
	var ch = String.fromCharCode(key);
	
	switch (key) {
		case 13:
			alert("return");
		break;
		case 32:		
			alert("space");
		break;
		default:
			break;
	}		
}

window.onload = 
function ()
{
	var env = new Environment("canvas", "Music/song.mp3", render, animate, keyFunc); 
	
	env.exec();
}