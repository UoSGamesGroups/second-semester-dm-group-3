#pragma strict

var curParent : GameObject;

var players : GameObject[];

function Start () {
	
	curParent = gameObject.transform.parent.gameObject;
	players = GameObject.FindGameObjectsWithTag("Player");
	
}

function Update () {
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	
	if (coll.collider.gameObject.tag == "Player" && transform.tag == "Sword")
	{
		
		//coll.transform.SendMessage("Die");
		
		//Knockback all players
		for (var p: GameObject in players) 
		{
			
			if (p != null)
			{
				var dir = coll.contacts[0].point - p.transform.position;
				
				var exp = dir.normalized * -10;
				
				if (Vector3.Distance(p.transform.position, dir) < 25)
				{
					p.GetComponent(Rigidbody2D).AddForce(exp, ForceMode2D.Impulse);
				}
			}
		}
		
		//coll.contacts[0].point
		
		coll.gameObject.SendMessage("Injured", 1);
		
		GetComponent(AudioSource).Play();
		
	}
	
}