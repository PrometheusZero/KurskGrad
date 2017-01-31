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
		var thisVehID = parseInt($(this).prop('id'));
		if($('#' + thisVehID + '_assignDriverBox')){
			$('#' + thisVehID + '_assignDriverBox').remove();
		}
		$('#vehInfoContainer').append('<table id="' + thisVehID + '_assignDriverBox" class="infoPage"><tr><th colspan="2">Driver Assign</th></tr></table>');
		$('#' + thisVehID + '_assignDriverBox').show();
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
	openAssignWeaponToVehicleFrontHardpoint:$('#vehInfoContainer').on('click', '.vehInfo_frontWpnAssign', function(){
		var thisVehID = parseInt($(this).prop('id'));
		if($('#' + thisVehID + '_assignFrontWeaponBox')){
			$('#' + thisVehID + '_assignFrontWeaponBox').remove();
		}
		$('#vehInfoContainer').append('<table id="' + thisVehID + '_assignFrontWeaponBox" class="infoPage"><tr><th colspan="2">Front Weapon Assign</th></tr></table>');
		$('#' + thisVehID + '_assignFrontWeaponBox').show();
		for(let i=0;i<data.weapons.length;i++){
			if(data.weapons[i].category === 0.5){
				var stringBuilder = '';
				stringBuilder += '<tr id="' + data.weapons[i].wpnID + '_assignWeaponToVehicleFront" class="assignWeaponToVehicleFront dpe">';
				stringBuilder += '<td>' + data.weapons[i].name + '</td>';
				stringBuilder += '<td>' + data.weapons[i].totalWeight() + '</td>'
				stringBuilder += '</tr>';
				$('#' + thisVehID + '_assignFrontWeaponBox').append(stringBuilder);
			}
		}
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