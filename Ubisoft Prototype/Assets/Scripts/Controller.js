#pragma strict

var beats : float[];
var beat : int;
var bcount : float;

var players : GameObject[];
var bobbers : GameObject[];

var delay : float;

var player : GameObject;
var playpos : Vector3[];
var playrot : float[];

function Start () {
	
	//Set Timer
	bcount = beats[beat];
	
	players = GameObject.FindGameObjectsWithTag("Player");
	bobbers = GameObject.FindGameObjectsWithTag("Bobber");
	
}

function Update () {

	//Esc to quit
	if (Input.GetKey(KeyCode.R))
	{
		SceneManagement.SceneManager.LoadScene (SceneManagement.SceneManager.GetActiveScene().name);
	}
	
	if (delay < 0)
		{
		if (bcount > 0)
		{
			bcount -=  1 * Time.deltaTime;
		}
		else
		{
			if (beat < beats.Length - 1)
			{
				beat += 1;
			}
			else
			{
				beat = 0;
			}
		
			//Thrust
			players = GameObject.FindGameObjectsWithTag("Player");
			if (players.length > 1)
			{
				for (var p : GameObject in players)
				{
					if (p != null)
					{
						p.SendMessage("Thrust", 250 * beats[beat]);
					}
				}
				
				for (var b : GameObject in bobbers)
				{
					if (b != null)
					{
						b.SendMessage("Bob");
					}
				}
			}
		
			//Restart Timer
			bcount = beats[beat];
		}
	}
	else
	{
		delay -= 1 * Time.deltaTime;
	}
}

function SpawnPlayers (amount : int) {
	
	for (var i : int = 0; i < amount; i++)
	{
		var spawned = Instantiate(player, playpos[i], Quaternion.identity);
		spawned.transform.eulerAngles.z = playrot[i];
		spawned.GetComponent(Player_Control).playernum = i+1;
	}
	
}















