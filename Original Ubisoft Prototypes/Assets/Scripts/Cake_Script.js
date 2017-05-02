#pragma strict

function Start () {
	
}

function Update () {
	
}

function OnCollisionEnter2D (coll: Collision2D) {
	
	if (coll.transform.tag == "Hazard")
	{
		Destroy(gameObject);
	}
	
}