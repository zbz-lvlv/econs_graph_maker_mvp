function SvgGraphDemandSupply(){
		
	SvgGraph.call(this);
	
	this.intersections = [];
	
	this.demandLines = [];
	this.numberOfDemandLines = 0;
	this.supplyLines = [];
	this.numberOfSupplyLines = 0;
	
	this.svgGraphItemAxis = new SvgGraphItemAxis(this);
	
	this.onClickDemandSupplyStandard = function(){
		
		this.svgGraphItemAxis.xAxisText = "Quantity of apples/kg";
		this.svgGraphItemAxis.yAxisText = "Price of apple/$";
		this.svgGraphItemAxis.draw();
		
		this.addDemandLine();
		this.addSupplyLine();
		
		this.addIntersections();
		this.addIntersectionLabels();
		
		var addItemsTemplate = document.getElementById('demandSupplyAddItemsTemplate');
		document.getElementById('rightSideNavigationBarTop').appendChild(addItemsTemplate.content.cloneNode(true));
		
		var attributesTemplate = document.getElementById('svgGraphAttributeTemplate');
		document.getElementById('rightSideNavigationBarBottom').appendChild(attributesTemplate.content.cloneNode(true));
		
	}

	this.addDemandLine = function(){
		
		var demandLine = new SvgGraphItemLine(this);
		demandLine.type = LineTypeEnum.DEMAND;
		demandLine.x1 = this.svgGraphItemAxis.yAxisX + DEMAND_SUPPLY_GRAPH_MARGIN + 75 * (this.numberOfDemandLines);
		demandLine.y1 = this.svgGraphItemAxis.yAxisY1 + DEMAND_SUPPLY_GRAPH_MARGIN;
		demandLine.y2 = this.svgGraphItemAxis.xAxisY - DEMAND_SUPPLY_GRAPH_MARGIN;
		demandLine.x2 = demandLine.x1 + demandLine.y2 - demandLine.y1;
		demandLine.labelText = "DD" + (this.numberOfDemandLines + 1);
		demandLine.labelTextVerticalAlignment = 'hanging';
		demandLine.labelPosition = 1;
		demandLine.draw(); 
		this.demandLines.push(demandLine);
		
		this.numberOfDemandLines++;
		
		return demandLine;
		
	}

	this.addSupplyLine = function(){
		
		var supplyLine = new SvgGraphItemLine(this);
		supplyLine.type = LineTypeEnum.SUPPLY;
		supplyLine.x1 = this.svgGraphItemAxis.yAxisX + DEMAND_SUPPLY_GRAPH_MARGIN + 75 * (this.numberOfSupplyLines);
		supplyLine.y1 = this.svgGraphItemAxis.xAxisY - DEMAND_SUPPLY_GRAPH_MARGIN;
		supplyLine.y2 = this.svgGraphItemAxis.yAxisY1 + DEMAND_SUPPLY_GRAPH_MARGIN;
		supplyLine.x2 = supplyLine.x1 + supplyLine.y1 - supplyLine.y2;
		supplyLine.labelText = "SS" + (this.numberOfSupplyLines + 1);
		supplyLine.labelTextVerticalAlignment = 'baseline';
		supplyLine.labelPosition = -1;
		supplyLine.draw();
		this.supplyLines.push(supplyLine);
		
		this.numberOfSupplyLines++;
		
		return supplyLine;
		
	}

	this.addLabel = function(){
		
		
		
	}

	this.addArrow = function(){
		
		
		
	}
	
	this.addIntersectionLabels = function(){
		
		for(i = 0; i < this.intersections.length; i++){
			
			let thisIntersection = this.intersections[i];
			
			var priceLabel = new SvgGraphItemText(this);
			priceLabel.x = this.svgGraphItemAxis.yAxisX - 10;
			priceLabel.y = thisIntersection.y;
			priceLabel.textT = "P" + (i + 1);
			priceLabel.horizontalAlignment = 'end'
			priceLabel.verticalAlignment = 'middle'
			priceLabel.type = LabelTypeEnum.VALUE;
			priceLabel.draw();
			
			var quantityLabel = new SvgGraphItemText(this);
			quantityLabel.x = thisIntersection.x;
			quantityLabel.y = this.svgGraphItemAxis.xAxisY + 10;
			quantityLabel.textT = "Q" + (i + 1);
			quantityLabel.horizontalAlignment = 'middle'
			quantityLabel.verticalAlignment = 'hanging'
			quantityLabel.type = LabelTypeEnum.VALUE;
			quantityLabel.draw();
			
			var priceLine = new SvgGraphItemLine(this);
			priceLine.x1 = thisIntersection.x;
			priceLine.y1 = thisIntersection.y;
			priceLine.x2 = this.svgGraphItemAxis.yAxisX;
			priceLine.y2 = thisIntersection.y;
			priceLine.thickness = 2;
			priceLine.dashes = "5, 5";
			priceLine.draw();
			
			var quantityLine = new SvgGraphItemLine(this);
			quantityLine.x1 = thisIntersection.x;
			quantityLine.y1 = thisIntersection.y;
			quantityLine.x2 = thisIntersection.x;
			quantityLine.y2 = this.svgGraphItemAxis.xAxisY;
			quantityLine.thickness = 2;
			quantityLine.dashes = "5, 5";
			quantityLine.draw();
			
			var equilibriumLabel = new SvgGraphItemText(this);
			equilibriumLabel.x = thisIntersection.x + 10;
			equilibriumLabel.y = thisIntersection.y;
			equilibriumLabel.textT = "E" + (i + 1);
			equilibriumLabel.horizontalAlignment = 'start'
			equilibriumLabel.verticalAlignment = 'middle'
			equilibriumLabel.type = LabelTypeEnum.VALUE;
			equilibriumLabel.draw();
			
		}
		
	}
	
	this.addIntersections = function(){
		
		this.intersections = [];
		
		var demandLines = [];
		var supplyLines = [];
		
		let allElements = this.getAllElements();
		for(i = 0; i < allElements.length; i++){
			if($(allElements[i]).attr('type') == LineTypeEnum.DEMAND){
				demandLines.push(allElements[i]);
			}
			if($(allElements[i]).attr('type') == LineTypeEnum.SUPPLY){
				supplyLines.push(allElements[i]);
			}
		}
		
		for(i = 0; i < demandLines.length; i++){
			
			for(i2 = 0; i2 < supplyLines.length; i2++){
			
				let intersection = this.checkLineIntersection(
					parseInt($(demandLines[i]).attr('x1')), 
					parseInt($(demandLines[i]).attr('y1')),
					parseInt($(demandLines[i]).attr('x2')), 
					parseInt($(demandLines[i]).attr('y2')),
					parseInt($(supplyLines[i2]).attr('x1')), 
					parseInt($(supplyLines[i2]).attr('y1')),
					parseInt($(supplyLines[i2]).attr('x2')), 
					parseInt($(supplyLines[i2]).attr('y2')),
				);
				
				this.intersections.push(intersection);
			
			}
			
		}
		
	}
	
	this.updateIntersectionLabels = function(newIntersections){
		
		for(i = 0; i < newIntersections.length; i++){
			
			let index = this.intersections.length - newIntersections.length + i + 1;
			
			let thisIntersection = newIntersections[i];
			
			var priceLabel = new SvgGraphItemText(this);
			priceLabel.x = this.svgGraphItemAxis.yAxisX - 10;
			priceLabel.y = thisIntersection.y;
			priceLabel.textT = "P" + index;
			priceLabel.horizontalAlignment = 'end'
			priceLabel.verticalAlignment = 'middle'
			priceLabel.type = LabelTypeEnum.VALUE;
			priceLabel.draw();
			
			var quantityLabel = new SvgGraphItemText(this);
			quantityLabel.x = thisIntersection.x;
			quantityLabel.y = this.svgGraphItemAxis.xAxisY + 10;
			quantityLabel.textT = "Q" + index;
			quantityLabel.horizontalAlignment = 'middle'
			quantityLabel.verticalAlignment = 'hanging'
			quantityLabel.type = LabelTypeEnum.VALUE;
			quantityLabel.draw();
			
			var priceLine = new SvgGraphItemLine(this);
			priceLine.x1 = thisIntersection.x;
			priceLine.y1 = thisIntersection.y;
			priceLine.x2 = this.svgGraphItemAxis.yAxisX;
			priceLine.y2 = thisIntersection.y;
			priceLine.thickness = 2;
			priceLine.dashes = "5, 5";
			priceLine.draw();
			
			var quantityLine = new SvgGraphItemLine(this);
			quantityLine.x1 = thisIntersection.x;
			quantityLine.y1 = thisIntersection.y;
			quantityLine.x2 = thisIntersection.x;
			quantityLine.y2 = this.svgGraphItemAxis.xAxisY;
			quantityLine.thickness = 2;
			quantityLine.dashes = "5, 5";
			quantityLine.draw();
			
			var equilibriumLabel = new SvgGraphItemText(this);
			equilibriumLabel.x = thisIntersection.x + 10;
			equilibriumLabel.y = thisIntersection.y;
			equilibriumLabel.textT = "E" + index;
			equilibriumLabel.horizontalAlignment = 'start'
			equilibriumLabel.verticalAlignment = 'middle'
			equilibriumLabel.type = LabelTypeEnum.VALUE;
			equilibriumLabel.draw();
			
		}
		
	}
	
	this.updateIntersections = function(lineAdded, lineType){
		
		var newIntersections = [];
		
		if(lineType == LineTypeEnum.DEMAND){
		
			var supplyLines = [];
			
			let allElements = this.getAllElements();
			for(i = 0; i < allElements.length; i++){
				if($(allElements[i]).attr('type') == LineTypeEnum.SUPPLY){
					supplyLines.push(allElements[i]);
				}
			}
			
			for(i = 0; i < supplyLines.length; i++){
			
				let intersection = this.checkLineIntersection(
					parseInt(lineAdded.x1), 
					parseInt(lineAdded.y1),
					parseInt(lineAdded.x2), 
					parseInt(lineAdded.y2),
					parseInt($(supplyLines[i]).attr('x1')), 
					parseInt($(supplyLines[i]).attr('y1')),
					parseInt($(supplyLines[i]).attr('x2')), 
					parseInt($(supplyLines[i]).attr('y2')),
				);
				
				newIntersections.push(intersection);
				this.intersections.push(intersection);
			
			}
		
		}
		
		else if(lineType == LineTypeEnum.SUPPLY){
		
			var demandLines = [];
			
			let allElements = this.getAllElements();
			for(i = 0; i < allElements.length; i++){
				if($(allElements[i]).attr('type') == LineTypeEnum.DEMAND){
					demandLines.push(allElements[i]);
				}
			}
			
			for(i = 0; i < demandLines.length; i++){
			
				let intersection = this.checkLineIntersection(
					parseInt(lineAdded.x1), 
					parseInt(lineAdded.y1),
					parseInt(lineAdded.x2), 
					parseInt(lineAdded.y2),
					parseInt($(demandLines[i]).attr('x1')), 
					parseInt($(demandLines[i]).attr('y1')),
					parseInt($(demandLines[i]).attr('x2')), 
					parseInt($(demandLines[i]).attr('y2')),
				);
				
				newIntersections.push(intersection);
				this.intersections.push(intersection);
			
			}
		
		}
		
		return newIntersections;
		
	}
	
	this.checkLineIntersection = function(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY, demandIndex, supplyIndex) {
		// if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
		var denominator, a, b, numerator1, numerator2, result = {
			x: null,
			y: null,
			demandIndex: null,
			supplyIndex: null
		};
		denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
		if (denominator == 0) {
			return result;
		}
		a = line1StartY - line2StartY;
		b = line1StartX - line2StartX;
		numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
		numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
		a = numerator1 / denominator;
		b = numerator2 / denominator;

		// if we cast these lines infinitely in both directions, they intersect here:
		result.x = line1StartX + (a * (line1EndX - line1StartX));
		result.y = line1StartY + (a * (line1EndY - line1StartY));
		
		result.demandIndex = demandIndex;
		result.supplyIndex = supplyIndex;
		
		// if line1 and line2 are segments, they intersect if both of the above are true
		return result;
	};
	
		
}