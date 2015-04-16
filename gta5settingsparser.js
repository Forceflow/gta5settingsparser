var $xml;

// define value -> setting translation
var DX_VERSION_SETTINGS = {};
DX_VERSION_SETTINGS["0"] = "DirectX 10";
DX_VERSION_SETTINGS["1"] = "DirectX 10.1";
DX_VERSION_SETTINGS["2"] = "DirectX 11";

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
SHADER_QUALITY_SETTINGS["3"] = "Ultra";  // unsure if it actually goes this far

var SHADOW_QUALITY_SETTINGS = {};
SHADOW_QUALITY_SETTINGS["0"] = "Low";
SHADOW_QUALITY_SETTINGS["1"] = "Normal";
SHADOW_QUALITY_SETTINGS["2"] = "High";
SHADOW_QUALITY_SETTINGS["3"] = "Very High";
SHADOW_QUALITY_SETTINGS["4"] = "Ultra";  // unsure if it actually goes this far

var GRASS_QUALITY_SETTINGS = {};
GRASS_QUALITY_SETTINGS["0"] = "Normal";
GRASS_QUALITY_SETTINGS["1"] = "High";
GRASS_QUALITY_SETTINGS["2"] = "Very High";
GRASS_QUALITY_SETTINGS["3"] = "Ultra"; // unsure if it actually goes this far

var WATER_QUALITY_SETTINGS = {};
WATER_QUALITY_SETTINGS["0"] = "Normal";
WATER_QUALITY_SETTINGS["1"] = "High";
WATER_QUALITY_SETTINGS["2"] = "Very High";
WATER_QUALITY_SETTINGS["3"] = "Ultra"; // unsure if it actually goes this far

var PARTICLE_QUALITY_SETTINGS = {};
PARTICLE_QUALITY_SETTINGS["0"] = "Normal";
PARTICLE_QUALITY_SETTINGS["1"] = "High";
PARTICLE_QUALITY_SETTINGS["2"] = "Very High";
PARTICLE_QUALITY_SETTINGS["3"] = "Ultra"; // unsure if it actually goes this far

var REFLECTION_QUALITY_SETTINGS = {};
REFLECTION_QUALITY_SETTINGS["0"] = "Normal";
REFLECTION_QUALITY_SETTINGS["1"] = "High";
REFLECTION_QUALITY_SETTINGS["2"] = "Very High";
REFLECTION_QUALITY_SETTINGS["3"] = "Ultra"; // unsure if it actually goes this far

var SHADOW_SHOFTSHADOWS_SETTINGS = {};
SHADOW_SHOFTSHADOWS_SETTINGS["0"] = "Hard";
SHADOW_SHOFTSHADOWS_SETTINGS["1"] = "Soft";
SHADOW_SHOFTSHADOWS_SETTINGS["2"] = "Softer";
SHADOW_SHOFTSHADOWS_SETTINGS["3"] = "Softest";
SHADOW_SHOFTSHADOWS_SETTINGS["4"] = "Nvidia PCSS";

function parseXML() {
	var inifile = $('textarea#inifile').val();
    var xmlDoc = $.parseXML( inifile );
	$xml = $( xmlDoc );
}

function writeLine(line){
	$("#parsed").val($("#parsed").val() + line + "\n");
}

function writeSettings(){
	// Video card and DirectX version
	var videocard = $xml.find("VideoCardDescription").text();
	var dx_version = $xml.find("DX_Version").attr("value");
	if(dx_version in DX_VERSION_SETTINGS){
		writeLine(videocard + " - "+ DX_VERSION_SETTINGS[dx_version]);
	}
	
	// Basics: screen width and height, refresh rate, windowed mode and vsync
	var width = $xml.find("ScreenWidth").attr("value");
	var height = $xml.find("ScreenHeight").attr("value");
	var refreshrate = $xml.find("RefreshRate").attr("value");
	var windowed = $xml.find("Windowed").attr("value");
	if(windowed == 0){windowed = "Fullscreen";}else{windowed = "Windowed";}
	var vsync = $xml.find("Vsync").attr("value");
	if(vsync == 0){vsync = "No V-sync";}else{vsync = "V-sync on";}
	writeLine(width + " x " + height + ", " + refreshrate + " hz, " + windowed + ", " + vsync);
	
	// Anti-aliasing: FXAA, MSAA, TXAA
	var FXAA = $xml.find("FXAA_Enabled").attr("value");
	if(FXAA == "false" || FXAA == "0" ){FXAA = "FXAA off";}else{FXAA = "FXAA on";}
	var MSAA = $xml.find("MSAA").attr("value");
	if(MSAA == 0){MSAA = "MSAA off";}else{MSAA = "MSAA " + MSAA + "x";}
	var TXAA = $xml.find("TXAA_Enabled").attr("value");
	if(TXAA == "false" || TXAA == "0"){TXAA = "TXAA off";}else{TXAA = "TXAA on";}
	writeLine(FXAA + ", " + MSAA + ", " + TXAA);
	
	// Population and distance scaling/variety
	var population_density = $xml.find("CityDensity").attr("value");
	population_density = (parseFloat(population_density) * 100).toFixed(0);
	var population_variety = $xml.find("PedVarietyMultiplier").attr("value");
	population_variety = (parseFloat(population_variety) * 100).toFixed(0);
	var distance_scaling = $xml.find("LodScale").attr("value");
	distance_scaling = (parseFloat(distance_scaling) * 100).toFixed(0);
	writeLine("Population density: " + population_density + "%");
	writeLine("Population variety: " + population_variety+ "%");
	writeLine("Distance scaling: " + distance_scaling+ "%");
	
	// Texture quality
	var texture_quality = $xml.find("TextureQuality").attr("value");
	if(texture_quality in TEXTURE_QUALITY_SETTINGS){
		writeLine("Texture quality: " + TEXTURE_QUALITY_SETTINGS[texture_quality]);
	} else {writeLine("UNKNOWN TEXTURE QUALITY");}
	
	// Shader quality
	var shader_quality = $xml.find("ShaderQuality").attr("value");
	if(shader_quality in SHADER_QUALITY_SETTINGS){
		writeLine("Shader quality: " + SHADER_QUALITY_SETTINGS[shader_quality]);
	} else {writeLine("UNKNOWN SHADER QUALITY");}

	// Shadow quality
	var shadow_quality = $xml.find("ShadowQuality").attr("value");
	if(shadow_quality in SHADOW_QUALITY_SETTINGS){
		writeLine("Shadow quality: " + SHADOW_QUALITY_SETTINGS[shadow_quality]);
	} else {writeLine("UNKNOWN SHADOW QUALITY");}

	// Reflection quality
	var reflection_quality = $xml.find("ReflectionQuality").attr("value");
	if(reflection_quality in REFLECTION_QUALITY_SETTINGS){
		writeLine("Reflection quality: " + REFLECTION_QUALITY_SETTINGS[reflection_quality]);
	} else {writeLine("UNKNOWN REFLECTION QUALITY");}

	// Reflection MSAA
	var reflection_msaa = $xml.find("ReflectionMSAA").attr("value");
	if(reflection_msaa == 0){
		writeLine("Reflection MSAA: Off");
	} else {
		writeLine("Reflection MSAA: " + reflection_msaa + "x");
	}

	// Water quality
	var water_quality = $xml.find("WaterQuality").attr("value");
	if(water_quality in WATER_QUALITY_SETTINGS){
		writeLine("Water quality: " + WATER_QUALITY_SETTINGS[water_quality]);
	} else {writeLine("UNKNOWN WATER QUALITY");}

	// Particle quality
	var particle_quality = $xml.find("ParticleQuality").attr("value");
	if(particle_quality in PARTICLE_QUALITY_SETTINGS){
		writeLine("Particle quality: " + PARTICLE_QUALITY_SETTINGS[particle_quality]);
	} else {writeLine("UNKNOWN PARTICLE QUALITY");}

	// Grass quality
	var grass_quality = $xml.find("GrassQuality").attr("value");
	if(grass_quality in GRASS_QUALITY_SETTINGS){
		writeLine("Grass quality: " + GRASS_QUALITY_SETTINGS[grass_quality]);
	} else {writeLine("UNKNOWN GRASS QUALITY");}

	// Soft shadows
	var shadow_softshadows = $xml.find("Shadow_SoftShadows").attr("value");
	if(shadow_softshadows in SHADOW_SHOFTSHADOWS_SETTINGS){
		writeLine("Soft shadows: " + SHADOW_SHOFTSHADOWS_SETTINGS[shadow_softshadows]);
	} else {writeLine("UNKNOWN SOFT SHADOW QUALITY");}

	// Tesselation
	var tesselation = $xml.find("Tessellation").attr("value");
	if(tesselation in TESSELATION_SETTINGS){
		writeLine("Tesselation: " + TESSELATION_SETTINGS[tesselation]);
	} else {writeLine("UNKNOWN TESSELATION SETTING");}
}

function parse(){
	$("#parsed").val('');
	parseXML();
	writeSettings();
	writeLine("Generated with Forceflow's GTA 5 settings parser");
}
