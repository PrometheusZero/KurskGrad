////////////////
//DOM UPDATERS//
////////////////

var domUpdate = {
	
	//UPDATES/ADDS TO INVENTORY -> STASH WEAPON TABLE
	//REMOVES STACH TABLE AND REPOPULATES WITH ENTIRE DB
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
	
	//CREATE RIGHT-SIDE INFO TABLE FOR A SPECIFIC WEAPON
	infoWeapon:function(thisWpn){
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
	//REMOVES CHARACTER TABLE AND REPOPULATES ENTIRE THING
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
	//ADDS EMPTY INFO BOX FOR CHARACTER
	infoCharacter:function(thisChar){
		var stringBuilder = "";
		stringBuilder += '<table id="' + thisChar.charID + '_charInfo" class="infoPage">';
		stringBuilder += '</table>';
		$('#charInfoContainer').append(stringBuilder);
		
		domUpdate.infoCharContent(thisChar);
	},
	
	//POPULATES INFO BOX WITH CHARACTER INFORMATION
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
	//ACTUALLY REMOVES GARAGE TABLE AND REPOPULATES ENTIRE THING
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
	
	//ADDS EMPTY INFO BOX FOR VEHICLES
	infoVehicle:function(thisVeh){
		var id = thisVeh.root.id;
		var stringBuilder = "";
		stringBuilder += '<table id="' + id + '_vehInfo" class="infoPage">';
		stringBuilder += '</table>';
		$('#vehInfoContainer').append(stringBuilder);
		
		domUpdate.infoVehicleContent(thisVeh);
	},
	
	//POPULAETS VEHICLE INFO BOX
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
	
	//DISPLAYS WEAPON PROPERTIES, PREVENTS PURCHASE IF ILLEGAL
	wpnToBuy:function(){
		var thisWpn = temporary.weapons[0]
		var theCost = thisWpn.totalCost();
		var theWeight = thisWpn.totalWeight();
		var theCategory = thisWpn.category;
		$('#totalCost').text(theCost);
		$('#totalWgt').text(theWeight);
		if((theCategory == 2 && theWeight > 30) || (theCategory == 1 && theWeight > 75) || (theCategory == 0.5 && theWeight > 300)){
			$('#wpnWarning').text("ILLEGAL!");
		}else{
			$('#wpnWarning').text("");
			$('#wpnBUY').prop('disabled', false);
		}
	},
	
	//RESETS ALL WEAPON FIELDS
	wpnReset:function(){
		$('#wpnName').val("");
		$('#wpnBUY').prop('disabled', true);
		$('#wpnGen').prop('disabled', true);
		$('#totalCost').text("");
		$('#totalWgt').text("");
	},
	
	//DISPLAYS CHARACTER PROPERTIES
	charToBuy: {
		leader:function(){
			$('#nameStat').text($('#charName').val());
			$('#rankStat').text('Leader');
			$('#moveStat').html('&#8730;(S&sup2;+T&sup2;)');
			$('#wsStat').text('60 + d6');
			$('#bsStat').text('60 + d6');
			$('#sStat').text('3');
			$('#tStat').text('3');
			$('#wStat').text('(I + Ld)/20');
			$('#iStat').text('40 + d6');
			$('#aStat').text('(WS+BS)/40');
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
			$('#moveStat').html('&#8730;(S&sup2;+T&sup2;)');
			$('#wsStat').text('40 + d6');
			$('#bsStat').text('60 + d6');
			$('#sStat').text('3');
			$('#tStat').text('2');
			$('#wStat').text('(I + Ld)/20');
			$('#iStat').text('30 + d6');
			$('#aStat').text('(WS+BS)/40');
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
			$('#moveStat').html('&#8730;(S&sup2;+T&sup2;)');
			$('#wsStat').text('50 + d6');
			$('#bsStat').text('50 + d6');
			$('#sStat').text('2');
			$('#tStat').text('2');
			$('#wStat').text('(I + Ld)/20');
			$('#iStat').text('20 + d6');
			$('#aStat').text('(WS+BS)/40');
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
			$('#moveStat').html('&#8730;(S&sup2;+T&sup2;)');
			$('#wsStat').text('30 + d6');
			$('#bsStat').text('30 + d6');
			$('#sStat').text('1');
			$('#tStat').text('1');
			$('#wStat').text('(I + Ld)/20');
			$('#iStat').text('20 + d6');
			$('#aStat').text('(WS+BS)/40');
			$('#ldStat').text('10 + d6');
			$('#costStat').text('0');
			$('#weightStat').text('60');
			$('#carryStat').text('90');
			$('#xpStat').text('0');
			$('#charBUY').prop('disabled', false);
		}
	},
	
	//RESETS ALL CHARACTER FIELDS
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
	
	//DISPLAYS VEHICLE PROPERTIES
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
	
	//RESETS ALL VEHICLE FIELDS
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