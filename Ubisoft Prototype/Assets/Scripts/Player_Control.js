#pragma strict

var thrust : float;

var playernum : int;

var trail : GameObject;

var coldis : GameObject;
var pcol : Color[];
var pcolname : String[];

var cam : GameObject;

var active : boolean;

var health : int;

var wintext : GameObject;

var cplay : GameObject[];

function Start () {
	
	//trail.GetComponent(ParticleSystem).sortingLayerName = "Beamground";
	coldis.GetComponent(SpriteRenderer).color = pcol[playernum-1];
	cam = GameObject.Find("Main Camera");
	
	wintext = GameObject.Find("Win_Text");
	
}

function FixedUpdate () {
	
	if (active)
	{
		//Rotate using physics
		if (Input.GetAxisRaw("Horizontal" + playernum) != 0)
		{
			GetComponent(Rigidbody2D).AddTorque(Input.GetAxisRaw("Horizontal" + playernum) * -4000 * Time.deltaTime, ForceMode2D.Force);
		}
	}
	
	//Cancel Momentum
	GetComponent(Rigidbody2D).angularVelocity = 0;
	
	//Slow velocity
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

function Injured (amount : int) {
	
	health -= amount;
	
	if (health <= 0)
	{
		health = 0;
		Die();
	}
	
}

function Die () {
	
	//Die Logic
	health = 0;
	transform.tag = "Corpse";
	transform.GetChild(3).transform.tag = "Untagged";
	cam.SendMessage("RecalculatePlayers");
	active = false;
	
	GameObject.Find("Controller").SendMessage("DeathCheck");
	
}











