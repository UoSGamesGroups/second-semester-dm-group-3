#pragma strict

var thrust : float;

var ttmax : float;
var tt : float;

var playernum : int;

var trail : GameObject;

function Start () {
	
	trail.GetComponent(TrailRenderer).sortingLayerName = "Beamground";
	
}

function Update () {
	
	if (tt < ttmax)
	{
		tt += 1 * Time.deltaTime;
	}
	else
	{
		trail.GetComponent(TrailRenderer).enabled = false;
	}
	
	//Thrust
	if (tt >= ttmax && Input.GetAxisRaw("Fire" + playernum) != 0)
	{
		GetComponent(Rigidbody2D).AddForce(transform.up * thrust * Time.deltaTime, ForceMode2D.Impulse);
		tt = 0;
		trail.GetComponent(TrailRenderer).enabled = true;
	}
	
	//Slow Momentum
	if (GetComponent(Rigidbody2D).velocity.magnitude > 1)
	{
		GetComponent(Rigidbody2D).velocity -= GetComponent(Rigidbody2D).velocity * 0.4 * Time.deltaTime ;
	}
	
}

function OnTriggerEnter2D(coll: Collider2D) {
	
	if (coll.tag == "Player")
	{
		
		if (GetComponent(Rigidbody2D).velocity.magnitude > 4)
		{
			print("Dead");
			coll.transform.SendMessage("Die");
		}
		
	}
	
}

function Die () {
	
	Destroy(gameObject);
	
}