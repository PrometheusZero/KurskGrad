/////////////////////
// EVENT LISTENERS //
/////////////////////

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