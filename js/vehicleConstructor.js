/////////////////////////
// VEHICLE CONSTRUCTOR //
/////////////////////////

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
	//localStorage.setItem("KurskGradVehicle", JSON.stringify(temporary.vehicles[0]));
};