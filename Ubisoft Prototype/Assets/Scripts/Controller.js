import System.Collections.Generic;
#pragma strict

var beats : float[];
var beat : int;
var bcount : float;

var players : GameObject[];
var bobbers : GameObject[];

var delay : float;

var tracker : GameObject;

var player : GameObject;
var playpos : Vector3[];
var playrot : float[];

var counting : boolean;
var gameOn : boolean;
var matchCountdown : float;
var music : AudioSource;

var tracks : AudioClip[];

var ccam : GameObject;

//Blending
var blendybit : GameObject;
var blendcountdown : float;
var blending : boolean;
var blend : boolean;

//Obstacle Spawning
var obstacles : GameObject[];
var curobs : GameObject[];

//Victory Text
var wintext : GameObject;

function Start () {
	
	blendcountdown = Random.Range(10,15);
	
	//Set Timer
	bcount = beats[beat];
	
	players = GameObject.FindGameObjectsWithTag("Player");
	bobbers = GameObject.FindGameObjectsWithTag("Bobber");

	AddOb(Random.Range(5,15));
	
}

function Update () {
	
	//Match Countdown
	if (counting == true)
	{
		
		if (matchCountdown > 0)
		{
			matchCountdown -= 1 * Time.deltaTime;
		}
		else
		{
			counting = false;
			ccam.SendMessage("RecalculatePlayers");
			music.Play();
			matchCountdown = 2;
			gameOn = true;
		}
	}
	
	//Blend Countdown
	if (gameOn)
	{
		if (blendcountdown > 0)
		{
			blendcountdown -= 1 * Time.deltaTime;
		}
		else
		{
			if (blending)
			{
				blendybit.SetActive(false);
				blending = false;
				blendcountdown = Random.Range(10,15);
				AddOb(Random.Range(2,10));
			}
			else
			{
				blendybit.SetActive(true);
				blending = true;
				blendcountdown = Random.Range(5,10);
			}
		}
	}

	if (blend)
	{
		
		var victims = new List.<GameObject>();
		
		victims.AddRange(GameObject.FindGameObjectsWithTag("Player"));
		victims.AddRange(GameObject.FindGameObjectsWithTag("Corpse"));
		victims.AddRange(GameObject.FindGameObjectsWithTag("Obstacle"));
		
		//clean up
		if (victims.Count > 0)
		{
			blending = true;
			blendybit.SetActive(true);
			blendybit.GetComponent(Blending_Script).bforce = 500;
		}
		else
		{
			blending = false;
			blendybit.SetActive(false);
			blendcountdown = Random.Range(10,15);
			blendybit.GetComponent(Blending_Script).bforce = 50;
		}
		
	}
	
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
			//if (players.length > 1)
			//{
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
			//}
		
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
		
		var bspawned = Instantiate(tracker, playpos[i], Quaternion.identity);
		bspawned.GetComponent(Health_Tracker).assignedPlayer = spawned;
	}
	
}

function StopMusic ()
{
	
	music.Stop();
	
}

function ChangeTrack (i : int)
{
	
	GetComponent(AudioSource).clip = tracks[i-1];
	
	switch (i)
	{
		case 1 :
			beats[0] = 0.85;
		break;
		
		case 2 :
			beats[0] = 0.9;
		break;
		
		default :
			print("Track Error");
		break;
	}
	
}

function AddOb (a : int)
{
	for (var i : int = 0; i < a; i++)
	{
		var ob = Instantiate(obstacles[Random.Range(0,obstacles.Length)], new Vector3(0 + Random.Range(-8,8),30,0), Quaternion.identity);
		yield WaitForSeconds(0.3);
	}
}

function DeathCheck ()
{
	
	yield WaitForSeconds(1);
	
	//Get all players, check if 1 left, get them, set text
	var cplay = GameObject.FindGameObjectsWithTag("Player");
	
	if (cplay.length == 0)
	{
		
		if (wintext.GetComponent(UI.Text).text == "")
		{
			wintext.GetComponent(UI.Text).color = Color.black;
			wintext.GetComponent(UI.Text).text = "Everyone Loses!";
		}
		
	}
	
	if (cplay.length == 1)
	{
		
		wintext.GetComponent(UI.Text).color = cplay[0].GetComponent(Player_Control).pcol[cplay[0].GetComponent(Player_Control).playernum-1];
		wintext.GetComponent(UI.Text).text = cplay[0].GetComponent(Player_Control).pcolname[cplay[0].GetComponent(Player_Control).playernum-1] + " Wins!";
		
	}
		
	if (cplay.length == 1)
	{
	
		var t = GameObject.Find("Controller");
		
		t.GetComponent(Controller).blend = true;
		t.GetComponent(Controller).gameOn = false;
		
		
		
		//Countdown and reboot
		yield WaitForSeconds(5);
		
		var p = GameObject.FindGameObjectsWithTag("Player");
		
		for (var g : GameObject in p)
		{
			g.transform.tag = "Corpse";
		}
		
		ccam.SendMessage("RecalculatePlayers");
		
		wintext.GetComponent(UI.Text).text = " ";
		
		var g = GameObject.Find("Menu_Controller");
		g.SendMessage("MainMenu");
		
		t.SendMessage("StopMusic");
		
		yield WaitForSeconds(2);
		
		var clean = new List.<GameObject>();
		
		clean.AddRange(GameObject.FindGameObjectsWithTag("Corpse"));
		clean.AddRange(GameObject.FindGameObjectsWithTag("Player"));
		clean.AddRange(GameObject.FindGameObjectsWithTag("Obstacle"));
		
		for (var x : GameObject in clean)
		{
			Destroy(x);
		}
		
		t.GetComponent(Controller).blend = false;
		blending = false;
		blendybit.SetActive(false);
		blendcountdown = Random.Range(10,15);
		blendybit.GetComponent(Blending_Script).bforce = 50;
		
		AddOb(Random.Range(5,15));
		
	}
}






