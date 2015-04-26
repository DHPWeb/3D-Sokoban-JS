
function rotateMap(dir, tab)
{
	switch(dir)
	{
		case 0:
			for(var i = 0 ; i < tab.length ; i++)
			{
				for(var j = 0 ; j < tab[i].length ; j++)
				{
					for (var k = 0 ; k < tab[i][j].length ; k++)
					{
						tab[i][k][j] = tab[i][j][k];
					}
				}
			}
			break;
			
		case 1:
			for(var i = 0 ; i < tab.length ; i++)
			{
				for(var j = 0 ; j < tab[i].length ; j++)
				{
					for (var k = 0 ; k < tab[i][j].length ; k++)
					{
						tab[k][j][i] = tab[i][j][k];
					}
				}
			}
			break;
			
		case 2:
			break;
			
		case 3:
			break;
			
		case 4:
			break;
			
		case 5:
			break;
			
		case 6:
			break;
			
		case 7:
			break;
	}
}