#pragma strict

var liquid : GameObject;

function Start () {
	
	liquid.GetComponent(SpriteRenderer).color = Color(Random.value,Random.value,Random.value,0.5);
	
}

function Update () {
	
}
