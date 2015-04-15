var $xml;

var TESSELATION_SETTINGS = {};
TESSELATION_SETTINGS["0"] = "Off";
TESSELATION_SETTINGS["1"] = "Normal";
TESSELATION_SETTINGS["2"] = "High";

function parseXML() {
	var inifile = $('textarea#inifile').val();
    var xmlDoc = $.parseXML( inifile );
	$xml = $( xmlDoc );
}

function writeLine(line){
	$("#parsed").append(line);
}

function writeSettings(){
	// screen width and height, refresh rate, windowed mode and vsync
	var width = $xml.find("ScreenWidth").attr("value");
	var height = $xml.find("ScreenHeight").attr("value");
	var refreshrate = $xml.find("RefreshRate").attr("value");
	var windowed = $xml.find("Windowed").attr("value");
	if(windowed == 0){windowed = "Fullscreen";}else {windowed = "Windowed";}
	var vsync = $xml.find("Vsync").attr("value");
	if(vsync == 0){vsync = "No V-sync";}else {vsync = "V-sync on";}
	writeLine("Resolution: " + width + " x " + height + ", " + refreshrate + " hz, " + windowed + ", " + vsync + " \n");
	
	// Tesselation
	var tesselation = $xml.find("Tessellation").attr("value");
	if(tesselation in TESSELATION_SETTINGS){
		writeLine("Tesselation : " + TESSELATION_SETTINGS[tesselation]);
	}
}

function parse(){
	parseXML();
	writeSettings();
}