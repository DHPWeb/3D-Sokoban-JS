function newGame()
{
	var div = document.getElementById("newGame");
	var PseudoText = document.getElementById("pseudoText");
	var Pseudo = document.getElementById("Pseudo");
	
	
	if(pseudoText.value == "")
	{
		alert("Veuillez entrer un Pseudo");
		return;
	}
	
	Pseudo.innerHTML = PseudoText.value;
	div.style.display = "none";
		
}

function Maj()
{
	var Pseudo = document.getElementById("pseudoText");
	Pseudo.value = Pseudo.value.toUpperCase();
}