#pragma strict

var speed : float;

function Start () {
	
	transform.eulerAngles.z = Random.Range(-90, 90);
	transform.position.y = 6;
	transform.position.x = Random.Range(-8f,8f);
	
	GetComponent(TrailRenderer).sortingLayerName = "Beamground";
	
	//Punt
	GetComponent(Rigidbody2D).AddForce(-transform.up * speed,  ForceMode2D.Impulse);
	
}

function Update () {
	
}

function OnCollisionEnter2D (coll: Collision2D) {
	
	GetComponent(TrailRenderer).enabled = false;
	
}