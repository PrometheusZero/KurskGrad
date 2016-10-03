///////////////
//GLOBAL DATA//
///////////////

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

/////////////////////
//UTILITY FUNCTIONS//
/////////////////////

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
	},
	ordnance: {
		battlecannon: {
			ordinary: {
				name: "Battlecannon",
				type: "p",
				strength: 8,
				die1: 8,
				die2: 8,
				delay: 1,
				ordRat: 2,
				cat: 0.33,
				range: 72,
				accx: 2,
				accY: 1,
				rof: 0,
				blast: 2,
				weightMod: 1,
			}
		}
	}
};

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

////////////////
//CONSTRUCTORS//
////////////////

var weapon = function(wpn){
	this.wpnID = 0;
	this.name = wpn.name;
	this.type = wpn.type;
	this.strength = wpn.str;
	this.die1 = wpn.die1;
	this.die2 = wpn.die2;
	this.delay = wpn.delay;
	this.ordnanceRating = wpn.ordRat;
	this.category = wpn.cat;
	this.categoryName = gens.catName(this.category);
	this.range = wpn.range;
	this.accX = wpn.accX;
	this.accY = wpn.accY;
	this.rateOfFire = wpn.rof;
	this.blastRadius = wpn.blast;
	this.weightMod = wpn.weightMod;
	this.lowRoll = function(){
		var result = this.strength + 2;
		return result;
	};
	this.highRoll = function(){
		var result = this.strength + this.die1 + this.die2;
		return result;
	};
	this.avgRoll = function(){
		var result = this.strength + ((this.die1 + 1) + (this.die2 + 1))/2;
		return result;
	};
	this.basicCost = function(){
		var highSquared = Math.pow(this.highRoll(),2);
		var lowSquared = Math.pow(this.lowRoll(),2);
		var avgSquared = Math.pow(this.avgRoll(),2);
		var diffSquared = highSquared - lowSquared;
		var high = this.highRoll();
		var low = this.lowRoll();
		var avg = this.avgRoll();
		var diff = high - low;
		var result = ( (diffSquared * avgSquared) / ((2*diff) + (2*avg)) )/4;
	//	var result = (((Math.pow(this.highRoll(),2) - Math.pow(this.lowRoll(),2)) * Math.pow(this.avgRoll(),2)/((2*(this.highRoll() - this.lowRoll())) + (2*this.avgRoll()))))/4;
		return result;
	};
	this.sizeMult = function(){
		var result = 1/(Math.sqrt(this.category));
		return result;
	};
	this.rofMult = function(){
		var result = Math.pow((this.rateOfFire/2),2) + 1;
		return result;
	};
	this.blastMult = function(){
		var result = Math.pow((this.blastRadius*0.4),2) + 1;
		return result;
	};
	this.rangeMult = function(){
		var result = this.range/(24/this.category);
		if (result < 1){
			result = Math.pow(result,2/3);
		}else{
			result = Math.pow(result,1.5);
		}
		return result;
	};
	this.accMult = function(){
		var result = Math.pow(Math.sqrt(this.accY/this.accX),Math.sqrt(this.range/24));
		return result;
	};
	this.ordMult = function(){
		var result = Math.sqrt(2/this.ordnanceRating);
		return result;
	};
	this.overCostMult = function(){
		var result = this.delay * this.sizeMult() * this.rofMult() * this.blastMult() * this.rangeMult() * this.accMult() * this.ordMult() * (1/this.weightMod);
		return result;
	};
	this.overWeightMult = function(){
		var result = this.rofMult() * this.blastMult() * this.rangeMult() * this.accMult() * (1/this.ordMult());
		return result;
	};
	this.totalCost = function(){
		var result = Math.round(this.basicCost() * this.overCostMult());
		return result;
	};
	this.totalWeight = function(){
		var result = 0;
		if(this.category == 0.33){
			result = Math.ceil((this.basicCost()+(this.overWeightMult()*250))*this.weightMod/10)*5;
		}else if(this.category == 0.5){
			result = Math.ceil((this.basicCost()+(this.overWeightMult()*200))*this.weightMod/20)*5;
		}else if(this.category == 1){
			result = Math.ceil((this.basicCost()+(this.overWeightMult()*150))*this.weightMod/40)*5;
		}else if(this.category == 2){
			result = Math.ceil((this.basicCost()+(this.overWeightMult()*100))*this.weightMod/50)*5;
		}
		return result;
	};
	this.equipStatus = {};
	this.equipStatus.isCarried = false;
	this.equipStatus.isEquipped = false;
	this.equipStatus.object = {};
	this.equipStatus.carriedBy = function(){
		var result = "";
		if(this.isCarried === false){
			result =  "";
		}else{
			if($.isNumeric(this.object.charID)){
				result = this.object.name;
			}else{
				result = "";
			}
		}
		return result;
	};
	this.equipStatus.attachedTo = function(){
		if(this.isCarried === false){
			return "";
		}else{
			if($.isNumeric(this.object.root.id)){
				return this.object.root.name;
			}else{
				return "";
			}
		}
	};
	temporary.weapons = [];
	temporary.weapons.push(this);
};

var character = function(chr){
	//base stats
	this.charID = 0;
	this.name = chr.name;
	this.rank = chr.rank;
	this.movement = function(){
		var result = 0;
		result = Math.ceil( (Math.sqrt(this.strength) + Math.sqrt(this.toughness))/this.encumbrance() );
		return result;
	};
	this.weaponSkill = chr.ws;
	this.ballisticSkill = chr.bs;
	this.strength = chr.s;
	this.toughness = chr.t;
	this.wounds = function(){
		return Math.ceil(this.initiative/20);
	};
	this.initiative = chr.i;
	this.attacks = function(){
		return Math.ceil((this.weaponSkill+this.ballisticSkill)/40);
	};
	this.leadership = chr.ld;
	this.experience = chr.xp;
	//equipped
	this.isLeftHandEquipped = false;
	this.leftHandEquip = {};
	this.isRightHandEquipped = false;
	this.rightHandEquip = {};
	this.isBothHandEquipped = false;
	this.bothHandEquip = {};
	this.isArmourEquipped = false;
	this.armourEquip = {};
	this.isEnergyShieldEquipped = false;
	this.energyShieldEquip = {};
	//all inventory (inc equip) - maybe...?
	this.inventory = [];
	this.inventoryWeight = function(){
		var invWgt = 0;
		for(let i=0;i<this.inventory.length;i++){
			invWgt += this.inventory[i].totalWeight();
		}
		return invWgt;
	};
	this.inventoryValue = function(){
		var invValue = 0;
		for(let i=0;i<this.inventory.length;i++){
			invValue += this.inventory[i].totalCost();
		}
		return invValue;
	};
	this.cost = chr.cost;
	this.characterWeight = function(){
		return (this.strength*15)+(this.toughness*15)+30;
	};
	this.totalValue = function(){
		return (this.cost + this.inventoryValue());
	};
	this.totalWeight = function(){
		return (this.characterWeight() + this.inventoryWeight());
	};
	this.carryCapacity = function(){
		return (this.strength*30)+(this.toughness*30)+30;
	};
	this.isOverencumbered = function(){
		if(this.inventoryWeight() > this.carryCapacity()){
			return true;
		}else{
			return false;
		}
	};
	this.encumbrance = function(){
		if(this.inventoryWeight() > this.carryCapacity()){
			return (this.inventoryWeight() / this.carryCapacity());
		}else{
			return 1;
		}
	};
	temporary.characters = [];
	temporary.characters.push(this);
};

var vehicle = function(veh){
	var that = this;
	this.root = {};
	this.root.name = veh.name;
	this.root.id = 0;
	this.root.passengerCapacity = 12;
	this.root.passengers = [];
	this.root.weight = 1000;
	this.root.cost = 200;
	this.root.loco = function(){
		if(veh.leftLoco === veh.rightLoco){
			return veh.leftLoco;
		}else{
			return "Error!";
		}
	};
	
	this.total = {};
	this.total.speed = function(){
		return Math.round(that.front.objects.object1.power / this.weight());
	};
	this.total.cost = function(){
		return Math.floor(
			that.front.subtotal.cost() +
			that.left.subtotal.cost() +
			that.right.subtotal.cost() +
			that.rear.subtotal.cost() +
			that.roof.subtotal.cost()
		);
	};
	this.total.weight = function(){
		return Math.floor(
			that.front.subtotal.weight() +
			that.left.subtotal.weight() +
			that.right.subtotal.weight() +
			that.rear.subtotal.weight() +
			that.roof.subtotal.weight()
		);	
	};
	this.total.crewRequired = function(){
		return (that.front.objects.object1.crewRequired + 
				that.left.status.sponson.crewRequired() + 
				that.right.status.sponson.crewRequired() + 
				that.roof.status.lightTurret.crewRequired() + 
				that.roof.status.heavyTurret.crewRequired()
		);
	};
	this.total.passengerCapacity = function(){
		var total = 0;
		total += that.root.passengerCapacity;
		total += that.front.objects.object1.passengerCapacity();
		total += that.left.status.sponson.passengerCapacity();
		total += that.right.status.sponson.passengerCapacity();
		total += that.roof.status.lightTurret.passengerCapacity();
		total += that.roof.status.heavyTurret.passengerCapacity();
		return total;
	};
	
	this.front = {};
	this.front.subtotal = {};
	this.front.subtotal.cost = function(){
		var subtotal = 0;
		if(that.front.objects.object1.cost){
			subtotal += that.front.objects.object1.cost();
		}
		if(that.front.objects.object2.cost){
			subtotal += that.front.objects.object2.cost();
		}
		if(that.front.objects.object3.cost){
			subtotal += that.front.objects.object3.cost();
		}
		if(that.front.objects.object4.cost){
			subtotal += that.front.objects.object4.cost();
		}
		if(that.front.objects.object5.cost){
			subtotal += that.front.objects.object5.cost();
		}
		if(that.front.armour.cost){
			subtotal += that.front.armour.cost();
		}
		return subtotal;
	};
	this.front.subtotal.weight = function(){
		var subtotal = 0;
		if(that.front.objects.object1.weight){
			subtotal += that.front.objects.object1.weight();
		}
		if(that.front.objects.object2.weight){
			subtotal += that.front.objects.object2.weight();
		}
		if(that.front.objects.object3.weight){
			subtotal += that.front.objects.object3.weight();
		}
		if(that.front.objects.object4.weight){
			subtotal += that.front.objects.object4.weight();
		}
		if(that.front.objects.object5.weight){
			subtotal += that.front.objects.object5.weight();
		}
		if(that.front.armour.weight){
			subtotal += that.front.armour.weight();
		}
		return subtotal;
	};
	this.front.status = {};
	this.front.status.armourBroken = false;
	this.front.status.hasWeapon = false;
	this.front.status.hasGunner = false;
	this.front.status.gunnerObject = {};
	
	this.front.objects = {};
	this.front.objects.object1 = {};
	this.front.objects.object1.mandatory = true;
	this.front.objects.object1.name = "engine";
	this.front.objects.object1.power = veh.engine;
	this.front.objects.object1.weight = function(){
		return this.power / 60;
	};
	this.front.objects.object1.cost = function(){
		var engCost = 0;
		for(let i=0; i < this.power / 30000; i++){
			engCost += i;
		}
		return ((engCost*50)+100);
	};
	this.front.objects.object1.crewRequired = 1;
	this.front.objects.object1.passengerCapacity = function(){
		return Math.floor(((this.power/30000)-1)/2) * -1;
	};
	this.front.objects.object1.damage = 0;
	
	this.front.objects.object2 = {};
	this.front.objects.object2.mandatory = true;
	this.front.objects.object2.name = "driver";
	this.front.objects.object2.hasDriver = false;
	this.front.objects.object2.cost = function(){
		result = 0;
		if(this.object.name){
			result += this.object.totalValue();
		}
		return result;
	};
	this.front.objects.object2.weight = function(){
		result = 0;
		if(this.object.name){
			result += this.object.totalWeight();
		}
		return result;
	};
	this.front.objects.object2.object = {};
	
	this.front.objects.object3 = {};
	this.front.objects.object3.mandatory = false;
	this.front.objects.object4 = {};
	this.front.objects.object4.mandatory = false;
	this.front.objects.object5 = {};
	this.front.objects.object5.mandatory = false;
	
	this.front.armour = {};
	this.front.armour.vsE = veh.frontArmVsE;
	this.front.armour.vsP = veh.frontArmVsP;
	this.front.armour.t = veh.frontArmT;
	this.front.armour.name = function(){
		return gens.armourName(this.vsE, this.vsP, this.t);
	};
	this.front.armour.cost = function(){
		return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/4*(this.t / 2);
	};
	this.front.armour.weight = function(){
		return (this.t - 1)*250;
	};
	this.front.armour.hp = function(){
		return (this.t * 10);
	};
	
	this.left = {};
	this.left.subtotal = {};
	this.left.subtotal.cost = function(){
		var subtotal = 0;
		if(that.left.status.sponson.cost){
			subtotal += that.left.status.sponson.cost();
		}
		if(that.left.status.pintle.cost){
			subtotal += that.left.status.pintle.cost();
		}
		if(that.left.objects.object1.cost){
			subtotal += that.left.objects.object1.cost();
		}
		if(that.left.objects.object2.cost){
			subtotal += that.left.objects.object2.cost();
		}
		if(that.left.objects.object3.cost){
			subtotal += that.left.objects.object3.cost();
		}
		if(that.left.objects.object4.cost){
			subtotal += that.left.objects.object4.cost();
		}
		if(that.left.objects.object5.cost){
			subtotal += that.left.objects.object5.cost();
		}
		if(that.left.armour.cost){
			subtotal += that.left.armour.cost();
		}
		return subtotal;
	};
	this.left.subtotal.weight = function(){
		var subtotal = 0;
		if(that.left.status.sponson.weight){
			subtotal += that.left.status.sponson.weight();
		}
		if(that.left.status.pintle.weight){
			subtotal += that.left.status.pintle.weight();
		}
		if(that.left.objects.object1.weight){
			subtotal += that.left.objects.object1.weight();
		}
		if(that.left.objects.object2.weight){
			subtotal += that.left.objects.object2.weight();
		}
		if(that.left.objects.object3.weight){
			subtotal += that.left.objects.object3.weight();
		}
		if(that.left.objects.object4.weight){
			subtotal += that.left.objects.object4.weight();
		}
		if(that.left.objects.object5.weight){
			subtotal += that.left.objects.object5.weight();
		}
		if(that.left.armour.weight){
			subtotal += that.left.armour.weight();
		}
		return subtotal;
	};
	this.left.status = {};
	this.left.status.hasWeapon = false;
	this.left.status.hasGunner = false;
	this.left.status.gunnerObject = {};
	this.left.status.sponson = {};
	this.left.status.sponson.hasSponson = veh.leftHasSponson;
	this.left.status.sponson.cost = function(){
		if(this.hasSponson){
			return commonObjects.sponson.cost;
		}else{
			return 0;
		}
	};
	this.left.status.sponson.weight = function(){
		if(this.hasSponson){
			return commonObjects.sponson.weight;
		}else{
			return 0;
		}
	};
	this.left.status.sponson.crewRequired = function(){
		if(this.hasSponson){
			return commonObjects.sponson.crewRequired;
		}else{
			return 0;
		}
	};
	this.left.status.sponson.passengerCapacity = function(){
		if(this.hasSponson){
			return commonObjects.sponson.passengerCapacity;
		}else{
			return 0;
		}
	};
	this.left.status.pintle = {};
	this.left.status.pintle.hasPintle = veh.leftHasPintle;
	this.left.status.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.left.status.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.left.status.hatch = {};
	this.left.status.hatch.hasHatch = veh.leftHasHatch;
	this.left.status.hatch.open = false;
	
	this.left.objects = {};
	this.left.objects.object1 = {};
	this.left.objects.object1.mandatory = true;
	this.left.objects.object1.name = veh.leftLoco;
	this.left.objects.object1.damage = 0;
	
	this.left.objects.object2 = {};
	this.left.objects.object2.mandatory = false;
	this.left.objects.object3 = {};
	this.left.objects.object3.mandatory = false;
	this.left.objects.object4 = {};
	this.left.objects.object4.mandatory = false;
	this.left.objects.object5 = {};
	this.left.objects.object5.mandatory = false;
	
	this.left.armour = {};
	this.left.armour.vsE = veh.leftArmVsE;
	this.left.armour.vsP = veh.leftArmVsP;
	this.left.armour.t = veh.leftArmT;
	this.left.armour.name = function(){
		return gens.armourName(this.vsE, this.vsP, this.t);
	};
	this.left.armour.cost = function(){
		if(that.left.status.sponson.hasSponson){
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/4*3*(this.t/2);
		}else{
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/2*(this.t/2);
		}
	};
	this.left.armour.weight = function(){
		if(that.left.status.sponson.hasSponson){
			return (this.t)*500;
		}else{
			return (this.t)*375;
		}
	};
	this.left.armour.hp = function(){
		return (this.t*10);
	};
	
	this.right = {};
	this.right.subtotal = {};
	this.right.subtotal.cost = function(){
		var subtotal = 0;
		if(that.right.status.sponson.cost){
			subtotal += that.right.status.sponson.cost();
		}
		if(that.right.status.pintle.cost){
			subtotal += that.right.status.pintle.cost();
		}
		if(that.right.objects.object1.cost){
			subtotal += that.right.objects.object1.cost();
		}
		if(that.right.objects.object2.cost){
			subtotal += that.right.objects.object2.cost();
		}
		if(that.right.objects.object3.cost){
			subtotal += that.right.objects.object3.cost();
		}
		if(that.right.objects.object4.cost){
			subtotal += that.right.objects.object4.cost();
		}
		if(that.right.objects.object5.cost){
			subtotal += that.right.objects.object5.cost();
		}
		if(that.right.armour.cost){
			subtotal += that.right.armour.cost();
		}
		return subtotal;
	};
	this.right.subtotal.weight = function(){
		var subtotal = 0;
		if(that.right.status.sponson.weight){
			subtotal += that.right.status.sponson.weight();
		}
		if(that.right.status.pintle.weight){
			subtotal += that.right.status.pintle.weight();
		}
		if(that.right.objects.object1.weight){
			subtotal += that.right.objects.object1.weight();
		}
		if(that.right.objects.object2.weight){
			subtotal += that.right.objects.object2.weight();
		}
		if(that.right.objects.object3.weight){
			subtotal += that.right.objects.object3.weight();
		}
		if(that.right.objects.object4.weight){
			subtotal += that.right.objects.object4.weight();
		}
		if(that.right.objects.object5.weight){
			subtotal += that.right.objects.object5.weight();
		}
		if(that.right.armour.weight){
			subtotal += that.right.armour.weight();
		}
		return subtotal;
	};
	this.right.status = {};
	this.right.status.hasWeapon = false;
	this.right.status.hasGunner = false;
	this.right.status.gunnerObject = {};
	this.right.status.sponson = {};
	this.right.status.sponson.hasSponson = veh.rightHasSponson;
	this.right.status.sponson.cost = function(){
		if(this.hasSponson){
			return commonObjects.sponson.cost;
		}else{
			return 0;
		}
	};
	this.right.status.sponson.weight = function(){
		if(this.hasSponson){
			return commonObjects.sponson.weight;
		}else{
			return 0;
		}
	};
	this.right.status.sponson.crewRequired = function(){
		if(this.hasSponson){
			return commonObjects.sponson.crewRequired;
		}else{
			return 0;
		}
	};
	this.right.status.sponson.passengerCapacity = function(){
		if(this.hasSponson){
			return commonObjects.sponson.passengerCapacity;
		}else{
			return 0;
		}
	};
	this.right.status.pintle = {};
	this.right.status.pintle.hasPintle = veh.rightHasPintle;
	this.right.status.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.right.status.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.right.status.hatch = {};
	this.right.status.hatch.hasHatch = veh.rightHasHatch;
	this.right.status.hatch.open = false;
	
	this.right.objects = {};
	this.right.objects.object1 = {};
	this.right.objects.object1.mandatory = true;
	this.right.objects.object1.name = veh.rightLoco;
	this.right.objects.object1.damage = 0;
	
	this.right.objects.object2 = {};
	this.right.objects.object2.mandatory = false;
	this.right.objects.object3 = {};
	this.right.objects.object3.mandatory = false;
	this.right.objects.object4 = {};
	this.right.objects.object4.mandatory = false;
	this.right.objects.object5 = {};
	this.right.objects.object5.mandatory = false;
	
	this.right.armour = {};
	this.right.armour.vsE = veh.rightArmVsE;
	this.right.armour.vsP = veh.rightArmVsP;
	this.right.armour.t = veh.rightArmT;
	this.right.armour.name = function(){
		return gens.armourName(this.vsE, this.vsP, this.t);
	};
	this.right.armour.cost = function(){
		if(that.right.status.sponson.hasSponson){
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/4*3*(this.t/2);
		}else{
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/2*(this.t/2);
		}
	};
	this.right.armour.weight = function(){
		if(that.right.status.sponson.hasSponson){
			return (this.t-1)*500;
		}else{
			return (this.t-1)*375;
		}
	};
	this.right.armour.hp = function(){
		return (this.t*10);
	};
	
	this.rear = {};
	this.rear.subtotal = {};
	this.rear.subtotal.cost = function(){
		var subtotal = 0;
		if(that.rear.status.pintle.cost){
			subtotal += that.rear.status.pintle.cost();
		}
		if(that.rear.objects.object1.cost){
			subtotal += that.rear.objects.object1.cost();
		}
		if(that.rear.objects.object2.cost){
			subtotal += that.rear.objects.object2.cost();
		}
		if(that.rear.objects.object3.cost){
			subtotal += that.rear.objects.object3.cost();
		}
		if(that.rear.objects.object4.cost){
			subtotal += that.rear.objects.object4.cost();
		}
		if(that.rear.objects.object5.cost){
			subtotal += that.rear.objects.object5.cost();
		}
		if(that.rear.armour.cost){
			subtotal += that.rear.armour.cost();
		}
		return subtotal;
	};
	this.rear.subtotal.weight = function(){
		var subtotal = 0;
		if(that.rear.status.pintle.weight){
			subtotal += that.rear.status.pintle.weight();
		}
		if(that.rear.objects.object1.weight){
			subtotal += that.rear.objects.object1.weight();
		}
		if(that.rear.objects.object2.weight){
			subtotal += that.rear.objects.object2.weight();
		}
		if(that.rear.objects.object3.weight){
			subtotal += that.rear.objects.object3.weight();
		}
		if(that.rear.objects.object4.weight){
			subtotal += that.rear.objects.object4.weight();
		}
		if(that.rear.objects.object5.weight){
			subtotal += that.rear.objects.object5.weight();
		}
		if(that.rear.armour.weight){
			subtotal += that.rear.armour.weight();
		}
		return subtotal;
	};
	this.rear.status = {};
	this.rear.status.hasWeapon = false;
	this.rear.status.hasGunner = false;
	this.rear.status.gunnerObject = {};
	this.rear.status.pintle = {};
	this.rear.status.pintle.hasPintle = veh.rearHasPintle;
	this.rear.status.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.rear.status.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.rear.status.hatch = {};
	this.rear.status.hatch.hasHatch = veh.rearHasHatch;
	this.rear.status.hatch.open = false;
	
	this.rear.objects = {};
	this.rear.objects.object1 = {};
	this.rear.objects.object1.mandatory = false;
	this.rear.objects.object2 = {};
	this.rear.objects.object2.mandatory = false;
	this.rear.objects.object3 = {};
	this.rear.objects.object3.mandatory = false;
	this.rear.objects.object4 = {};
	this.rear.objects.object4.mandatory = false;
	this.rear.objects.object5 = {};
	this.rear.objects.object5.mandatory = false;
	
	this.rear.armour = {};
	this.rear.armour.vsE = veh.rearArmVsE;
	this.rear.armour.vsP = veh.rearArmVsP;
	this.rear.armour.t = veh.rearArmT;
	this.rear.armour.name = function(){
		return gens.armourName(this.vsE, this.vsP, this.t);
	};
	this.rear.armour.cost = function(){
		return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/4*(this.t/2);
	};
	this.rear.armour.weight = function(){
		return (this.t-1)*250;
	};
	this.rear.armour.hp = function(){
		return (this.t*10);
	};
	
	this.roof = {};
	this.roof.subtotal = {};
	this.roof.subtotal.cost = function(){
		var subtotal = 0;
		if(that.roof.status.lightTurret.cost){
			subtotal += that.roof.status.lightTurret.cost();
		}
		if(that.roof.status.heavyTurret.cost){
			subtotal += that.roof.status.heavyTurret.cost();
		}
		if(that.roof.status.fixedMount.cost){
			subtotal += that.roof.status.fixedMount.cost();
		}
		if(that.roof.status.primaryWeapon.cost){
			subtotal += that.roof.status.primaryWeapon.cost();
		}
		if(that.roof.status.cupola.pintle.cost){
			subtotal += that.roof.status.cupola.pintle.cost();
		}
		if(that.roof.status.hatch.front.pintle.cost){
			subtotal += that.roof.status.hatch.front.pintle.cost();
		}
		if(that.roof.status.hatch.left.pintle.cost){
			subtotal += that.roof.status.hatch.left.pintle.cost();
		}
		if(that.roof.status.hatch.right.pintle.cost){
			subtotal += that.roof.status.hatch.right.pintle.cost();
		}
		if(that.roof.status.hatch.rear.pintle.cost){
			subtotal += that.roof.status.hatch.rear.pintle.cost();
		}
		if(that.roof.objects.object1.cost){
			subtotal += that.roof.objects.object1.cost();
		}
		if(that.roof.objects.object2.cost){
			subtotal += that.roof.objects.object2.cost();
		}
		if(that.roof.objects.object3.cost){
			subtotal += that.roof.objects.object3.cost();
		}
		if(that.roof.objects.object4.cost){
			subtotal += that.roof.objects.object4.cost();
		}
		if(that.roof.objects.object5.cost){
			subtotal += that.roof.objects.object5.cost();
		}
		if(that.roof.armour.cost){
			subtotal += that.roof.armour.cost();
		}
		return subtotal;
	};
	this.roof.subtotal.weight = function(){
		var subtotal = 0;
		if(that.roof.status.lightTurret.weight){
			subtotal += that.roof.status.lightTurret.weight();
		}
		if(that.roof.status.heavyTurret.weight){
			subtotal += that.roof.status.heavyTurret.weight();
		}
		if(that.roof.status.fixedMount.weight){
			subtotal += that.roof.status.fixedMount.weight();
		}
		if(that.roof.status.primaryWeapon.weight){
			subtotal += that.roof.status.primaryWeapon.weight();
		}
		if(that.roof.status.cupola.pintle.weight){
			subtotal += that.roof.status.cupola.pintle.weight();
		}
		if(that.roof.status.hatch.front.pintle.weight){
			subtotal += that.roof.status.hatch.front.pintle.weight();
		}
		if(that.roof.status.hatch.left.pintle.weight){
			subtotal += that.roof.status.hatch.left.pintle.weight();
		}
		if(that.roof.status.hatch.right.pintle.weight){
			subtotal += that.roof.status.hatch.right.pintle.weight();
		}
		if(that.roof.status.hatch.rear.pintle.weight){
			subtotal += that.roof.status.hatch.rear.pintle.weight();
		}
		if(that.roof.objects.object1.weight){
			subtotal += that.roof.objects.object1.weight();
		}
		if(that.roof.objects.object2.weight){
			subtotal += that.roof.objects.object2.weight();
		}
		if(that.roof.objects.object3.weight){
			subtotal += that.roof.objects.object3.weight();
		}
		if(that.roof.objects.object4.weight){
			subtotal += that.roof.objects.object4.weight();
		}
		if(that.roof.objects.object5.weight){
			subtotal += that.roof.objects.object5.weight();
		}
		if(that.roof.armour.weight){
			subtotal += that.roof.armour.weight();
		}
		return subtotal;
	};
	this.roof.status = {};
	this.roof.status.lightTurret = {};
	this.roof.status.lightTurret.hasLightTurret = veh.roofHasLightTurret;
	this.roof.status.lightTurret.cost = function(){
		if(this.hasLightTurret){
			return 100;
		}else{
			return 0;
		}
	};
	this.roof.status.lightTurret.weight = function(){
		if(this.hasLightTurret){
			return 100;
		}else{
			return 0;
		}
	};
	this.roof.status.lightTurret.crewRequired = function(){
		if(this.hasLightTurret){
			return 1;
		}else{
			return 0;
		}
	};
	this.roof.status.lightTurret.passengerCapacity = function(){
		if(this.hasLightTurret){
			return -2;
		}else{
			return 0;
		}
	};
	this.roof.status.heavyTurret = {};
	this.roof.status.heavyTurret.hasHeavyTurret = veh.roofHasHeavyTurret;
	this.roof.status.heavyTurret.cost = function(){
		if(this.hasHeavyTurret){
			return 200;
		}else{
			return 0;
		}
	};
	this.roof.status.heavyTurret.weight = function(){
		if(this.hasHeavyTurret){
			return 200;
		}else{
			return 0;
		}
	};
	this.roof.status.heavyTurret.crewRequired = function(){
		if(this.hasHeavyTurret){
			return 1;
		}else{
			return 0;
		}
	};
	this.roof.status.heavyTurret.passengerCapacity = function(){
		if(this.hasHeavyTurret){
			return -3;
		}else{
			return 0;
		}
	};
	this.roof.status.fixedMount = {};
	this.roof.status.fixedMount.hasFixedMount = veh.roofHasFixedMount;
	this.roof.status.fixedMount.cost = function(){
		if(this.hasFixedMount){
			return 25;
		}else{
			return 0;
		}
	};
	this.roof.status.fixedMount.weight = function(){
		if(this.hasFixedMount){
			return 25;
		}else{
			return 0;
		}
	};
	this.roof.status.primaryWeapon = {};
	this.roof.status.primaryWeapon.hasPrimaryWeapon = false;
	this.roof.status.primaryWeapon.hasGunner = false;
	this.roof.status.primaryWeapon.gunnerObject = {};
	this.roof.status.primaryWeapon.damage = 0;

	this.roof.status.cupola = {};
	this.roof.status.cupola.hasCupola = veh.roofHasCupola;
	this.roof.status.cupola.pintle = {};
	this.roof.status.cupola.pintle.hasPintle = veh.roofHasCupolaPintle;
	this.roof.status.cupola.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.roof.status.cupola.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.roof.status.cupola.open = false;
	this.roof.status.cupola.weapon = {};
	this.roof.status.cupola.weapon.hasWeapon = false;

	this.roof.status.hatch = {};
	this.roof.status.hatch.hasHatch = veh.roofHasHatch;
	this.roof.status.hatch.open = false;
	this.roof.status.hatch.front = {};
	this.roof.status.hatch.front.pintle = {};
	this.roof.status.hatch.front.pintle.hasPintle = veh.roofHasHatchPintleFront;
	this.roof.status.hatch.front.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.front.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.front.hasWeapon = false;
	this.roof.status.hatch.left = {};
	this.roof.status.hatch.left.pintle = {};
	this.roof.status.hatch.left.pintle.hasPintle = veh.roofHasHatchPintleLeft;
	this.roof.status.hatch.left.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.left.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.left.hasWeapon = false;
	this.roof.status.hatch.right = {};
	this.roof.status.hatch.right.pintle = {};
	this.roof.status.hatch.right.pintle.hasPintle = veh.roofHasHatchPintleRight;
	this.roof.status.hatch.right.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.right.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.right.hasWeapon = false;
	this.roof.status.hatch.rear = {};
	this.roof.status.hatch.rear.pintle = {};
	this.roof.status.hatch.rear.pintle.hasPintle = veh.roofHasHatchPintleRear;
	this.roof.status.hatch.rear.pintle.cost = function(){
		if(this.hasPintle){
			return commonObjects.pintle.cost;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.rear.pintle.weight = function(){
		if(this.hasPintle){
			return commonObjects.pintle.weight;
		}else{
			return 0;
		}
	};
	this.roof.status.hatch.rear.hasWeapon = false;
	
	this.roof.objects = {};
	this.roof.objects.object1 = {};
	this.roof.objects.object1.mandatory = false;
	this.roof.objects.object2 = {};
	this.roof.objects.object2.mandatory = false;
	this.roof.objects.object3 = {};
	this.roof.objects.object3.mandatory = false;
	this.roof.objects.object4 = {};
	this.roof.objects.object4.mandatory = false;
	this.roof.objects.object5 = {};
	this.roof.objects.object5.mandatory = false;
	
	this.roof.armour = {};
	this.roof.armour.vsE = veh.roofArmVsE;
	this.roof.armour.vsP = veh.roofArmVsP;
	this.roof.armour.t = veh.roofArmT;
	this.roof.armour.name = function(){
		return gens.armourName(this.vsE, this.vsP, this.t);
	};
	this.roof.armour.cost = function(){
		if(that.roof.status.lightTurret.hasLightTurret){
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/4*(this.t/2);
		}else if(that.roof.status.heavyTurret.hasHeavyTurret){
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/2*(this.t/2);
		}else if(that.roof.status.fixedMount.hasFixedMount){
			return ((Math.pow(this.vsE,2)*Math.pow(this.vsP,2))/(2*this.vsE + 2*this.vsP))/4*3*(this.t/2);
		}else{
			return 0;
		}
	};
	this.roof.armour.weight = function(){
		if(that.roof.status.lightTurret.hasLightTurret){
			return (this.t-1)*250;
		}else if(that.roof.status.heavyTurret.hasHeavyTurret){
			return (this.t-1)*375;
		}else if(that.roof.status.fixedMount.hasFixedMount){
			return (this.t-1)*500;
		}else{
			return 0;
		}
	};
	this.roof.armour.hp = function(){
		if(this.t === 0){
			return "";
		}else{
			return (this.t*10);
		}
	};
	
	temporary.vehicles = [];
	temporary.vehicles.push(this);
	localStorage.setItem("KurskGradVehicle", JSON.stringify(temporary.vehicles[0]));
};

//////////
//INPUTS//
//////////

var setters = {
	//TAKE USER INPUTS AND RUN WERAPON CONSTRUCTOR
	wpnSet:$('#wpnGen').click(function(){
		//populate object with user inputs
		var wpn = {};
		wpn.name = $('#wpnName').val();
		wpn.type = $('#wpnType').val();
		wpn.str = parseInt($('#wpnStr').val());
		wpn.die1 = parseInt($('#wpnDie1').val());
		wpn.die2 = parseInt($('#wpnDie2').val());
		wpn.delay = parseFloat($('#wpnDelay').val());
		wpn.ordRat = parseInt($('#wpnOR').val());
		wpn.cat = parseFloat($('#wpnCat').val());
		wpn.catName = gens.catName(wpn.cat);
		wpn.range = parseInt($('#wpnRng').val());
		wpn.accX = parseInt($('#wpnAccX').val());
		wpn.accY = parseInt($('#wpnAccY').val());
		wpn.rof = parseInt($('#wpnRoF').val());
		wpn.blast = parseInt($('#wpnBR').val());
		wpn.weightMod = parseFloat($('#wpnWgt').val());
		//trigger constructor, pass object. NB: constructor clears temporary weapon array.
		var thewpn = new weapon(wpn);
		//call dom updater
		domUpdate.wpnToBuy();
	}),
	//TAKE EXISTING PROPERTIES AND RUN WEAPON CONSTRUCTOR. AUTO-CALLS WPNBUY
	wpnDup:$('#wpnInfoContainer').on('click', '.dupBtn', function(){
		var wpnID = parseInt($(this).prop('id'));
		var wpnToDup = {};
		for(let i=0;i<data.weapons.length;i++){
			if(wpnID == data.weapons[i].wpnID){
				//populate new object with existing object data
				wpnToDup.name = data.weapons[i].name;
				wpnToDup.type = data.weapons[i].type;
				wpnToDup.str = data.weapons[i].strength;
				wpnToDup.die1 = data.weapons[i].die1;
				wpnToDup.die2 = data.weapons[i].die2;
				wpnToDup.delay = data.weapons[i].delay;
				wpnToDup.ordRat = data.weapons[i].ordnanceRating;
				wpnToDup.cat = data.weapons[i].category;
				wpnToDup.catName = data.weapons[i].categoryName;
				wpnToDup.range = data.weapons[i].range;
				wpnToDup.accX = data.weapons[i].accX;
				wpnToDup.accY = data.weapons[i].accY;
				wpnToDup.rof = data.weapons[i].rateOfFire;
				wpnToDup.blast = data.weapons[i].blastRadius;
				wpnToDup.weightMod = data.weapons[i].weightMod;
				//trigger constructor, pass new object. NB: constructor clears temporary weapon array.
				var duping = new weapon(wpnToDup);
				//automatically call buy process, no user interrupt, assumed by hitting the dup button that triggers this function
				setters.wpnBuy();
			}
		}
	}),
	//CALLED BY USER, JUST CALLS WPNBUY BELOW!
	wpnBuyUser:$('#wpnBUY').click(function(){
		setters.wpnBuy();
	}),
	//THE BUY PROCESS. TAKE TEMPORARY OBJECT AND PUSH TO DB. CALL DOM UPDATER FOR INVENTORY AND INFO.
	wpnBuy:function(){
		var thisWpn = temporary.weapons[0];
		
		thisWpn.wpnID = data.wpnID;
		data.wpnID++;
		
		data.weapons.push(thisWpn);
		domUpdate.infoWeapon(thisWpn);
		domUpdate.invWeapon();
		
		//reset for next
		temporary.weapons = [];
		domUpdate.wpnReset();
	},
	//TAKE USER INPUTS AND RUN VEHICLE CONSTRUCTOR
	vehSet:$('#vehGen').click(function(){
		//check engine and loco have been defined
		if(($('#vehEng').val() == null) || ($('#leftLoco').val() == null) || ($('#rightLoco').val() == null)){
			$('#vehTotalSpeed').text('Define Engine and Loco');
			return;
		}
		//populate object with user inputs
		var veh = {};
		veh.name = $('#vehName').val();
		veh.engine = parseInt($('#vehEng').val());
		//left set
		veh.leftLoco = $('#leftLoco').val();
		if($('#leftPanel').val() == "hatch"){
			veh.leftHasHatch = true;
			veh.leftHasSponson = false;
		}else if($('#leftPanel').val() == "sponson"){
			veh.leftHasSponson = true;
			veh.leftHasHatch = false;
		}else{
			veh.leftHasSponson = false;
			veh.leftHasHatch = false;
		}
		if($('#leftPintle').val() == "1"){
			veh.leftHasPintle = true;
		}else{
			veh.leftHasPintle = false;
		}
		//right set
		veh.rightLoco = $('#rightLoco').val();
		if($('#rightPanel').val() == "hatch"){
			veh.rightHasHatch = true;
			veh.rightHasSponson = false;
		}else if($('#rightPanel').val() == "sponson"){
			veh.rightHasSponson = true;
			veh.rightHasHatch = false;
		}else{
			veh.rightHasSponson = false;
			veh.rightHasHatch = false;
		}
		if($('#rightPintle').val() == "1"){
			veh.rightHasPintle = true;
		}else{
			veh.rightHasPintle = false;
		}
		//rear set
		if($('#rearPanel').val() == "hatch"){
			veh.rearHasHatch = true;
		}else{
			veh.rearHasHatch = false;
		}
		if($('#rearPintle').val() == "1"){
			veh.rearHasPintle = true;
		}else{
			veh.rearHasPintle = false;
		}
		//roof set
		veh.roofHasLightTurret = false;
		veh.roofHasHeavyTurret = false;
		veh.roofHasFixedMount = false;
		if($('#roofMount').val() == "lt"){
			veh.roofHasLightTurret = true;
		}else if($('#roofMount').val() == "ht"){
			veh.roofHasHeavyTurret = true;
		}else if($('#roofMount').val() == "fm"){
			veh.roofHasFixedMount = true;
		}
		if(($('#roofCupola').val() == "cupola") || ($('#roofCupola').val() == "1")){
			veh.roofHasCupola = true;
		}else{
			veh.roofHasCupola = false;
		}
		if($('#roofCupola').val() == "1"){
			veh.roofHasCupolaPintle = true;
		}else{
			veh.roofHasCupolaPintle = false;
		}
		veh.roofHasHatchPintleFront = false;
		veh.roofHasHatchPintleLeft = false;
		veh.roofHasHatchPintleRight = false;
		veh.roofHasHatchPintleRear = false;
		if($('#roofHatch').val() !== ""){
			veh.roofHasHatch = true;
			if(parseInt($('#roofHatch').val())){
				if($('#roofPintleFacing').val() == "front"){
					veh.roofHasHatchPintleFront = true;
					if($('#roofHatch').val() == "2"){
						veh.roofHasHatchPintleRear = true;
					}
				}else if($('#roofPintleFacing').val() == "rear"){
					veh.roofHasHatchPintleRear = true;
					if($('#roofHatch').val() == "2"){
						veh.roofHasHatchPintleFront = true;
					}
				}else if($('#roofPintleFacing').val() == "left"){
					veh.roofHasHatchPintleLeft = true;
					if($('#roofHatch').val() == "2"){
						veh.roofHasHatchPintleRight = true;
					}
				}else if($('#roofPintleFacing').val() == "right"){
					veh.roofHasHatchPintleRight = true;
					if($('#roofHatch').val() == "2"){
						veh.roofHasHatchPintleLeft = true;
					}
				}else{}
			}
		}else{
			veh.roofHasHatch = false;
		}
		//armour set
		veh.frontArmVsE = parseInt($('#frontArmVsE').val());
		veh.frontArmVsP = parseInt($('#frontArmVsP').val());
		veh.frontArmT = parseInt($('#frontArmT').val());

		veh.leftArmVsE = parseInt($('#leftArmVsE').val());
		veh.leftArmVsP = parseInt($('#leftArmVsP').val());
		veh.leftArmT = parseInt($('#leftArmT').val());

		veh.rightArmVsE = parseInt($('#rightArmVsE').val());
		veh.rightArmVsP = parseInt($('#rightArmVsP').val());
		veh.rightArmT = parseInt($('#rightArmT').val());

		veh.rearArmVsE = parseInt($('#rearArmVsE').val());
		veh.rearArmVsP = parseInt($('#rearArmVsP').val());
		veh.rearArmT = parseInt($('#rearArmT').val());
		
		if($('#roofMount').val() !== ""){
			veh.roofArmVsE = parseInt($('#roofArmVsE').val());
			veh.roofArmVsP = parseInt($('#roofArmVsP').val());
			veh.roofArmT = parseInt($('#roofArmT').val());
		}else{
			veh.roofArmVsE = 0;
			veh.roofArmVsP = 0;
			veh.roofArmT = 0;
		}
		
		//trigger constructor, pass object NB: constructor clears temporary weapon array
		var theveh = new vehicle(veh);
	
		//call dom updater
		domUpdate.vehToBuy();
	}),
	//THE BUY PROCESS. TAKE TEMPORARY OBJECT AND PUSH TO DB. CALL DOM UPDATER FOR INVENTORY AND INFO.
	vehBuy:$('#vehBUY').click(function(){
		var thisVeh = temporary.vehicles[0];
		
		thisVeh.root.id = data.vehID;
		data.vehID++;
		
		data.vehicles.push(thisVeh);
		domUpdate.infoVehicle(thisVeh);
		domUpdate.invVehicle();
		
		//reset for next
		temporary.vehicles = [];
		domUpdate.vehReset();
	}),
	//TAKES USER INPUTS AND RUN CHARACTER CONSTRUCTOR
	charSet:$('#charGen').change(function(){
		var chr = {};
		chr.name = $('#charName').val();
		chr.rank = $('#charGen').val();
		if($('#charGen').val() == "Leader"){
			chr.ws = 60 + gens.rolla.d6();
			chr.bs = 60 + gens.rolla.d6();
			chr.s = 3;
			chr.t = 3;
			chr.i = 40 + gens.rolla.d6();
			chr.ld = 45 + gens.rolla.d6();
			chr.cost = 240;
			chr.xp = 120;
		}else if($('#charGen').val() == "Engineer"){
			chr.ws = 40 + gens.rolla.d6();
			chr.bs = 60 + gens.rolla.d6();
			chr.s = 3;
			chr.t = 2;
			chr.i = 30 + gens.rolla.d6();
			chr.ld = 20 + gens.rolla.d6();
			chr.cost = 160;
			chr.xp = 70;
		}else if($('#charGen').val() == "Fighter"){
			chr.ws = 50 + gens.rolla.d6();
			chr.bs = 50 + gens.rolla.d6();
			chr.s = 2;
			chr.t = 2;
			chr.i = 20 + gens.rolla.d6();
			chr.ld = 30 + gens.rolla.d6();
			chr.cost = 100;
			chr.xp = 60;
		}else if($('#charGen').val() == "Green"){
			chr.ws = 30 + gens.rolla.d6();
			chr.bs = 30 + gens.rolla.d6();
			chr.s = 1;
			chr.t = 1;
			chr.i = 20 + gens.rolla.d6();
			chr.ld = 10 + gens.rolla.d6();
			chr.cost = 0;
			chr.xp = 0;
		}else{chr.ws=0;chr.bs=0;chr.s=0;chr.t=0;chr.i=0;chr.ld=0;}
		
		var theChar = new character(chr);
		
		if($('#charGen').val() == "Leader"){
			domUpdate.charToBuy.leader();
		}else if($('#charGen').val() == "Engineer"){
			domUpdate.charToBuy.engineer();
		}else if($('#charGen').val() == "Fighter"){
			domUpdate.charToBuy.fighter();
		}else if($('#charGen').val() == "Green"){
			domUpdate.charToBuy.green();
		}
	}),
	//THE BUY PROCESS. TAKE TEMPORARY OBJECT AND PUSH TO DB. CALL DOM UPDATER FOR INVENTORY AND INFO.
	charBuy:$('#charBUY').click(function(){
		var thisChar = temporary.characters[0];
		
		thisChar.charID = data.charID;
		data.charID++;
		
		data.characters.push(thisChar);
		domUpdate.infoCharacter(thisChar);
		domUpdate.invCharacter();
		
		temporary.characters = [];
		domUpdate.charReset();
	})
};

////////////////
//DOM UPDATERS//
////////////////

var domUpdate = {
	//UPDATES/ADDS TO INVENTORY -> STASH WEAPON TABLE
	invWeapon:function(){
		$('.wpnItem').remove();
		for(var i=0;i<data.weapons.length;i++){
			var stringBuilder = "";
			stringBuilder += '<tr id="' + data.weapons[i].wpnID + 'wpn" class="wpnItem">';
			stringBuilder += '<td>' + data.weapons[i].name + '</td>';
			stringBuilder += '<td>' + data.weapons[i].categoryName + '</td>';
			stringBuilder += '<td>' + data.weapons[i].strength + '</td>';
			stringBuilder += '<td>d' + data.weapons[i].die1 + '+d' + data.weapons[i].die2 + '</td>';
			stringBuilder += '<td>' + data.weapons[i].range + '</td>';
			stringBuilder += '<td>' + data.weapons[i].totalWeight() + '</td>';
			stringBuilder += '<td>' + data.weapons[i].totalCost() + '</td>';
			stringBuilder += '<td><input id="' + data.weapons[i].wpnID + '_wpn" class="invItem" type="button" value="..."></input></td>';
			stringBuilder += '</tr>';
			$('#wpnStorage').append(stringBuilder);
		}
	},
	infoWeapon:function(thisWpn){
		//CREATE RIGHT-SIDE INFO TABLE
		var stringBuilder = "";
		stringBuilder += '<table id="' + thisWpn.wpnID + '_wpnInfo" class="infoPage">';
		stringBuilder += '<tr><th colspan="2">' + thisWpn.name + '</th></tr>';
		stringBuilder += '<tr><td>Type: </td><td>' + thisWpn.type + '</td></tr>';
		stringBuilder += '<tr><td>Strength: </td><td>' + thisWpn.strength + '</td></tr>';
		stringBuilder += '<tr><td>Die 1: </td><td>d' + thisWpn.die1 + '</td></tr>';
		stringBuilder += '<tr><td>Die 2:</td><td>d' + thisWpn.die2 + '</td></tr>';
		stringBuilder += '<tr><td>Range: </td><td>' + thisWpn.range + '&#34;</td></tr>';
		stringBuilder += '<tr><td>Accuracy</td><td>' + thisWpn.accX + '&#37; per ' + thisWpn.accY + '&#34;</td></tr>';
		stringBuilder += '<tr><td>Rate of Fire: </td><td>' + thisWpn.rateOfFire + '</td></tr>';
		stringBuilder += '<tr><td>Blast Raduis: </td><td>' + thisWpn.blastRadius + '</td></tr>';
		stringBuilder += '<tr><td>Size: </td><td>' + thisWpn.categoryName + '</td></tr>';
		stringBuilder += '<tr><td>Delay: </td><td>' + thisWpn.delay + '</td></tr>';
		stringBuilder += '<tr><td>Ord Rating: </td><td>' + thisWpn.ordnanceRating + '</td></tr>';
		stringBuilder += '<tr><td>Weight: </td><td>' + thisWpn.totalWeight() + '</td></tr>';
		stringBuilder += '<tr><td>Cost: </td><td>' + thisWpn.totalCost() + '</td></tr>';
		stringBuilder += '<tr><td colspan="2">&nbsp;</td></tr>';
		stringBuilder += '<tr><td>Carried By: </td><td id="' + thisWpn.wpnID + '_wpnCarriedBy">' + thisWpn.equipStatus.carriedBy() + '</td></tr>';
		stringBuilder += '<tr><td>Attached To: </td><td id="' + thisWpn.wpnID + '_wpnAttachedTo">' + thisWpn.equipStatus.attachedTo() + '</td></tr>';
		stringBuilder += '<tr><td colspan="2">';
		stringBuilder += '<input id="' + thisWpn.wpnID + '_dupBtn" class="dupBtn" type="button" value="DUPLICATE"></input>';
		stringBuilder += '</td></tr></table>';
		$('#wpnInfoContainer').append(stringBuilder);
	},
	//UPDATES/ADDS TO INVENTORY -> ROSTER CHARACTER TABLE
	invCharacter:function(){
		$('.charItem').remove();
		for(var i=0;i<data.characters.length;i++){
			var stringBuilder = "";
			stringBuilder += '<tr id="' + data.characters[i].charID + 'char" class="charItem">';
			stringBuilder += '<td>' + data.characters[i].name + '</td>';
			stringBuilder += '<td>' + data.characters[i].rank + '</td>';
			stringBuilder += '<td>' + data.characters[i].movement() + '</td>';
			stringBuilder += '<td>' + data.characters[i].weaponSkill + '</td>';
			stringBuilder += '<td>' + data.characters[i].ballisticSkill + '</td>';
			stringBuilder += '<td>' + data.characters[i].strength + '</td>';
			stringBuilder += '<td>' + data.characters[i].toughness + '</td>';
			stringBuilder += '<td>' + data.characters[i].wounds() + '</td>';
			stringBuilder += '<td>' + data.characters[i].initiative + '</td>';
			stringBuilder += '<td>' + data.characters[i].attacks() + '</td>';
			stringBuilder += '<td>' + data.characters[i].leadership + '</td>';
			stringBuilder += '<td><input id="' + data.characters[i].charID + '_char" class="invItem" type="button" value="..."></input></td>';
			stringBuilder += '</tr>';
			$('#charStorage').append(stringBuilder);
		}
	},
	infoCharacter:function(thisChar){
		var stringBuilder = "";
		stringBuilder += '<table id="' + thisChar.charID + '_charInfo" class="infoPage">';
		stringBuilder += '</table>';
		$('#charInfoContainer').append(stringBuilder);
		
		domUpdate.infoCharContent(thisChar);
	},
	infoCharContent: function(thisChar){
		var id = thisChar.charID;
		var stringBuilder = '';
		stringBuilder += '<tr><th colspan="2">' + thisChar.name + '</th></tr>';
		stringBuilder += '<tr><td>Rank: </td><td id="' + id + '_charInfo_rank">' + thisChar.rank + '</td></tr>';
		stringBuilder += '<tr><td>Move: </td><td id="' + id + '_charInfo_move">' + thisChar.movement() + '</td></tr>';
		stringBuilder += '<tr><td>Weapon Skill: </td><td id="' + id + '_charInfo_ws">' + thisChar.weaponSkill + '</td></tr>';
		stringBuilder += '<tr><td>Ballistic Skill: </td><td id="' + id + '_charInfo_bs">' + thisChar.ballisticSkill + '</td></tr>';
		stringBuilder += '<tr><td>Strength: </td><td id="' + id + '_charInfo_s">' + thisChar.strength + '</td></tr>';
		stringBuilder += '<tr><td>Toughness: </td><td id="' + id + '_charInfo_t">' + thisChar.toughness + '</td></tr>';
		stringBuilder += '<tr><td>Wounds: </td><td id="' + id + '_charInfo_w">' + thisChar.wounds() + '</td></tr>';
		stringBuilder += '<tr><td>Initiative: </td><td id="' + id + '_charInfo_i">' + thisChar.initiative + '</td></tr>';
		stringBuilder += '<tr><td>Attacks: </td><td id="' + id + '_charInfo_a">' + thisChar.attacks() + '</td></tr>';
		stringBuilder += '<tr><td>Leadership: </td><td id="' + id + '_charInfo_ld">' + thisChar.leadership + '</td></tr>';
		stringBuilder += '<tr><td colspan="2">&nbsp;</td></tr>';
		stringBuilder += '<tr><td>Experience: </td><td id="' + id + '_charInfo_xp">' + thisChar.experience + '</td></tr>';
		stringBuilder += '<tr><td>Encumbrance: </td><td id="' + id + '_charInfo_enc">' + thisChar.inventoryWeight() + '/' + thisChar.carryCapacity() + '</td></tr>';
		stringBuilder += '<tr><td>Total Weight: </td><td id="' + id + '_charInfo_totWgt">' + thisChar.totalWeight() + '</td></tr>';
		stringBuilder += '<tr><td>Total Value: </td><td id="' + id + '_charInfo_totVal">' + thisChar.totalValue() + '</td></tr>';
		//add equip left line, fill only if left is equipped
		stringBuilder += '<tr><td>Equip Left: </td><td id="' + id + '_charInfo_equipLeft">';
		if(thisChar.isLeftHandEquipped === true){
			stringBuilder += thisChar.leftHandEquip.name;
		}else if(thisChar.isBothHandEquipped === true){
			stringBuilder += 'Both';
		}
		stringBuilder += '</td></tr>';
		//add equip right line, fill only if right is equipped
		stringBuilder += '<tr><td>Equip Right: </td><td id="' + id + '_charInfo_equipRight">';
		if(thisChar.isRightHandEquipped === true){
			stringBuilder += thisChar.rightHandEquip.name;
		}else if(thisChar.isBothHandEquipped === true){
			stringBuilder += 'Both';
		}
		stringBuilder += '</td></tr>';
		//add both line, fill only if both is equipped
		stringBuilder += '<tr><td>Equip Both: </td><td id="' + id + '_charInfo_equipBoth">';
		if(thisChar.isBothHandEquipped === true){
			stringBuilder += thisChar.bothHandEquip.name;
		}
		stringBuilder += '</td></tr>';
		//add armour line only if equipped
		if(thisChar.isArmourEquipped === true){
			stringBuilder += '<tr><td>Armour: </td><td id="' + id + '_charInfo_equipArmour">' + thisChar.armourEquip.name + '</td></tr>';
		}
		//add energy shield only if equipped
		if(thisChar.isEnergyShieldEquipped === true){
			stringBuilder += '<tr><td>Shield: </td><td id="' + id + '_charInfo_equipShield">' + thisChar.energyShieldEquip.name + '</td></tr>';
		}
		//inventory section built and left blank (if this is to be dynamic it needs the if section that adding items has).
		stringBuilder += '<tr><td colspan="2">&nbsp;</td></tr>';
		stringBuilder += '<tr><td>Inventory: </td><td><input id="' + id + '_charInfo_addToInv" class="charInfo_addToInv" type="button" value="ADD"></input></td></tr>';
		for(let i=0;i<thisChar.inventory.length;i++){
			stringBuilder += '<tr><td>' + thisChar.inventory[i].name + '</td><td>' + thisChar.inventory[i].totalWeight() + '</td></tr>';
		}
		$('#' + id + '_charInfo').html(stringBuilder);
	},
	//UPDATES/ADDS TO INVENTORY -> GARAGE VEHICLE TABLE
	invVehicle:function(){
		$('.vehItem').remove();
		for(var i=0;i<data.vehicles.length;i++){
			var stringBuilder = "";
			stringBuilder += '<tr id="' + data.vehicles[i].root.id + 'veh" class="vehItem">';
			stringBuilder += '<td>' + data.vehicles[i].root.name + '</td>';
			stringBuilder += '<td>' + data.vehicles[i].total.speed() + '</td>';
			stringBuilder += '<td>' + data.vehicles[i].total.weight() + '</td>';
			stringBuilder += '<td>' + data.vehicles[i].total.crewRequired() + '</td>';
			stringBuilder += '<td>' + data.vehicles[i].root.passengers.length + '/' + data.vehicles[i].total.passengerCapacity() + '</td>';
			stringBuilder += '<td>' + data.vehicles[i].total.cost() + '</td>';
			stringBuilder += '<td><input id="' + data.vehicles[i].root.id + '_veh" class="invItem" type="button" value="..."></input></td>';
			stringBuilder += '</tr>';
			$('#vehicleStorage').append(stringBuilder);
		}
	},
	infoVehicle:function(thisVeh){
		var id = thisVeh.root.id;
		var stringBuilder = "";
		stringBuilder += '<table id="' + id + '_vehInfo" class="infoPage">';
		stringBuilder += '</table>';
		$('#vehInfoContainer').append(stringBuilder);
		
		domUpdate.infoVehicleContent(thisVeh);
	},
	infoVehicleContent:function(thisVeh){
		var id = thisVeh.root.id;
		var stringBuilder = "";
		
		stringBuilder += '<tr><th colspan="5">' + thisVeh.root.name + '</th></tr>';
		//next row
		stringBuilder += '<tr>';
		stringBuilder += '<td>Total Cost: </td><td id="' + id + '_vehInfo_totVal">' + thisVeh.total.cost() + '</td>';
		stringBuilder += '<td>Driver: </td><td id="' + id + '_vehInfo_driverName">No Driver</td>';
		stringBuilder += '<td><input id="' + id + '_vehInfo_driverAssign" class="vehInfo_driverAssign" type="button" value="ASSIGN"></input></td>';
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
		stringBuilder += '<td>Total Weight: </td><td id="' + id + '_vehInfo_totWgt">' + thisVeh.total.weight() + '</td>';
		stringBuilder += '<td>Passengers: </td><td id="' + id + '_vehInfo_pass">' + thisVeh.root.passengers.length + '/' + thisVeh.total.passengerCapacity() + '</td>';
		stringBuilder += '<td><input id="' + id + '_vehInfo_passengerAssign" class="vehInfo_passengerAssign" type="button" value="ADD!"></input></td>';
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
		stringBuilder += '<td>Total Speed: </td><td id="' + id + '_vehInfo_totSpd">' + thisVeh.total.speed() + '</td>';
		stringBuilder += '<td>Locomotion: </td><td id="' + id + '_vehInfo_loco">' + gens.toTrueCase(thisVeh.root.loco()) + '</td>';
		stringBuilder += '<td></td>';
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr><td colspan="5">&nbsp;</td></tr>';
		//next row
		stringBuilder += '<tr><th>Front</th><th>Left</th><th>Right</th><th>Rear</th>';
		if(thisVeh.roof.status.lightTurret.hasLightTurret === true || thisVeh.roof.status.heavyTurret.hasHeavyTurret === true || thisVeh.roof.status.fixedMount.hasFixedMount === true){
			stringBuilder += '<th>Roof</th>';
		}else{
			stringBuilder += '<th></th>';
		}
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
		stringBuilder += '<td id="' + id + '_vehInfo_frontArmName">' + thisVeh.front.armour.name() + '</td>';
		stringBuilder += '<td id="' + id + '_vehInfo_leftArmName">' + thisVeh.left.armour.name() + '</td>';
		stringBuilder += '<td id="' + id + '_vehInfo_rightArmName">' + thisVeh.right.armour.name() + '</td>';
		stringBuilder += '<td id="' + id + '_vehInfo_rearArmName">' + thisVeh.rear.armour.name() + '</td>';
		if(thisVeh.roof.status.lightTurret.hasLightTurret === true || thisVeh.roof.status.heavyTurret.hasHeavyTurret === true || thisVeh.roof.status.fixedMount.hasFixedMount === true){
			stringBuilder += '<td id="' + id + '_vehInfo_roofArmName">' + thisVeh.roof.armour.name() + '</td>';
		}else{
			stringBuilder += '<td id="' + id + '_vehInfo_roofArmName"></td>';
		}
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
		stringBuilder += '<td id="' + id + '_vehInfo_frontArmInfo">' + thisVeh.front.armour.vsE + 'vsE/' + thisVeh.front.armour.vsP + 'vsP ' + thisVeh.front.armour.hp() + 'HP</td>';
		stringBuilder += '<td id="' + id + '_vehInfo_leftArmInfo">' + thisVeh.left.armour.vsE + 'vsE/' + thisVeh.left.armour.vsP + 'vsP ' + thisVeh.left.armour.hp() + 'HP</td>';
		stringBuilder += '<td id="' + id + '_vehInfo_rightArmInfo">' + thisVeh.right.armour.vsE + 'vsE/' + thisVeh.right.armour.vsP + 'vsP ' + thisVeh.right.armour.hp() + 'HP</td>';
		stringBuilder += '<td id="' + id + '_vehInfo_rearArmInfo">' + thisVeh.rear.armour.vsE + 'vsE/' + thisVeh.rear.armour.vsP + 'vsP ' + thisVeh.rear.armour.hp() + 'HP</td>';
		if(thisVeh.roof.status.lightTurret.hasLightTurret === true || thisVeh.roof.status.heavyTurret.hasHeavyTurret === true || thisVeh.roof.status.fixedMount.hasFixedMount === true){
			stringBuilder += '<td id="' + id + '_vehInfo_roofArmInfo">' + thisVeh.roof.armour.vsE + 'vsE/' + thisVeh.roof.armour.vsP + 'vsP ' + thisVeh.roof.armour.hp() + 'HP</td>';
		}else{
			stringBuilder += '<td id="' + id + '_vehInfo_roofArmInfo"></td>';
		}
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
			//td 1
		stringBuilder += '<td id="' + id + '_vehInfo_frontHardpoint">Front Hardpoint</td>';
			//td2
		stringBuilder += '<td id="' + id + '_vehInfo_leftStatus">';
		if(thisVeh.left.status.sponson.hasSponson === true){
			stringBuilder += 'Sponson Hardpoint';
		}else if(thisVeh.left.status.pintle.hasPintle === true){
			stringBuilder += 'Pintle Hardpoint';
		}else{
			stringBuilder += 'No Hardpoint';
		}
		stringBuilder += '</td>';
			//td3
		stringBuilder += '<td id="' + id + '_vehInfo_rightStatus">';
		if(thisVeh.right.status.sponson.hasSponson === true){
			stringBuilder += 'Sponson Hardpoint';
		}else if(thisVeh.right.status.pintle.hasPintle === true){
			stringBuilder += 'Pintle Hardpoint';
		}else{
			stringBuilder += 'No Hardpoint';
		}
		stringBuilder += '</td>';
			//td4
		stringBuilder += '<td id="' + id + '_vehInfo_rearStatus">';
		if(thisVeh.rear.status.pintle.hasPintle === true){
			stringBuilder += 'Pintle Hardpoint';
		}else{
			stringBuilder += 'No Hardpoint';
		}
		stringBuilder += '</td>';
			//td5
		stringBuilder += '<td id="' + id + '_vehInfo_roofStatus">';
		if(thisVeh.roof.status.lightTurret.hasLightTurret === true){
			stringBuilder += 'L.Turret Hardpoint';
		}else if(thisVeh.roof.status.heavyTurret.hasHeavyTurret === true){
			stringBuilder += 'H.Turret Hardpoint';
		}else if(thisVeh.roof.status.fixedMount.hasFixedMount === true){
			stringBuilder += 'Fixed Mount Hardpoint';
		}else{
			stringBuilder += 'No Primary Hardpoint';
		}
		stringBuilder += '</td>';
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
			//td1
		stringBuilder += '<td id="' + id + '_vehInfo_frontWeapon">No Weapon</td>';
			//td2
		stringBuilder += '<td id="' + id + '_vehInfo_leftWeapon">';
		if(thisVeh.left.status.sponson.hasSponson === true || thisVeh.left.status.pintle.hasPintle === true){
			stringBuilder += 'No Weapon';
		}
		stringBuilder += '</td>';
			//td3
		stringBuilder += '<td id="' + id + '_vehInfo_rightWeapon">';
		if(thisVeh.right.status.sponson.hasSponson === true || thisVeh.right.status.pintle.hasPintle === true){
			stringBuilder += 'No Weapon';
		}
		stringBuilder += '</td>';
			//td4
		stringBuilder += '<td id="' + id + '_vehInfo_rearWeapon">';
		if(thisVeh.rear.status.pintle.hasPintle === true){
			stringBuilder += 'No Weapon';
		}
		stringBuilder += '</td>';
			//td5
		stringBuilder += '<td id="' + id + '_vehInfo_roofPrimaryWeapon">';
		if(thisVeh.roof.status.lightTurret.hasLightTurret === true || thisVeh.roof.status.heavyTurret.hasHeavyTurret === true || thisVeh.roof.status.fixedMount.hasFixedMount === true){
			stringBuilder += 'No Weapon';
		}
		stringBuilder += '</td>';
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
			//td1
		stringBuilder += '<td><input id="' + id + '_vehInfo_frontWpnAssign" class="vehInfo_frontWpnAssign" type="button" value="ATTACH!"></input></td>';
			//td2
		stringBuilder += '<td id="' + id + '_vehInfo_leftAttach">';
		if(thisVeh.left.status.sponson.hasSponson === true || thisVeh.left.status.pintle.hasPintle === true){
			stringBuilder += '<input id="' + id + '_vehInfo_leftWpnAssign" class="vehInfo_leftWpnAssign" type="button" value="ATTACH!"></input>';
		}
		stringBuilder += '</td>';
			//td3
		stringBuilder += '<td id="' + id + '_vehInfo_rightAttach">';
		if(thisVeh.right.status.sponson.hasSponson === true || thisVeh.right.status.pintle.hasPintle === true){
			stringBuilder += '<input id="' + id + '_vehInfo_rightWpnAssign" class="vehInfo_rightWpnAssign" type="button" value="ATTACH!"></input>';
		}
		stringBuilder += '</td>';
			//td4
		stringBuilder += '<td id="' + id + '_vehInfo_rearAttach">';
		if(thisVeh.rear.status.pintle.hasPintle === true){
			stringBuilder += '<input id="' + id + '_vehInfo_rearWpnAssign" class="vehInfo_rearWpnAssign" type="button" value="ATTACH!"></input>';
		}
		stringBuilder += '</td>';
			//td5
		stringBuilder += '<td id="' + id + '_vehInfo_roofPrimaryAttach">';
		if(thisVeh.roof.status.lightTurret.hasLightTurret === true || thisVeh.roof.status.heavyTurret.hasHeavyTurret === true || thisVeh.roof.status.fixedMount.hasFixedMount === true){
			stringBuilder += '<input id="' + id + '_vehInfo_roofPrimaryAssign" class="vehInfo_roofPrimaryAssign" type="button" value="ATTACH!"></input>';
		}
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
			//td1
		stringBuilder += '<td id="' + id + '_vehInfo_frontGunner">';
		if(thisVeh.front.status.hasWeapon === true && thisVeh.front.status.hasGunner === true){
			stringBuilder += thisVeh.front.status.gunnerObject.name;
		}else if(thisVeh.front.status.hasWeapon === true){
			stringBuilder += 'No Gunner';
		}
		stringBuilder += '</td>';
			//td2
		stringBuilder += '<td id="' + id + '_vehInfo_leftGunner">';
		if(thisVeh.left.status.hasWeapon === true && thisVeh.left.status.hasGunner === true){
			stringBuilder += thisVeh.left.status.gunnerObject.name;
		}else if(thisVeh.left.status.hasWeapon === true){
			stringBuilder += 'No Gunner';
		}
		stringBuilder += '</td>';
			//td3
		stringBuilder += '<td id="' + id + '_vehInfo_rightGunner">';
		if(thisVeh.right.status.hasWeapon === true && thisVeh.right.status.hasGunner === true){
			stringBuilder += thisVeh.right.status.gunnerObject.name;
		}else if(thisVeh.right.status.hasWeapon === true){
			stringBuilder += 'No Gunner';
		}
		stringBuilder += '</td>';
			//td4
		stringBuilder += '<td id="' + id + '_vehInfo_rearGunner">';
		if(thisVeh.rear.status.hasWeapon === true && thisVeh.rear.status.hasGunner === true){
			stringBuilder += thisVeh.rear.status.gunnerObject.name;
		}else if(thisVeh.rear.status.hasWeapon === true){
			stringBuilder += 'No Gunner';
		}
		stringBuilder += '</td>';
			//td5
		stringBuilder += '<td id="' + id + '_vehInfo_roofPrimaryGunner">';
		if(thisVeh.roof.status.primaryWeapon.hasPrimaryWeapon === true && thisVeh.roof.status.primaryWeapon.hasGunner === true){
			stringBuilder += thisVeh.roof.status.primaryWeapon.gunnerObject.name;
		}else if(thisVeh.roof.status.primaryWeapon.hasPrimaryWeapon === true){
			stringBuilder += 'No Gunner';
		}
		stringBuilder += '</td>';
		stringBuilder += '</tr>';
		//next row
		stringBuilder += '<tr>';
			//td1
		stringBuilder += '<td id="' + id + '_vehInfo_frontGunnerAttach">';
		if(thisVeh.front.status.hasWeapon === true){
			stringBuilder += '<td><input id="' + id + '_vehInfo_frontGunnerAssign" class="vehInfo_frontGunnerAssign" type="button" value="ASSIGN!"></input></td>';
		}
		stringBuilder += '</td>';
			//td2
		stringBuilder += '<td id="' + id + '_vehInfo_leftGunnerAttach">';
		if(thisVeh.left.status.hasWeapon === true){
			stringBuilder += '<td><input id="' + id + '_vehInfo_leftGunnerAssign" class="vehInfo_leftGunnerAssign" type="button" value="ASSIGN!"></input></td>';
		}
		stringBuilder += '</td>';
			//td3
		stringBuilder += '<td id="' + id + '_vehInfo_rightGunnerAttach">';
		if(thisVeh.right.status.hasWeapon === true){
			stringBuilder += '<td><input id="' + id + '_vehInfo_rightGunnerAssign" class="vehInfo_rightGunnerAssign" type="button" value="ASSIGN!"></input></td>';
		}
		stringBuilder += '</td>';
			//td4
		stringBuilder += '<td id="' + id + '_vehInfo_rearGunnerAttach">';
		if(thisVeh.rear.status.hasWeapon === true){
			stringBuilder += '<td><input id="' + id + '_vehInfo_rearGunnerAssign" class="vehInfo_rearGunnerAssign" type="button" value="ASSIGN!"></input></td>';
		}
		stringBuilder += '</td>';
			//td5
		stringBuilder += '<td id="' + id + '_vehInfo_roofPrimaryGunnerAttach">';
		if(thisVeh.roof.status.primaryWeapon.hasPrimaryWeapon === true){
			stringBuilder += '<td><input id="' + id + '_vehInfo_roofPrimaryGunnerAssign" class="vehInfo_roofPrimaryGunnerAssign" type="button" value="ASSIGN!"></input></td>';
		}
		stringBuilder += '</td>';
		
		$('#' + id + '_vehInfo').html(stringBuilder);
	},
	wpnToBuy:function(){
		var theCost = temporary.weapons[0].totalCost();
		var theWeight = temporary.weapons[0].totalWeight();
		var theCategory = temporary.weapons[0].category;
		$('#totalCost').text(theCost);
		$('#totalWgt').text(theWeight);
		if((theCategory == 2 && theWeight > 30) || (theCategory == 1 && theWeight > 75) || (theCategory == 0.5 && theWeight > 300)){
			$('#wpnWarning').text("ILLEGAL!");
		}else{
			$('#wpnWarning').text("");
			$('#wpnBUY').prop('disabled', false);
		}
	},
	wpnReset:function(){
		$('#wpnName').val("");
		$('#wpnBUY').prop('disabled', true);
		$('#wpnGen').prop('disabled', true);
		$('#totalCost').text("");
		$('#totalWgt').text("");
	},
	charToBuy: {
		leader:function(){
			$('#nameStat').text($('#charName').val());
			$('#rankStat').text('Leader');
			$('#moveStat').text('4');
			$('#wsStat').text('60 + d6');
			$('#bsStat').text('60 + d6');
			$('#sStat').text('3');
			$('#tStat').text('3');
			$('#wStat').text('3');
			$('#iStat').text('40 + d6');
			$('#aStat').text('4');
			$('#ldStat').text('45 + d6');
			$('#costStat').text('240');
			$('#weightStat').text('120');
			$('#carryStat').text('210');
			$('#xpStat').text('120');
			$('#charBUY').prop('disabled', false);
		},
		engineer:function(){
			$('#nameStat').text($('#charName').val());
			$('#rankStat').text('Engineer');
			$('#moveStat').text('4');
			$('#wsStat').text('40 + d6');
			$('#bsStat').text('60 + d6');
			$('#sStat').text('3');
			$('#tStat').text('2');
			$('#wStat').text('2');
			$('#iStat').text('30 + d6');
			$('#aStat').text('3');
			$('#ldStat').text('20 + d6');
			$('#costStat').text('160');
			$('#weightStat').text('105');
			$('#carryStat').text('180');
			$('#xpStat').text('70');
			$('#charBUY').prop('disabled', false);
		},
		fighter:function(){
			$('#nameStat').text($('#charName').val());
			$('#rankStat').text('Fighter');
			$('#moveStat').text('3');
			$('#wsStat').text('50 + d6');
			$('#bsStat').text('50 + d6');
			$('#sStat').text('2');
			$('#tStat').text('2');
			$('#wStat').text('2');
			$('#iStat').text('20 + d6');
			$('#aStat').text('3');
			$('#ldStat').text('30 + d6');
			$('#costStat').text('100');
			$('#weightStat').text('90');
			$('#carryStat').text('150');
			$('#xpStat').text('60');
			$('#charBUY').prop('disabled', false);
		},
		green:function(){
			$('#nameStat').text($('#charName').val());
			$('#rankStat').text('Green');
			$('#moveStat').text('2');
			$('#wsStat').text('30 + d6');
			$('#bsStat').text('30 + d6');
			$('#sStat').text('1');
			$('#tStat').text('1');
			$('#wStat').text('2');
			$('#iStat').text('20 + d6');
			$('#aStat').text('2');
			$('#ldStat').text('10 + d6');
			$('#costStat').text('0');
			$('#weightStat').text('60');
			$('#carryStat').text('90');
			$('#xpStat').text('0');
			$('#charBUY').prop('disabled', false);
		}
	},
	charReset:function(){
		$('#charName').val("");
		$('#charGen').val("");
		$('#nameStat').text('');
		$('#rankStat').text('');
		$('#moveStat').text('');
		$('#wsStat').text('');
		$('#bsStat').text('');
		$('#sStat').text('');
		$('#tStat').text('');
		$('#wStat').text('');
		$('#iStat').text('');
		$('#aStat').text('');
		$('#ldStat').text('');
		$('#costStat').text('');
		$('#weightStat').text('');
		$('#carryStat').text('');
		$('#xpStat').text('');
		$('#charBUY').prop('disabled', true);
		$('#charGen').prop('disabled', true);
	},
	vehToBuy:function(){
		var thisVeh = temporary.vehicles[0];
		$('#frontArmName').text(thisVeh.front.armour.name());
		$('#leftArmName').text(thisVeh.left.armour.name());
		$('#rightArmName').text(thisVeh.right.armour.name());
		$('#rearArmName').text(thisVeh.rear.armour.name());
		$('#roofArmName').text(thisVeh.roof.armour.name());
		$('#frontArmHP').text(thisVeh.front.armour.hp());
		$('#leftArmHP').text(thisVeh.left.armour.hp());
		$('#rightArmHP').text(thisVeh.right.armour.hp());
		$('#rearArmHP').text(thisVeh.rear.armour.hp());
		$('#roofArmHP').text(thisVeh.roof.armour.hp());
		$('#vehTotalWeight').text(thisVeh.total.weight());
		$('#vehTotalCost').text(thisVeh.total.cost());
		$('#vehTotalSpeed').text(thisVeh.total.speed());
		$('#vehTotalCrew').text(thisVeh.total.crewRequired());
		$('#vehTotalPass').text(thisVeh.total.passengerCapacity());
		//ALLOW PURCHASE
		$('#vehBUY').prop("disabled", false);
	},
	vehReset:function(){
		$('#vehName').val("");
		$('#vehEng').val("");
		$('#leftLoco').val("");
		$('#rightLoco').val("");
		$('#rearPanel').val("");
		$('#roofMount').val("");
		
		$('#leftPanel').val("");
		$('#rightPanel').val("");
		$('#rearPintle').hide();
		$('#rearPintle').val("");
		$('#rearPintleSelector').addClass('dpe');
		$('#roofCupola').val("");
		
		$('#leftPintle').hide();
		$('#leftPintle').val("");
		$('#leftPintleSelector').addClass('dpe');
		$('#rightPintle').hide();
		$('#rightPintle').val("");
		$('#rightPintleSelector').addClass('dpe');
		$('#roofHatch').val("");
		
		$('#roofPintleFacing').hide();
		$('#roofPintleSecondFacing').hide();
		$('#roofPintleFacingSelector').addClass('dpe');
		
		$('#frontArmName').text("");
		$('#leftArmName').text("");
		$('#rightArmName').text("");
		$('#rearArmName').text("");
		$('#roofArmName').text("");
		$('#frontArmHP').text("");
		$('#leftArmHP').text("");
		$('#rightArmHP').text("");
		$('#rearArmHP').text("");
		$('#roofArmHP').text("");
		$('#vehTotalWeight').text("");
		$('#vehTotalCost').text("");
		$('#vehTotalSpeed').text("");
		$('#vehTotalCrew').text("");
		$('#vehTotalPass').text("");
	}
};

//////////////
//ASSIGNMENT//
//////////////
//ASSIGNMENT IS CHANGING
//REMOVED ASSIGNMENT FROM WPN INFO
//TO ADD TO CHAR INVENTORY, CHAR EQUIP FROM INVENTORY
//VEH ASSIGNMENT FOR BOTH WPN AND CHAR TO BE ADDED
//ASSIGNMENT BUTTONS ARE WHERE?
//
//CHAR:	ADD TO INVENTORY charInfo_addToInv
//VEH:	ADD DRIVER vehInfo_driverAssign
//VEH:	ATTACH WEAPON TO FRONT HARDPOINT vehInfo_frontWpnAssign
//VEH:	ATTACH WEAPON TO LEFT HARDPOINT vehInfo_leftWpnAssign
//VEH:	ATTACH WEAPON TO RIGHT HARDPOINT vehInfo_rightWpnAssign
//VEH:	ATTACH WEAPON TO REAR HARPOINT vehInfo_rearWpnAssign
//VEH:	ATTACH WEAPON TO ROOF PRIMARY HARDPOINT vehInfo_roofPrimaryAssign
//
//THESE ARE ADDED TO wpnInfoContainer, charInfoContainer, vehInfoContainer
var assignment = {
	openAddWpnToCharInv:$('#charInfoContainer').on('click', '.charInfo_addToInv', function(){
		var thisCharID = parseInt($(this).prop('id'));
		if($('.addWpnToCharInv')){
			$('.addWpnToCharInv').remove();
		}
		for(let i=0;i<data.weapons.length;i++){
			if(data.characters[thisCharID].rank !== 'Green'){	
				if(data.weapons[i].category !== 0.33 && data.weapons[i].equipStatus.isCarried === false){
					var stringBuilder = '';
					stringBuilder += '<tr id="' + data.weapons[i].wpnID + '_addWpnToCharInv" class="addWpnToCharInv dpe">';
					stringBuilder += '<td>' + data.weapons[i].name + '</td>';
					stringBuilder += '<td>' + data.weapons[i].totalWeight() + '</td>';
					stringBuilder += '</tr>';
					$('#' + thisCharID + '_charInfo').append(stringBuilder);
				}
			}else{
				if((data.weapons[i].category === 1 || data.weapons[i].category === 2) && data.weapons[i].equipStatus.isCarried === false){
					var stringBuilder = '';
					stringBuilder += '<tr id="' + data.weapons[i].wpnID + '_addWpnToCharInv" class="addWpnToCharInv dpe">';
					stringBuilder += '<td>' + data.weapons[i].name + '</td>';
					stringBuilder += '<td>' + data.weapons[i].totalWeight() + '</td>';
					stringBuilder += '</tr>';
					$('#' + thisCharID + '_charInfo').append(stringBuilder);
				}
			}
		}
	}),
	addWpnToCharInv:$('#charInfoContainer').on('click', '.addWpnToCharInv', function(){
		var thisWpnID = parseInt($(this).prop('id'));
		var thisCharID = parseInt($(this).parent().prop('id'));
		var thisChar = gens.findChar(thisCharID);
		var thisWpn = gens.findWpn(thisWpnID);
		thisChar.inventory.push(thisWpn);
		thisWpn.equipStatus.isCarried = true;
		thisWpn.equipStatus.object = thisChar;
		$('#' + thisWpnID + '_wpnCarriedBy').text(thisWpn.equipStatus.carriedBy());
		
		$('.addWpnToCharInv').remove();
		domUpdate.infoCharContent(thisChar);
	}),
	openAssignDriverToVehicle:$('#vehInfoContainer').on('click', '.vehInfo_driverAssign', function(){
		console.log('openAssignDriverToVehicle TRIGGERED')
		var thisVehID = parseInt($(this).prop('id'));
		if($('#' + thisVehID + '_assignDriverBox')){
			$('#' + thisVehID + '_assignDriverBox').remove();
		}
		$('#vehInfoContainer').append('<table id="' + thisVehID + '_assignDriverBox" class="infoPage"><tr><th colspan="2">Driver Assign</th></tr></table>');
		$('#'+ thisVehID + '_assignDriverBox').show();
		for(let i=0;i<data.characters.length;i++){
			if(data.characters[i].rank !== 'Green'){
				var stringBuilder = '';
				stringBuilder += '<tr id="' + data.characters[i].charID + '_assignDriverToVehicle" class="assignDriverToVehicle dpe">';
				stringBuilder += '<td>' + data.characters[i].name + '</td>';
				stringBuilder += '<td>' + data.characters[i].rank + '</td>';
				stringBuilder += '</tr>';
				$('#' + thisVehID + '_assignDriverBox').append(stringBuilder);
			}
		}
	}),
	assignDriverToVehicle:$('#vehInfoContainer').on('click', '.assignDriverToVehicle', function(){
		var thisCharID = parseInt($(this).prop('id'));
		var thisVehID = parseInt($(this).parent().parent().prop('id'));
		var thisChar = gens.findChar(thisCharID);
		var thisVeh = gens.findVeh(thisVehID);
		thisVeh.front.objects.object2.hasDriver = true;
		thisVeh.front.objects.object2.object = thisChar;
		$('#' + thisVehID + '_vehInfo_driverName').text(thisChar.name);
		$('#' + thisVehID + '_assignDriverBox').remove();
	}),
	//Should probably put an 'if' in here so assigned weapons cant be assigned twice at once!
/*	openWpnAssign:$('#wpnInfoContainer').on('click', '.assignBtn', function(){
		var thisWpnID = parseInt($(this).prop('id'));
		for(let i=0;i<data.characters.length;i++){
			var stringBuilder = '';
			stringBuilder += '<tr id="' + data.characters[i].charID + '_wpnAssign" class="wpnAssignment dpe">';
			stringBuilder += '<td>' + data.characters[i].name + '</td>';
			stringBuilder += '<td>'+ data.characters[i].inventoryWeight() + '/' + data.characters[i].carryCapacity() + '</td>';
			stringBuilder += '</tr>';
			$('#' + thisWpnID + '_wpnInfo').append(stringBuilder);
		}
	}),
	//should put a proviso in here so that a chracter cannot be overburdend
	//WAIT...iirc, a character can be overburdened but become increasingly slow! Need to implement
	assignWpn:$('#wpnInfoContainer').on('click', '.wpnAssignment', function(){
		var charID = parseInt($(this).prop('id'));
		var wpnID = parseInt($(this).parent().parent().prop('id'));
		var thisChar = gens.findChar(charID);
		var thisWpn = gens.findWpn(wpnID);
		console.log('charID ' + charID);
		console.log('wpnID ' + wpnID);
		data.characters[charID].inventory.push(thisWpn);
		$('.wpnAssignment').remove();
		console.log('element is ' + charID + '_charInfo_enc');
		console.log('charName is ' + thisChar.name);
		console.log('inventoryWeight is ' + thisChar.inventoryWeight());
		$('#' + charID + '_charInfo_enc').text(thisChar.inventoryWeight() + '/' + thisChar.carryCapacity());
		$('#' + charID + '_charInfo_totWgt').text(thisChar.totalWeight());
		$('#' + charID + '_charInfo_totVal').text(thisChar.totalValue());
		$('.' + charID + 'wpnAttchedToChar').remove();
		for(let i=0;i<thisChar.inventory.length;i++){
			var stringBuilder = "";
			stringBuilder += '<tr id="' + thisChar.inventory[i].wpnID + 'wpn_attchedToChar" class="' + charID + 'wpnAttchedToChar dpe">';
			stringBuilder += '<td>' + thisChar.inventory[i].name + '</td>';
			stringBuilder += '<td>' + thisChar.inventory[i].totalWeight() + '</td>';
			stringBuilder += '</tr>';
			$('#' + thisChar.charID + '_charInfo').append(stringBuilder);
		}
		thisWpn.equipStatus.isCarried = true;
		thisWpn.equipStatus.object = thisChar;
		$('#' + wpnID + '_wpnCarriedBy').text(thisWpn.equipStatus.carriedBy());
		
	}),		*/
	openVehDriverAssign:$('#vehInfoContainer').on('click', '.assignBtn', function(){
		var thisVehID = parseInt($(this).prop('id'));
		console.log('Open Vehicle Assignment - to write!');
	})
};

/////////////
//SELECTORS//
/////////////

var selectors = {
	name:"selectors",
	locoSnap:$('.vehLoco').change(function(){
		if($(this).attr('id') == "leftLoco"){
			$('#rightLoco').val($('#leftLoco').val());
		}else{
			$('#leftLoco').val($('#rightLoco').val());
		}
	}),
	fmHideHatch:$('#roofMount').change(function(){
		if($('#roofMount').val() == "fm"){
			$('#roofHatch').hide();
			$('#roofHatch').val("");
			$('#hatchSelector').addClass('dpe');
		}else{
			$('#roofHatch').show();
			$('#hatchSelector').removeClass('dpe');
		}
	}),
	rightHatchOptions:$('#rightPanel').change(function(){
		if($('#rightPanel').val() == "hatch"){
			$('#rightPintle').show();
			$('#rightPintleSelector').removeClass('dpe');
		}else{
			$('#rightPintle').hide();
			$('#rightPintle').val("");
			$('#rightPintleSelector').addClass('dpe');
		}
	}),
	leftHatchOptions:$('#leftPanel').change(function(){
		if($('#leftPanel').val() == "hatch"){
			$('#leftPintle').show();
			$('#leftPintleSelector').removeClass('dpe');
		}else{
			$('#leftPintle').hide();
			$('#leftPintle').val("");
			$('#leftPintleSelector').addClass('dpe');
		}
	}),
	rearHatchOptions:$('#rearPanel').change(function(){
		if($('#rearPanel').val() == "hatch"){
			$('#rearPintle').show();
			$('#rearPintleSelector').removeClass('dpe');
		}else{
			$('#rearPintle').hide();
			$('#rearPintle').val("");
			$('#rearPintleSelector').addClass('dpe');
		}
	}),
	roofHatchOptions:$('#roofHatch').change(function(){
		if($('#roofHatch').val() == "1"){
			$('#roofPintleFacing').show();
			$('#roofPintleSecondFacing').hide();
			$('#roofPintleFacingSelector').removeClass('dpe');
		}else if($('#roofHatch').val() == "2"){
			$('#roofPintleFacing').show();
			$('#roofPintleSecondFacing').show();
			$('#roofPintleFacingSelector').removeClass('dpe');
		}else{
			$('#roofPintleFacing').hide();
			$('#roofPintleSecondFacing').hide();
			$('#roofPintleFacingSelector').addClass('dpe');
		}
	}),
	roofPintleFacing:$('#roofPintleFacing').change(function(){
		if($('#roofPintleFacing').val() == "front"){
			$('#roofPintleSecondFacing').text("Rear");
		}else if($('#roofPintleFacing').val() == "rear"){
			$('#roofPintleSecondFacing').text("Front");
		}else if($('#roofPintleFacing').val() == "left"){
			$('#roofPintleSecondFacing').text("Right");
		}else{
			$('#roofPintleSecondFacing').text("Left");
		}
	}),
	roofArmourVisToggle:$('#roofMount').change(function(){
		if($('#roofMount').val() !== ""){
			$('#roofArmVsE').show();
			$('#roofArmVsP').show();
			$('#roofArmT').show();
		}else{
			$('#roofArmVsE').hide();
			$('#roofArmVsP').hide();
			$('#roofArmT').hide();
		}
	}),
	charNameRequired:$('#charName').keyup(function(){
		if($('#charName').val() !== ""){
			$('#charGen').prop("disabled", false);
		}else{
			$('#charGen').prop("disabled", true);
		}
	}),
	wpnNameRequired:$('#wpnName').keyup(function(){
		if($('#wpnName').val() !== ""){
			$('#wpnGen').prop("disabled", false);
		}else{
			$('#wpnGen').prop("disabled", true);
		}
	}),
	vehNameRequired:$('#vehName').keyup(function(){
		if($('#vehName').val() !== ""){
			$('#vehGen').prop("disabled", false);
		}else{
			$('#vehGen').prop("disabled", true);
		}
	}),
	tabSystem: {
		genTab:$('#genTab').click(function(){
			$('.tab').removeClass('tabSelected');
			$('#genTab').addClass('tabSelected');
			$('.popover').removeClass('open');
			$('#genTabPop').addClass('open');
		}),
		invTab:$('#invTab').click(function(){
			$('.tab').removeClass('tabSelected');
			$('#invTab').addClass('tabSelected');
			$('.popover').removeClass('open');
			$('#invTabPop').addClass('open');
		}),
		wpnGenTab:$('#wpnGenTab').click(function(){
			$('.gamePage').hide();
			$('#wpnGenContainer').show();
			$('.popover').removeClass('open');
		}),
		charGenTab:$('#charGenTab').click(function(){
			$('.gamePage').hide();
			$('#charGenContainer').show();
			$('.popover').removeClass('open');
		}),
		vehGenTab:$('#vehGenTab').click(function(){
			$('.gamePage').hide();
			$('#vehGenContainer').show();
			$('.popover').removeClass('open');
		}),
		wpnInvTab:$('#wpnInvTab').click(function(){
			$('.gamePage').hide();
			$('#wpnInvContainer').show();
			$('.popover').removeClass('open');
		}),
		charInvTab:$('#charInvTab').click(function(){
			$('.gamePage').hide();
			$('#charInvContainer').show();
			$('.popover').removeClass('open');
		}),
		vehInvTab:$('#vehInvTab').click(function(){
			$('.gamePage').hide();
			$('#vehInvContainer').show();
			$('.popover').removeClass('open');
		})
	},
	preselectDropdown: $('#preselector').change(function(){
		if($('#preselector').val() == "ord"){
			$('.preselect').hide();
			$('#ordnancePreselect').show();
		}else if($('#preselector').val() == "hvy"){
			$('.preselect').hide();
			$('#heavyPreselect').show();
		}else if($('#preselector').val() == "basic"){
			$('.preselect').hide();
			$('#basicPreselect').show();
		}else if($('#preselector').val() == "pistol"){
			$('.preselect').hide();
			$('#pistolPreselect').show();
		}else{}
	}),
	showWpnInfo:$('#wpnStorage').on('click', '.invItem', function(){
		var wpnID = parseInt($(this).prop('id'));
		$('.infoPage').hide();
		$('#' + wpnID + '_wpnInfo').show();
	}),
	showCharInfo:$('#charStorage').on('click', '.invItem', function(){
		var charID = parseInt($(this).prop('id'));
		$('.infoPage').hide();
		$('#' + charID + '_charInfo').show();
	}),
	showVehInfo:$('#vehicleStorage').on('click', '.invItem', function(){
		console.log('show triggered');
		var vehID = parseInt($(this).prop('id'));
		console.log('id is ' + vehID);
		$('.infoPage').hide();
		$('#' + vehID + '_vehInfo').show();
	})
};
