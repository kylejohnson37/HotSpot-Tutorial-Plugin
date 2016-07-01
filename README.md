# HotSpot-Tutorial-Plugin
JavaScript HotSpot Tutorial Plugin

# Motivation
This plugin can be used to display a HotSpot Tutorial that you can set the content, size, and the color it is displayed in. This will be used as a way to show users how to use your webpage or software.

# How To Use
All you have to do is create each hotspot through the JSON style of storing information.
Ex. 
```
var options = [{
	"title": "Welcome!",
	"content": "This is your <u>second</u> tutorial!",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "200px",
		"width": "500px"
	},
	"position": "relative",
	"id": "test",
	"location": "bottom-right"
};
```
This will create a hotspot that looks like this.<br>
<img src="https://s31.postimg.org/5hc8xftxn/hotspot2.png"/>

The ID passed in is the ID you want to place your hotspot near. The location is how it is positioned next to this element. The position tag can also be changed to center to center the hotspot in the middle of the screen.

# Contributors
I am still open to suggestions of how this can be improve and made better. 

<b>----------This javascript plugin was made by Kyle Johnson <kyle.johnson@emu.edu>----------</b>
