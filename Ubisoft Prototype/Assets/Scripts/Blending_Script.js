#pragma strict

var bforce : float;

var controller : GameObject;

function Start ()
{
	bforce = 50;
	controller = GameObject.Find("Controller");
}

// Update is called once per frame
function Update () 
{
	
	//Grab all players and obstacles and drag down, also enable bubbles?
	var victims = new List.<GameObject>();
	
	victims.AddRange(GameObject.FindGameObjectsWithTag("Player"));
	victims.AddRange(GameObject.FindGameObjectsWithTag("Corpse"));
	victims.AddRange(GameObject.FindGameObjectsWithTag("Obstacle"));
	
	for (var g : GameObject in victims)
	{
		
		g.GetComponent(Rigidbody2D).AddForce(-Vector3.up * Time.deltaTime * bforce, ForceMode2D.Force);
		
	}
	
}

function OnCollisionEnter2D (coll : Collision2D)
{
	
	if (coll.transform.tag == "Obstacle")
	{
		controller.SendMessage("Tint");
		Destroy(coll.gameObject);
	}	
	
	if (coll.transform.tag == "Corpse")
	{
		Destroy(coll.gameObject);
	}
	
}