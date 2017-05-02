#pragma strict

var players : GameObject[];

var center : Vector2;

var furthestDist : float;
var furthesta : GameObject;
var furthestb : GameObject;
var target : Vector3;

var vala : float;
var valb : float;

//Menu Transitions
var tspeed : float;
var tzoom : float;
var tpos : Vector3;

var beginning : boolean;

var controller : GameObject;

function Start () {

	players = GameObject.FindGameObjectsWithTag("Player");
	
}

function Update () {
	
	//If there are players
	if (players.length != 0)
	{
		//more than one of them
		if (players.length > 1)
		{
			//use them all to do something get fruther distance away
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
			
			//Get camera mid ground and slowly move to
			target = ((furthesta.transform.position - furthestb.transform.position)*0.5) +furthestb.transform.position;
			transform.position = Vector3.MoveTowards(transform.position, target, 25 * Time.deltaTime);
			transform.position.z = -10;
			
			if (furthestDist > vala)
			{
				GetComponent(Camera).orthographicSize = (furthestDist - (furthestDist * valb)) + 2;
			}
			
			furthesta = null;
			furthestb = null;
			furthestDist = 0;
		}
		else
		{
			//transform.position = players[0].transform.position;
			transform.position = Vector3.zero;
			transform.position.z = -10;
			GetComponent(Camera).orthographicSize = 10;
		}
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
					controller.GetComponent(Controller).counting = true;
					beginning = false;
				}
			}
		}
		
	}
	
}

function RecalculatePlayers () {

	if (GameObject.FindGameObjectsWithTag("Player") != null)
	{
		players = GameObject.FindGameObjectsWithTag("Player");
	}
	
	for (var p : GameObject in players)
	{
		p.GetComponent(Player_Control).active = true;
	}

}












