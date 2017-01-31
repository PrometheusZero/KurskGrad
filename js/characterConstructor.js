///////////////////////////
// CHARACTER CONSTRUCTOR //
///////////////////////////

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
		return Math.ceil((this.initiative + this.leadership)/20);
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