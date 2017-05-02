using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Killzone : MonoBehaviour {

	void OnCollisionEnter2D(Collision2D coll)
	{
		if (coll.collider.gameObject.tag == "Player")
		{
		
			coll.transform.SendMessage("Die");
			
		}
	}
}
