#pragma strict

var mcam : GameObject;

var mousepos : Vector2;

var conveyer : boolean;
var pickedup : boolean;

function Start () {
	
	transform.position = new Vector2(12, 3);
	
	mcam = GameObject.Find("Main Camera");
	
	GetComponent(Rigidbody2D).isKinematic = true;
	
}

function Update () {
	
	if (conveyer)
	{
		transform.position.x -= 1 * Time.deltaTime;
	}
	
}

function OnMouseDrag () {
	
	if (pickedup == false)
	{
		
		mousepos = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
		
		transform.position = mcam.GetComponent(Camera).ScreenToWorldPoint(mousepos);
		
		transform.position.z = 0;
		
		transform.eulerAngles.z += Input.GetAxis("MouseScroll") * 1 * Time.deltaTime;
		
		GetComponent(Rigidbody2D).velocity = new Vector2(0, 0);
	}
	
}

function OnMouseUp () {
	
	GetComponent(Rigidbody2D).isKinematic = false;
	conveyer = false;
	pickedup = true;
	
}