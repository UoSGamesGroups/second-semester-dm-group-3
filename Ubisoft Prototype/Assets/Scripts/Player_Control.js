#pragma strict

var thrust : float;

var playernum : int;

var trail : GameObject;

var coldis : GameObject;
var pcol : Color[];

var cam : GameObject;

var active : boolean;

function Start () {
	
	//trail.GetComponent(ParticleSystem).sortingLayerName = "Beamground";
	coldis.GetComponent(SpriteRenderer).color = pcol[playernum-1];
	cam = GameObject.Find("Main Camera");
	
}

function FixedUpdate () {
	
	if (active)
	{
		//Rotate
		if (Input.GetAxisRaw("Horizontal" + playernum) != 0)
		{
			transform.eulerAngles.z += Input.GetAxisRaw("Horizontal" + playernum) * -250 * Time.deltaTime;
			GetComponent(Rigidbody2D).angularVelocity = 0;
		}
	}
	
	//Slow Momentum
	if (GetComponent(Rigidbody2D).velocity.magnitude > 1)
	{
		GetComponent(Rigidbody2D).velocity -= GetComponent(Rigidbody2D).velocity * 0.4 * Time.deltaTime ;
	}
}

function Thrust(force: float) {
	
	if (active)
	{
		GetComponent(Rigidbody2D).AddForce(transform.up * force * Time.deltaTime, ForceMode2D.Impulse);
		trail.GetComponent(ParticleSystem).Play();
	}
	
}

function OnTriggerEnter2D(coll: Collider2D) {
	
	if (coll.tag == "Liquid")
	{
		GetComponent(Rigidbody2D).gravityScale = 0;
	}
	
}

function OnTriggerExit2D(coll: Collider2D) {

	GetComponent(Rigidbody2D).gravityScale = 1;
	
}

function Die () {
	
	//Die Logic
	cam.SendMessage("RecalculatePlayers");
	transform.tag = "Corpse";
	active = false;
	
}











