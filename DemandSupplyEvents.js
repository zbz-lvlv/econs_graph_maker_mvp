var numberOfDemandLines = 0;
var numberOfSupplyLines = 0;

let svgGraphDDSS = new SvgGraphDemandSupply();

function onClickDemandSupplyStandard(){
	
	svgGraphDDSS.clearGraphSpace();
	svgGraphDDSS.clearRightSideBar();
	
	svgGraphDDSS.numberOfDemandLines = 0;
	svgGraphDDSS.numberOfSupplyLines = 0;
	
	svgGraphDDSS.onClickDemandSupplyStandard();
	
}

function ddSSAddDemandLine(){
	let dLine = svgGraphDDSS.addDemandLine();
	let newIntersections = svgGraphDDSS.updateIntersections(dLine, 'DEMAND');
	svgGraphDDSS.updateIntersectionLabels(newIntersections);
}

function ddSSAddSupplyLine(){
	let sLine = svgGraphDDSS.addSupplyLine();
	let newIntersections = svgGraphDDSS.updateIntersections(sLine, 'SUPPLY');
	svgGraphDDSS.updateIntersectionLabels(newIntersections);
}

function ddSSAddLabel(){
	svgGraphDDSS.addLabel();
}

function ddSSAddArrow(){
	svgGraphDDSS.addArrow();
}

function ddSSMakeLineLessElastic(navBarWithIndex){
	
	var index = $(navBarWithIndex).attr('lineIndex');
	
	var demandLines = svgGraphDDSS.demandLines.filter(function( obj ) {
	    return obj.lineIndex == index;
	});
	
	var supplyLines = svgGraphDDSS.supplyLines.filter(function( obj ) {
	    return obj.lineIndex == index;
	});
	
	if(demandLines.length > 0){
		demandLines[0].makeLineLessElastic();
	}
	
	if(supplyLines.length > 0){
		supplyLines[0].makeLineLessElastic();
	}
	
}

function ddSSMakeLineMoreElastic(navBarWithIndex){
	
	var index = $(navBarWithIndex).attr('lineIndex');
	
	var demandLines = svgGraphDDSS.demandLines.filter(function( obj ) {
	    return obj.lineIndex == index;
	});
	
	var supplyLines = svgGraphDDSS.supplyLines.filter(function( obj ) {
	    return obj.lineIndex == index;
	});
	
	if(demandLines.length > 0){
		demandLines[0].makeLineMoreElastic();
	}
	
	if(supplyLines.length > 0){
		supplyLines[0].makeLineMoreElastic();
	}
	
}