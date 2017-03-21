#pragma strict

var bamount : float;

var bobpos : float;

function Start () {
	
	bobpos = transform.position.y;
	
}

function Update () {
	
	if (transform.position.y < bobpos)
	{
		transform.position.y += 1 * Time.deltaTime;
	}	
	
	if (transform.position.y > bobpos)
	{
		transform.position.y -= 1 * Time.deltaTime;
	}
	
}

function Bob () {
	
	transform.position.y -= bamount;
	
}