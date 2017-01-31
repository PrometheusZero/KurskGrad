///////////////////
// INPUT SETTERS //
///////////////////

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