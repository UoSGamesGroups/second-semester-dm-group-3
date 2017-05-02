#pragma strict

var barx : float;
var bary : float;

var beampoint : GameObject;

var reeldistance : float;
var stabspeed : float;

var impactthresh : float;

var acceleration : float;
var maxspeed : float;

var iscarry : boolean;
var carrying : GameObject;

var stunned : boolean;

var isP2 : boolean;

function Start () {
	
	GetComponent(LineRenderer).sortingLayerName = "Beamground";
	
}

function FixedUpdate () {
	
	var dir : Vector2;
	
	//Movement
	//Player 1
	if (isP2 == false)
	{
		if (stunned == false)
		{
			//Movement
			dir = new Vector2(Input.GetAxisRaw("Horizontal"),Input.GetAxisRaw("Vertical"));
			
			transform.Translate(dir.normalized * acceleration * Time.deltaTime, Space.World);
			
			//Disable Momentum
			GetComponent(Rigidbody2D).velocity = new Vector2(0, 0);
			GetComponent(Rigidbody2D).angularVelocity = 0;
			
			//Stablize
			transform.rotation = Quaternion.Lerp (transform.rotation, Quaternion.identity, Time.deltaTime * stabspeed);
			
			//Fire Meme Beam
			if (Input.GetAxisRaw("Fire1") != 0)
			{
				if (iscarry == false)
				{
					FireBeam();
				}
				else
				{
					Release();
				}
			}
		}
	}
	else
	{
		if (stunned == false)
		{
			//Movement
			dir = new Vector2(Input.GetAxisRaw("Horizontal2"),Input.GetAxisRaw("Vertical2"));
			
			transform.Translate(dir.normalized * acceleration * Time.deltaTime, Space.World);
			
			//Disable Momentum
			GetComponent(Rigidbody2D).velocity = new Vector2(0, 0);
			GetComponent(Rigidbody2D).angularVelocity = 0;
			
			//Stablize
			transform.rotation = Quaternion.Lerp (transform.rotation, Quaternion.identity, Time.deltaTime * stabspeed);
			
			//Fire Meme Beam
			if (Input.GetAxisRaw("Fire2") != 0)
			{
				if (iscarry == false)
				{
					FireBeam();
				}
				else
				{
					Release();
				}
			}
		}
	}
	
}

function Update () {
	
	//Never Leave
	if (transform.position.x > barx)
	{
		transform.position.x = barx;
	}	
	
	if (transform.position.x < -barx)
	{
		transform.position.x = -barx;
	}
	
	if (transform.position.y > bary)
	{
		transform.position.y = bary;
	}
	
	//Draw Beam
	if (carrying != null)
	{
		GetComponent(LineRenderer).enabled = true;
		GetComponent(LineRenderer).SetPosition(0, beampoint.transform.position);
		GetComponent(LineRenderer).SetPosition(1, carrying.transform.position);
	}
	else
	{
		GetComponent(LineRenderer).enabled = false;
	}
	
	//Retract Beam
	if (GetComponent(DistanceJoint2D).distance > reeldistance)
	{
		GetComponent(DistanceJoint2D).distance -= 3 * Time.deltaTime;
	}
	else
	{
		GetComponent(DistanceJoint2D).distance = reeldistance;
	}
	
}

function FireBeam () {
	
	var dir : Vector2 = transform.position - transform.up* 1000;
	
	//Raycast down and attach
	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, dir);
	
	Debug.DrawLine (transform.position, hit.point, Color.green);
	
	if(hit.transform.tag == "Pickup") {
	
		print("Caught Object");
		
		GetComponent(DistanceJoint2D).enabled = true;
		GetComponent(DistanceJoint2D).connectedBody = hit.transform.gameObject.GetComponent(Rigidbody2D);
		
		//Expand Beam
		GetComponent(DistanceJoint2D).distance = Vector2.Distance(transform.position, hit.transform.position);
		
		carrying = hit.transform.gameObject;
		yield WaitForSeconds (0.2);
		iscarry = true;
		
	}
	
}

function Release () {
	
	GetComponent(DistanceJoint2D).connectedBody = null;
	GetComponent(DistanceJoint2D).enabled = false;
	carrying = null;
	yield WaitForSeconds (0.2);
	iscarry = false;
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	
	print("Dink");
	
	if (coll.gameObject.tag == "Pickup")
	{
		
		var impact = coll.gameObject.GetComponent(Rigidbody2D).mass * coll.gameObject.GetComponent(Rigidbody2D).velocity.magnitude;
		
		print(impact);
		
		if (impact > 1)
		{
			//print("Drop");
			Release();
		}
		
		if (impact > 3 && impact < impactthresh)
		{
			//print("Stunned");
			stunned = true;
			GetComponent(Rigidbody2D).gravityScale = 1;
			
			yield WaitForSeconds (1);
			
			stunned = false;
			GetComponent(Rigidbody2D).gravityScale = 0;
		}		
		
		if (impact > 5 && impact < impactthresh)
		{
			//print("Stunned");
			stunned = true;
			GetComponent(Rigidbody2D).gravityScale = 1;
			
			yield WaitForSeconds (1);
			
			stunned = false;
			GetComponent(Rigidbody2D).gravityScale = 0;
		}
		
		if (impact > impactthresh)
		{
			print("Dead");
			Destroy(gameObject);
		}
	}
	
}
