var $xml;

var TESSELATION_SETTINGS = {};
TESSELATION_SETTINGS["0"] = "Off";
TESSELATION_SETTINGS["1"] = "Normal";
TESSELATION_SETTINGS["2"] = "High";

var TEXTURE_QUALITY_SETTINGS = {};
TEXTURE_QUALITY_SETTINGS["0"] = "Normal";
TEXTURE_QUALITY_SETTINGS["1"] = "High";
TEXTURE_QUALITY_SETTINGS["2"] = "Very High";

var SHADER_QUALITY_SETTINGS = {};
SHADER_QUALITY_SETTINGS["0"] = "Normal";
SHADER_QUALITY_SETTINGS["1"] = "High";
SHADER_QUALITY_SETTINGS["2"] = "Very High";

function parseXML() {
	var inifile = $('textarea#inifile').val();
    var xmlDoc = $.parseXML( inifile );
	$xml = $( xmlDoc );
}

function writeLine(line){
	$("#parsed").val($("#parsed").val() + line);
}

function writeSettings(){
	// Video card description
	var videocard = $xml.find("VideoCardDescription").text();
	writeLine(videocard + "\n");
	
	// Basics: screen width and height, refresh rate, windowed mode and vsync
	var width = $xml.find("ScreenWidth").attr("value");
	var height = $xml.find("ScreenHeight").attr("value");
	var refreshrate = $xml.find("RefreshRate").attr("value");
	var windowed = $xml.find("Windowed").attr("value");
	if(windowed == 0){windowed = "Fullscreen";}else{windowed = "Windowed";}
	var vsync = $xml.find("Vsync").attr("value");
	if(vsync == 0){vsync = "No V-sync";}else{vsync = "V-sync on";}
	writeLine(width + " x " + height + ", " + refreshrate + " hz, " + windowed + ", " + vsync + " \n");
	
	// Anti-aliasing: FXAA, MSAA, TXAA
	var FXAA = $xml.find("FXAA_Enabled").attr("value");
	if(FXAA == "false" || FXAA == "0" ){FXAA = "FXAA off";}else{FXAA = "FXAA on";}
	var MSAA = $xml.find("MSAA").attr("value");
	if(MSAA == 0){MSAA = "MSAA off";}else{MSAA = "MSAA " + MSAA + "x";}
	var TXAA = $xml.find("TXAA_Enabled").attr("value");
	if(TXAA == "false" || TXAA == "0"){TXAA = "TXAA off";}else{TXAA = "TXAA on";}
	writeLine(FXAA + ", " + MSAA + ", " + TXAA + "\n");
	
	// Population and distance scaling/variety
	var population_density = $xml.find("CityDensity").attr("value");
	population_density = parseFloat(population_density).toFixed(1);
	var population_variety = $xml.find("PedVarietyMultiplier").attr("value");
	population_variety = parseFloat(population_variety).toFixed(1);
	var distance_scaling = $xml.find("LodScale").attr("value");
	distance_scaling = parseFloat(distance_scaling).toFixed(1);
	writeLine("Population density: " + population_density + "\n");
	writeLine("Population variety: " + population_variety + "\n");
	writeLine("Distance scaling: " + distance_scaling + "\n");
	
	// Texture quality
	var texture_quality = $xml.find("TextureQuality").attr("value");
	if(texture_quality in TEXTURE_QUALITY_SETTINGS){
		writeLine("Texture quality : " + TEXTURE_QUALITY_SETTINGS[texture_quality] + "\n");
	}
	
	// Shader quality
	var shader_quality = $xml.find("ShaderQuality").attr("value");
	if(shader_quality in SHADER_QUALITY_SETTINGS){
		writeLine("Shader quality : " + SHADER_QUALITY_SETTINGS[shader_quality] + "\n");
	}
	
	// Tesselation
	var tesselation = $xml.find("Tessellation").attr("value");
	if(tesselation in TESSELATION_SETTINGS){
		writeLine("Tesselation : " + TESSELATION_SETTINGS[tesselation]);
	}
}

function parse(){
	$("#parsed").val('');
	parseXML();
	writeSettings();
}