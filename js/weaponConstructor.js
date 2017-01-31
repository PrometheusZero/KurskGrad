////////////////////////
// WEAPON CONSTRUCTOR //
////////////////////////

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