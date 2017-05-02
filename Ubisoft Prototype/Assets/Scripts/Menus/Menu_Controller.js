#pragma strict

var menu : GameObject;
var game : GameObject;

var cam : GameObject;
var pan : Vector3[];

var mainMenu : GameObject;
var playMenu : GameObject;
var customMenu : GameObject;
var htpMenu : GameObject;
var creditsMenu : GameObject;

var curMenu : GameObject;

var controller : GameObject;

var playerAmountSlider : GameObject;
var playerAmountText : GameObject;

var trackSlider : GameObject;
var trackText : GameObject;

function Start ()
{
	MainMenu();
}

function MainMenu () {
	
	curMenu.SetActive(false);
	curMenu = mainMenu;
	
	mainMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[0];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

function PlayMenu () {
	
	curMenu.SetActive(false);
	curMenu = playMenu;
	
	playMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[1];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

function CustomMenu () {
	
	SetPlayers();
	
	curMenu.SetActive(false);
	curMenu = customMenu;
	
	customMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[2];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

function HTPMenu () {
	
	curMenu.SetActive(false);
	curMenu = htpMenu;
	
	htpMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[4];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

function CreditsMenu () {
	
	curMenu.SetActive(false);
	curMenu = creditsMenu;
	
	creditsMenu.SetActive(true);
	cam.GetComponent(Camera_Controller).tpos = pan[3];
	cam.GetComponent(Camera_Controller).tzoom = 10;
	
}

function Exit () {
	
	Application.Quit();
	//UnityEditor.EditorApplication.isPlaying = false;
	
}

function GameScreen () {
	
	curMenu.SetActive(false);
	
	cam.GetComponent(Camera_Controller).tpos = pan[0];
	cam.GetComponent(Camera_Controller).tzoom = 12;

	cam.GetComponent(Camera_Controller).beginning = true;
	
}

// PLAY MENU OPTIONS
function ModPlayerAmount () {
	
	playerAmountText.GetComponent(UI.Text).text = playerAmountSlider.GetComponent(UI.Slider).value.ToString() + " Players";
	
}

function ChangeTrack () {
	
	trackText.GetComponent(UI.Text).text = "Track " + trackSlider.GetComponent(UI.Slider).value.ToString();
	controller.SendMessage("ChangeTrack", trackSlider.GetComponent(UI.Slider).value);
	
}

function SetPlayers ()
{
	//Send Player Amount + Gamemode
	controller.SendMessage("SpawnPlayers", playerAmountSlider.GetComponent(UI.Slider).value);
}