var move = 0.5;
////COPIER
var verifcam = false; /////COPIER
var level = 1;

function render(env)
{
	env.setSkybox("skybox/skybox");
	
	var tab = parseLevel(level);
	renderLevel(tab, env);
	
}

function parseLevel(no)
{
	var chaine = chargeTab(no);
	
	var tab = new Array();
	
	for(var i = 0; i<16; i++)
	{
		tab[i] = new Array();
	} 
	var j = 0, k = 0;
	var test;
	for(var i = 0; i<chaine.length; i++)
	{
		test = chaine.substr(i,1);
		if(test == '\n')
			j++;
		else
		{
			if(k == 21)
				k = 0;
			tab[j][k] = chaine.substr(i, 1);
			k++;
		}
	}

	return tab;


}

function renderLevel(tab, env)
{
	var index = 1;
	score = 0;
	tabCollision = tab;
	PlayerPos = new Array();
	bouleX = new Array();
	bouleZ = new Array(); 
	bouleIndex = new Array();
	var indice = 0;
	
	env.shapes.push(BABYLON.Mesh.CreatePlane("Plane",1.0,env.scene));
	env.setShapeTexture(0, "Textures/grass1.jpg", 1.0);
	
	for(var i = 0; i < 16; i++)
	{
		for(var j = 0; j < 20;j++)
		{
			var car = tab[i][j];
			if(car == '1')
			{
				env.shapes.push(BABYLON.Mesh.CreatePlane("Plane",1.0,env.scene));
				env.setShapeTexture(index, "Textures/grass1.jpg", 1.0);
				env.setShapePosition(index, i, -0.5, j);
				env.shapes[index].rotation.x = 1.5707963267949;
				index++
			}
			
			else if(car == '#')
			{
				env.shapes.push(BABYLON.Mesh.CreateBox("Box", 1.0, env.scene));
				env.setShapeTexture(index, "Textures/wall.jpg", 1.0);
				env.setShapePosition(index, i, 0, j);
				index++;
			}
			
			else if (car == '-')
			{
				env.shapes.push(BABYLON.Mesh.CreatePlane("Plane",1.0,env.scene));
				env.setShapeTexture(index, "Textures/floor.jpg", 1.0);
				env.setShapePosition(index, i, -0.5, j);
				env.shapes[index].rotation.x = 1.5707963267949;
				index++;				
			}
			else if(car =='$')
			{
				env.shapes.push(BABYLON.Mesh.CreatePlane("Plane",1.0,env.scene));
				env.setShapeTexture(index, "Textures/floor.jpg", 1.0);
				env.setShapePosition(index, i, -0.5, j);
				env.shapes[index].rotation.x = 1.5707963267949;
				index++;	
				env.shapes.push(BABYLON.Mesh.CreateSphere("Sphere",20.0,1.0,env.scene));
				env.setShapeTexture(index, "Textures/bloc1.jpg", 1.0);
				env.setShapePosition(index, i, 0, j);
				bouleX[indice] = i;
				bouleZ[indice] = j;
				bouleIndex[indice] = index;
				indice++;
				index++;				
			}
			else if(car == '.')
			{
				env.shapes.push(BABYLON.Mesh.CreatePlane("Plane",1.0,env.scene));
				env.setShapeTexture(index, "Textures/target2.jpg", 1.0);
				env.setShapePosition(index, i, -0.5, j);
				env.shapes[index].rotation.x = 1.5707963267949;
				index++;					
			}
			
			else if (car == '@')
			{
				env.shapes.push(BABYLON.Mesh.CreatePlane("Plane",1.0,env.scene));
				env.setShapeTexture(index, "Textures/floor.jpg", 1.0);
				env.setShapePosition(index, i, -0.5, j);
				env.shapes[index].rotation.x = 1.5707963267949;
				index++;	
				env.shapes.push(BABYLON.Mesh.CreateSphere("Sphere",20.0,1.0,env.scene));
				env.setShapeTexture(index, "Textures/player.jpg", 1.0);
				env.setShapePosition(index, i, 0, j);
				PlayerPos[0] = index; PlayerPos[1] = i; PlayerPos[2] = j;
				indicePlayer = index;
				index++;			
			}
		}
	}
	
}

function checkDouble(ind, touche)
{
	switch (touche)
	{
		case 90: // Z
		{
			for (var i = 0; i< bouleIndex.length; i++)
			{
				if (i != ind)
				{
					if(((bouleX[ind]-1) == bouleX[i]) && (bouleZ[ind] == bouleZ[i]))
						return false;
				}
			}
			return true;
		}
		case 83: // S
		{
			for (var i = 0; i< bouleIndex.length; i++)
			{
				if (i != ind)
				{
					if(((bouleX[ind]+1) == bouleX[i]) && (bouleZ[ind] == bouleZ[i]))
						return false;
				}
			}
			return true;
		}	
		case 81: // S
		{
			for (var i = 0; i< bouleIndex.length; i++)
			{
				if (i != ind)
				{
					if(((bouleX[ind]) == bouleX[i]) && (bouleZ[ind]-1 == bouleZ[i]))
						return false;
				}
			}
			return true;
		}	
		case 68: // S
		{
			for (var i = 0; i< bouleIndex.length; i++)
			{
				if (i != ind)
				{
					if(((bouleX[ind]) == bouleX[i]) && (bouleZ[ind]+1 == bouleZ[i]))
						return false;
				}
			}
			return true;
		}		
	}
}

function verifAll()
{
	var verif = true;
	for(var i = 0; i<bouleIndex.length;i++)
	{
			if(tabCollision[bouleX[i]][bouleZ[i]] !='.' )
				verif = false;
	}
	
	if(verif == true){
		alert("TOUTES LES BOULES ONT ETE PLACEES");
		level++
		render(env);
	}
}


function BoulesMoves (index, posX, posZ, touche)
{
	switch (touche)
	{
		case 90 : 
			env.setShapePosition(index, posX-1, 0, posZ);
			return true;

		case 83 :
			env.setShapePosition(index, posX+1, 0, posZ);
			return true;
		case 81 : 
			env.setShapePosition(index, posX, 0, posZ-1);
			return true;
		case 68 : 
			env.setShapePosition(index, posX, 0, posZ+1);
			return true;
	}
	return false;
}

function checkPlayerBoule(touche)
{
	var colRes;
	switch (touche)
	{
		case 90: // Z
		{
			for(var i = 0; i<bouleIndex.length; i++)
			{
				if(PlayerPos[1]-1 == bouleX[i] && PlayerPos[2] == bouleZ[i])
				{
					colRes = checkBouleCol(i,90);
					if(colRes == false)
					{
						if(checkDouble(i, 90))
						{
							res = BoulesMoves(bouleIndex[i], bouleX[i], bouleZ[i], touche);
						
								if(res == true)
								{
									bouleX[i]-=1.0;
									valBal(i);
									return true;
								}
						}
							else{
								return false;
							}
						}
					
					else
					{
						return false;
					}
				}
			}
			return true;
		}
		
		case 83: // S
		{
			for(var i = 0; i<bouleIndex.length; i++)
			{
				if(PlayerPos[1]+1 == bouleX[i] && PlayerPos[2] == bouleZ[i])
				{
					colRes = checkBouleCol(i,83);
					if(colRes == false)
					{
						if(checkDouble(i, 83))
						{
							res = BoulesMoves(bouleIndex[i], bouleX[i], bouleZ[i], touche);
								if(res == true)
								{
									bouleX[i]+=1.0;
									valBal(i);
									return true;
								}
						}
						else{
							return false;
						}	

					}
					else
					{
						return false;
					}
				}
			}
			return true;
		}
		
		case 81: // Q
		{
			for(var i = 0; i<bouleIndex.length; i++)
			{
				if(PlayerPos[1] == bouleX[i] && PlayerPos[2]-1 == bouleZ[i])
				{
					colRes = checkBouleCol(i,81);
					if(colRes == false)
					{
						if(checkDouble(i, 81))
						{
							res = BoulesMoves(bouleIndex[i], bouleX[i], bouleZ[i], touche);
						
								if(res == true)
								{
									bouleZ[i]-=1.0;
									valBal(i);
									return true;
								}
						}
							else{
								return false;
							}
					}
					else
					{
						return false;
					}
				}
			}
			return true;	
		}
		
		case 68: // D
		{
			for(var i = 0; i<bouleIndex.length; i++)
			{
				if(PlayerPos[1] == bouleX[i] && PlayerPos[2]+1 == bouleZ[i])
				{
					colRes = checkBouleCol(i,68);
					if(colRes == false)
					{
						if(checkDouble(i, 68))
						{

							res = BoulesMoves(bouleIndex[i], bouleX[i], bouleZ[i], touche);
						
								if(res == true)
								{
									bouleZ[i]+=1.0;
									valBal(i);
									return true;
								}
						}
						else{
							return false;
						}
					
					}
					else
					{
						return false;
					}
				}
			}
			return true;
		}
		
	}		
}

function valBal(ind)
{
		if(tabCollision[bouleX[ind]][bouleZ[ind]] == '.')
		{
			env.setShapeTexture(bouleIndex[ind], "Textures/val.jpg", 1.0);
		}
}



function checkCol(touche)
{

	switch (touche)
	{
		case 90 : //Z
		{

			if(tabCollision[PlayerPos[1]-1][PlayerPos[2]] == '#')
				return true;
		}
		case 83 : // S
		{

			if(tabCollision[PlayerPos[1]+1][PlayerPos[2]] == '#')
				return true;	
		}	
		case 81 : // Q
		{

			if(tabCollision[PlayerPos[1]][PlayerPos[2]-1] == '#')
				return true;
		}
		case 68 : // D
		{

			if(tabCollision[PlayerPos[1]][PlayerPos[2]+1] == '#')
				return true;
		}		
	}
	return false
}



function checkBouleCol (ind, touche)
{
	switch (touche)
	{
		case 90: // Z
		{

				if(tabCollision[bouleX[ind]-1][bouleZ[ind]] == '#')
					return true;
	
						
		}
		
		case 83: // S
		{

				if(tabCollision[bouleX[ind]+1][bouleZ[ind]] == '#')
					return true;

						
		}
		
		case 81: // Q
		{

				if(tabCollision[bouleX[ind]][bouleZ[ind]-1.0] == '#')
					return true;	
						
		}
		
		case 68: // D
		{

				if(tabCollision[bouleX[ind]][bouleZ[ind]+1] == '#')
					return true;

						
		}
	}
	return false;
}




function chargeTab(no){
	
	if (window.XMLHttpRequest)
	{
		xhr = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			xhr.responseText;	
		}
	}
	xhr.open("GET","Tableaux/php"+no+".php", false);
	xhr.send(null);
	return xhr.responseText;
	
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
	var resB = false;
	
	switch (key)
	{
		case 13:
			alert("return");
		break;
		case 32:		
			alert("space");
		break;
		case 90: // Z
		{
		
			if(checkCol(90))
			{
				
				break;
			}
			else
			{
				
				if (checkPlayerBoule(90) == true)
				{	
					env.setShapePosition(PlayerPos[0], PlayerPos[1]-1.0, 0, PlayerPos[2]);
					PlayerPos[1] -= 1.0; 
					augmenterScore()
					verifAll();
					break;
				}
				else
				{
					break;
				}
			}
		}

		case 83: // S
		{
			if(checkCol(83))
			{
				
				break;
			}
			else
			{
				if(checkPlayerBoule(83))
				{
					checkPlayerBoule(83);
					env.setShapePosition(PlayerPos[0], PlayerPos[1]+1.0, 0, PlayerPos[2]);
					PlayerPos[1] += 1.0; 
					augmenterScore()
					verifAll();
					break;
				}
				else
				{

					break;	
				}
			}
		}		
		
		case 81: //Q
		{
			if(checkCol(81))
			{
				
				break;
			}
			else
			{
				if(checkPlayerBoule(81))
				{
					checkPlayerBoule(81);
					env.setShapePosition(PlayerPos[0], PlayerPos[1], 0, PlayerPos[2]-1.0);
					PlayerPos[2] -= 1.0; 
					augmenterScore()
					verifAll();
					break;
				}
				else
				{
					break;	
				}
			}
		}
		
		case 68: // D
		{
			if(checkCol(68))
			{
				
				break;
			}
			else
			{
				if(checkPlayerBoule(68))
				{
					checkPlayerBoule(68);
					env.setShapePosition(PlayerPos[0], PlayerPos[1], 0, PlayerPos[2]+1.0);
					PlayerPos[2] += 1.0; 
					augmenterScore()
					verifAll();
					break;
				}
				else
				{

					break;	
				}
			}
		}
		
				//// A COPIER
		case 67: // c
		{
			
			
			if(verifcam == false){
				verifcam = true;
				
		var tes22t = env.scene.activeCamera;
		tes22t.cameraDirection = new BABYLON.Vector3(0, 1, 1);
		tes22t.cameraRotation = new BABYLON.Vector2 (0, -0.10);

			}else if(verifcam == true){
				verifcam = false;
		var tes22t = env.scene.activeCamera;
		tes22t.cameraDirection = new BABYLON.Vector3(0, -1, -1);
		tes22t.cameraRotation = new BABYLON.Vector2 (0, 0.10);

			}
		
			break;
		}
		
		default:
			break;
	}		
}

function augmenterScore()
{
	
	chaine = document.getElementById("score");
	score ++;
	chaine.innerHTML = "Score : "+score;
	
}

window.onload = 
function ()
{
	 env = new Environment("canvas", "Music/song.mp3", render, animate, keyFunc); 
	
	env.exec();
}