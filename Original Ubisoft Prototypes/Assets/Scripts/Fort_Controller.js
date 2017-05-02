#pragma strict

var placeables : GameObject[];

var citems : GameObject[];

var meteor : GameObject;

var sendamount : int;
var sent : int;
var stim : float;

function Start () {
	
}

function Update () {
	
	if (sent < sendamount && stim <= 0)
	{
		Instantiate(placeables[Random.Range(0, placeables.length-1)]);
		sent += 1;
		stim = 2;
		
		if (sent == sendamount){
			
			Doom();
			
		}
		
	}
	
	if (stim > 0 && sent != sendamount)
	{
		stim -= 1 * Time.deltaTime;
	}
	
}

function Doom () {
	
	yield WaitForSeconds(18);
	
	for (var i : int = 0 ; i < 10 ; i++)
	{
		Instantiate(meteor);
		yield WaitForSeconds(0.5);
	}
	
}