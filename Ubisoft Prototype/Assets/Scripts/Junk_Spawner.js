#pragma strict

var worldx : float;
var worldy : float;

var junk : GameObject[];

var amount : int;

var players : GameObject[];

function Start () {
	
	if (amount == 0)
	{
		amount = Random.Range(3, 10);
	}
	
	players = GameObject.FindGameObjectsWithTag("Player");
	
	for (var i : int; i < amount; i++)
	{
		var spawned = Instantiate(junk[Random.Range(0,junk.Length)], new Vector3(Random.Range(-worldx,worldx), Random.Range(-worldy,worldy), 0), Quaternion.identity);
		spawned.transform.eulerAngles.z = Random.Range(0,360);
		
		for (var p : GameObject in players)
		{
			if (Vector2.Distance(spawned.transform.position, p.transform.position) < 3)
			{
				Destroy(spawned.gameObject);
			}
		}
	}
	
}

function Update () {
	
	
	
}
