#pragma strict

var worldx : float;
var worldy : float;

var objRadius : float;

function Start () {
	
	worldx = 9;
	worldy = 5;
	
}

function FixedUpdate () {
	
	//World Wrap
	if (transform.position.x > worldx + objRadius){
		transform.position.x = -worldx - objRadius;
	}	
	
	if (transform.position.x < -worldx - objRadius){
		transform.position.x = worldx + objRadius;
	}

	if (transform.position.y > worldy + objRadius){
		transform.position.y = -worldy - objRadius;
	}	
	
	if (transform.position.y < -worldy - objRadius){
		transform.position.y = worldy + objRadius;
	}
}
