#pragma strict

var liquid : GameObject;

var r : float;
var g : float;
var b : float;
var a : float;

function Start () {
	
	r = Random.Range(0f, 1f);
	g = Random.Range(0f, 1f);
	b = Random.Range(0f, 1f);
	a = Random.Range(0.1f, 0.9f);
	
	liquid.GetComponent(SpriteRenderer).color = Color(r,g,b,a);
	
}

function Tint ()
{
	
	//print ("Tinting");
	
	r += Random.Range(-0.05f,0.05f);
	g += Random.Range(-0.05f,0.05f);
	b += Random.Range(-0.05f,0.05f);
	a += Random.Range(-0.05f,0.05f);
	
	if (r < 0)
	{
		r = 0;
	}
	
	if (r > 1)
	{
		r = 1;
	}	
	
	if (g < 0)
	{
		g = 0;
	}
	
	if (g > 1)
	{
		g = 1;
	}	
	
	if (b < 0)
	{
		b = 0;
	}
	
	if (b > 1)
	{
		b = 1;
	}	
	
	if (a < 0.1)
	{
		a = 0.1;
	}
	
	if (a > 0.9)
	{
		a = 0.9;
	}
	
	liquid.GetComponent(SpriteRenderer).color = Color(r,g,b,a);
	
}