#pragma strict

function OnTriggerEnter2D(coll: Collider2D) {
	
	if (coll.tag == "Liquid")
	{
		GetComponent(Rigidbody2D).gravityScale = 0;
	}
	
}

function OnTriggerExit2D(coll: Collider2D) {

	GetComponent(Rigidbody2D).gravityScale = 1;
	
}