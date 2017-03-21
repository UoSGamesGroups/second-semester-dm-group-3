#pragma strict

var players : GameObject[];

var center : Vector2;

var furthestDist : float;
var furthesta : GameObject;
var furthestb : GameObject;

var vala : float;
var valb : float;

//Menu Transitions
var tspeed : float;
var tzoom : float;
var tpos : Vector3;

var beginning : boolean;

function Start () {

	players = GameObject.FindGameObjectsWithTag("Player");
	
}

function Update () {
	
	if (players.length != 0)
	{
		for (var a : int = 0; a < players.length; a++)
		{
			for (var b : int = 0; b < players.length; b++)
			{
				if (a != b){
					if (Vector2.Distance(players[a].transform.position, players[b].transform.position) > furthestDist)
					{
					
						furthestDist = Vector2.Distance(players[a].transform.position, players[b].transform.position);
						furthesta = players[a];
						furthestb = players[b];
					
					}
				}
			}
		}
		
		transform.position = (furthesta.transform.position + furthestb.transform.position)/2;
		transform.position.z = -10;
		
		if (furthestDist > vala)
		{
			GetComponent(Camera).orthographicSize = furthestDist - (furthestDist * valb);
		}
		
		furthesta = null;
		furthestb = null;
		furthestDist = 0;
	}
	else
	{
		transform.position = Vector3.MoveTowards(transform.position, tpos, tspeed);
		
		if (tzoom > GetComponent(Camera).orthographicSize)
		{
			GetComponent(Camera).orthographicSize += tspeed * 4 * Time.deltaTime;
		}
		
		if (tzoom < GetComponent(Camera).orthographicSize)
		{
			GetComponent(Camera).orthographicSize -= tspeed * 4 * Time.deltaTime;
		}
		
		if (beginning == true)
		{
			if (transform.position == tpos)
			{
				if (tzoom - 0.1 < GetComponent(Camera).orthographicSize && tzoom + 0.1 > GetComponent(Camera).orthographicSize )
				{
					RecalculatePlayers();
				}
			}
		}
		
	}
	
}

function RecalculatePlayers () {

	print("HONK");

	if (GameObject.FindGameObjectsWithTag("Player") != null)
	{
		players = GameObject.FindGameObjectsWithTag("Player");
	}
	
	for (var p : GameObject in players)
	{
		p.GetComponent(Player_Control).active = true;
	}

}












