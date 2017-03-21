#pragma strict

var menu : GameObject;
var game : GameObject;

var cam : GameObject;
var pan : Vector3[];

var mainMenu : GameObject;
var playMenu : GameObject;
var customMenu : GameObject;

var controller : GameObject;

var playerAmountSlider : GameObject;
var playerAmountText : GameObject;

function Start () {
	
	//menu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[0];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

// MAIN MENU

function Play () {
	
	mainMenu.SetActive(false);
	playMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[1];
	cam.GetComponent(Camera_Controller).tzoom = 5;
	
}

function Options () {
	
	
	
}

function Credits () {
	
	
	
}

function Exit () {
	
	Application.Quit();
	//UnityEditor.EditorApplication.isPlaying = false;
	
}

// PLAY MENU

function ModPlayerAmount () {
	
	playerAmountText.GetComponent(UI.Text).text = playerAmountSlider.GetComponent(UI.Slider).value.ToString() + " Players";
	
}

function AcceptGamemode () {
	
	//Send Player Amount + Gamemode
	controller.SendMessage("SpawnPlayers", playerAmountSlider.GetComponent(UI.Slider).value);
	
	playMenu.SetActive(false);
	customMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[2];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

// CUSTOMISING SCREEN

function AcceptCustom () {
	
	customMenu.SetActive(false);
	menu.SetActive(false);
	game.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[3];
	cam.GetComponent(Camera_Controller).tzoom = 10;

	cam.GetComponent(Camera_Controller).beginning = true;
	
}