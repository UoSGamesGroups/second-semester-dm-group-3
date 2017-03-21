#pragma strict

var speed : float;

function Start () {
	
	GetComponent(ParticleSystem).GetComponent(Renderer).sortingLayerName = "Midground";
	
}

function Update () {
		
	transform.eulerAngles.z += speed * Time.deltaTime;
		
}
