/////////////////
// GLOBAL DATA //
/////////////////

var data = {
	vehicles:[],
	characters:[],
	weapons:[],
	vehID:0,
	charID:0,
	wpnID:0
};

var temporary = {
	vehicles:[],
	characters:[],
	weapons:[]
};

///////////////////////
// UTILITY FUNCTIONS //
///////////////////////

var commonObjects = {
	pintle: {
		cost: 25,
		weight: 5
	},
	sponson: {
		cost: 75,
		weight: 100,
		crewRequired: 1,
		passengerCapacity: -1
	}
}


var gens = {
	rolla: {
		name:"rolling functions",
		d2:function(){return Math.ceil(Math.random()*2);},
		d4:function(){return Math.ceil(Math.random()*4);},
		d6:function(){return Math.ceil(Math.random()*6);},
		d8:function(){return Math.ceil(Math.random()*8);},
		d10:function(){return Math.ceil(Math.random()*10);},
		d12:function(){return Math.ceil(Math.random()*12);},	
	},
	armourName: function(e, p, t){
		var theName = "";
		if(t == 2){
			theName += "Thin ";
		}else if(t == 3){
			theName += "Light ";
		}else if(t == 4){
			theName += "Medium ";
		}else if(t == 5){
			theName += "Heavy ";
		}else if(t == 6){
			theName += "Thick ";
		}else{
			theName += "";
		}
		if(e == 4){
			if(p == 4){
				theName += "Softwood";
			}else if(p == 8){
				theName += "Hardwood";
			}else if(p == 12){
				theName += "Durcrillic";
			}else if(p == 16){
				theName += "Rubber";
			}else if(p == 20){
				theName += "Kinethmo";
			}
		}else if(e == 8){
			if(p == 4){
				theName += "Concrete";
			}else if(p == 8){
				theName += "Tin";
			}else if(p == 12){
				theName += "Aluminium";
			}else if(p == 16){
				theName += "Fibrester";
			}else if(p == 20){
			theName += "AB Coating";
			}
		}else if(e == 12){
			if(p == 4){
				theName += "Glass";
			}else if(p == 8){
				theName += "Clearplas";
			}else if(p == 12){
				theName += "Reactive";
			}else if(p == 16){
				theName += "Steel";
			}else if(p == 20){
				theName += "Plasteel";
			}
		}else if(e == 16){
			if(p == 4){
				theName += "Crystal";
			}else if(p == 8){
			theName += "Reflective";
			}else if(p == 12){
				theName += "Crystalline Mesh";
			}else if(p == 16){
				theName += "Trillium";
			}else if(p == 20){
				theName += "Neutronite";
			}
		}else if(e == 20){
			if(p == 4){
				theName += "Mirrorscale";
			}else if(p == 8){
				theName += "Plascrete";
			}else if(p == 12){
				theName += "Ceremite";
			}else if(p == 16){
				theName += "Adamantium";
			}else if(p == 20){
				theName += "Liquid Trillium";
			}
		}
		return theName;
	},
	catName: function(cat){
		var name = "";
		if(cat == 0.33){
			name = "Ordnance";
		}else if(cat == 0.5){
			name = "Heavy";
		}else if(cat == 1){
			name = "Basic";
		}else if(cat == 2){
			name = "Pistol";
		}else{
			name = "Error!";
		}
		return name;
	},
	findChar: function(id){
		for(let i=0;i<data.characters.length;i++){
			if(data.characters[i].charID === id){
				return data.characters[i];
			}
		}
		return null;
	},
	findWpn: function(id){
		for(let i=0;i<data.weapons.length;i++){
			if(data.weapons[i].wpnID === id){
				return data.weapons[i];
			}
		}
		return null;
	},
	findVeh: function(id){
		for(let i=0;i<data.vehicles.length;i++){
			if(data.vehicles[i].root.id === id){
				return data.vehicles[i];
			}
		}
		return null;
	},
	toTrueCase: function(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
};