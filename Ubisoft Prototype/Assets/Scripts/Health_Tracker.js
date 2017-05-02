#pragma strict

var assignedPlayer : GameObject;

var text : UI.Text;

function Start () {
	
}

function Update () {
	
	if (assignedPlayer != null)
	{
		transform.position = assignedPlayer.transform.position;
		transform.position.y = assignedPlayer.transform.position.y + 1.5;
		
		text.text = assignedPlayer.GetComponent(Player_Control).health.ToString();
		
		text.color = assignedPlayer.GetComponent(Player_Control).pcol[assignedPlayer.GetComponent(Player_Control).playernum -1];
	}
	else
	{
		Destroy(gameObject);
	}
}
