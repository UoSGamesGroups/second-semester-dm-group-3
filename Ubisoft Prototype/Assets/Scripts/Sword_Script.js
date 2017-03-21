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
	
	if (coll.collider.gameObject.tag == "Player")
	{
		
		//coll.transform.SendMessage("Die");
		
		//Knockback and add point
		for (var p: GameObject in players) 
		{
			var dir = coll.contacts[0].point - p.transform.position;
			
			var exp = dir.normalized * -10;
			
			print(exp);
			
			p.GetComponent(Rigidbody2D).AddForce(exp, ForceMode2D.Impulse);
		}
		
		//coll.contacts[0].point
		
	}
	
}