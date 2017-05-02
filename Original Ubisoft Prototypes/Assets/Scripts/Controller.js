#pragma strict

function Start () {
	
}

function Update () {

	//Esc to quit
	if (Input.GetKey(KeyCode.R))
	{
		SceneManagement.SceneManager.LoadScene (SceneManagement.SceneManager.GetActiveScene().name);
	}
	
}
