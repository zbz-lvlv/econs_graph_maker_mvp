var lineIndexGlobal = 0;

function SvgGraphItemLine(svgGraph){
	
	var self = this;
	
	this.lineIndex = lineIndexGlobal;
	lineIndexGlobal += 1;
	
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;

	this.color = "#000000";
	this.thickness = 3;
	this.gradient = 1.0;
	
	this.dashes = "";
	
	this.label = new SvgGraphItemText(svgGraph);
	this.labelText = "";
	this.labelTextHorizontalAlignment = 'middle';
	this.labelTextVerticalAlignment = 'hanging';
	this.labelPosition = 0; //1: Below, -1: Above
	
	this.type = LineTypeEnum.DEFAULT;
	
	this.variablesInputType = {};
	this.variablesInputType["x1"] = "text";
	this.variablesInputType["y1"] = "text";
	this.variablesInputType["x2"] = "text";
	this.variablesInputType["y2"] = "text";
	this.variablesInputType["color"] = "text";
	this.variablesInputType["thickness"] = "text";
	this.variablesInputType["gradient"] = "text";

	this.currentX = 0;
	this.currentY = 0;
	this.currentMatrix = [];

	this.draw = function(){
		
		var obj = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		obj.setAttribute('x1', this.x1);
		obj.setAttribute('y1', this.y1);
		obj.setAttribute('x2', this.x2);
		obj.setAttribute('y2', this.y2);
		obj.setAttribute('style', "stroke:" + this.color + ";stroke-width:" + this.thickness + ";stroke-dasharray:" + this.dashes);
		obj.setAttribute('type', this.type);
		obj.setAttribute('lineIndex', this.lineIndex);

		obj.onclick = function () { onClickSvgGraphItemLine(obj); };
		obj.onmousedown = function () { this.mouseDown(obj); };
		obj.onmousemove = function () { this.mouseMove(obj); };
		obj.onmouseup = function () { this.mouseUp(obj); };

		svgGraph.draw(obj);
		
		this.label.textT = this.labelText;
		this.label.x = this.x2;
		this.label.y = this.y2 + 5 * this.labelPosition;
		this.label.horizontalAlignment = this.labelTextHorizontalAlignment;
		this.label.verticalAlignment = this.labelTextVerticalAlignment;
		this.label.type = LabelTypeEnum.LINE;
		this.label.draw();

	}
	
	this.makeLineLessElastic = function(){
		
		//Goal: rotate the line by 5 degrees
		var currentTheta = Math.abs(Math.atan((this.y2 - this.y1) / (this.x2 - this.x1)));
		var newTheta = currentTheta - 5 * Math.PI / 180;
		
		var radius = Math.sqrt(Math.pow((this.x2 - this.x1),2) + Math.pow((this.y2 - this.y1),2)) / 2;
		var cx = (this.x1 + this.x2) / 2;
		var cy = (this.y1 + this.y2) / 2;
		var kx = radius * Math.cos(newTheta);
		var ky = radius * Math.sin(newTheta);
		
		//If demand line, (x-kx, y-ky) and (x+ky, y+ky);
		if(this.type == LineTypeEnum.DEMAND){
			this.x1 = cx - kx;
			this.y1 = cy - ky;
			this.x2 = cx + kx;
			this.y2 = cy + ky;
		}
		
		//If supply line, (x-kx, y+ky) and (x+ky, y-ky);
		if(this.type == LineTypeEnum.SUPPLY){
			this.x1 = cx - kx;
			this.y1 = cy + ky;
			this.x2 = cx + kx;
			this.y2 = cy - ky;
		}
		
		this.removeLineFromSvg();
		this.draw();
		
	}

	this.makeLineMoreElastic = function(){
		
		//Goal: rotate the line by 5 degrees
		var currentTheta = Math.abs(Math.atan((this.y2 - this.y1) / (this.x2 - this.x1)));
		var newTheta = currentTheta + 5 * Math.PI / 180;
		
		var radius = Math.sqrt(Math.pow((this.x2 - this.x1),2) + Math.pow((this.y2 - this.y1),2)) / 2;
		var cx = (this.x1 + this.x2) / 2;
		var cy = (this.y1 + this.y2) / 2;
		var kx = radius * Math.cos(newTheta);
		var ky = radius * Math.sin(newTheta);
		
		//If demand line, (x-kx, y-ky) and (x+ky, y+ky);
		if(this.type == LineTypeEnum.DEMAND){
			this.x1 = cx - kx;
			this.y1 = cy - ky;
			this.x2 = cx + kx;
			this.y2 = cy + ky;
		}
		
		//If supply line, (x-kx, y+ky) and (x+ky, y-ky);
		if(this.type == LineTypeEnum.SUPPLY){
			this.x1 = cx - kx;
			this.y1 = cy + ky;
			this.x2 = cx + kx;
			this.y2 = cy - ky;
		}
		
		this.removeLineFromSvg();
		this.draw();
		
	}
	
	this.removeLineFromSvg = function(){
		svgGraphDDSS.getAllElements().forEach(function(line) {
			var lineIndexLocal = $(line).attr("lineIndex");
			if(lineIndexLocal == self.lineIndex){
				svgGraphDDSS.removeElement(line);
			}
		});
		
		svgGraphDDSS.removeElement(this.label.svgText);
	}
	
	this.removeLineFromSvgAndLinesArray = function(){
		this.removeLineFromSvg();
		
		//TODO - the rest
	}

	this.mouseDown = function (obj) {

	    this.currentX = obj.clientX;
	    this.currentY = obj.clientY;

	    this.currentMatrix = obj.getAttributeNS(null, "transform").slice(7, -1).split(' ');
	    for (var i = 0; i < this.currentMatrix.length; i++) {
	        this.currentMatrix[i] = parseFloat(this.currentMatrix[i]);
	    }

	    obj.onmousemove = this.mouseMove;
	    obj.onmouseup = this.mouseUp;

	}

	this.mouseMove = function (obj) {

	    dx = obj.clientX - this.currentX;
	    dy = obj.clientY - this.currentY;

	    this.currentMatrix[4] += dx;
	    this.currentMatrix[5] += dy;

	    newMatrix = "matrix(" + this.currentMatrix.join(' ') + ")";
	    obj.setAttributeNS(null, "transform", newMatrix);

	    this.currentX = obj.clientX;
	    this.currentY = obj.clientY;

	}

	this.mouseUp = function (obj) {

	    obj.selectedElement.removeAttributeNS(null, "onmousemove");
	    obj.selectedElement.removeAttributeNS(null, "onmouseout");
	    obj.selectedElement.removeAttributeNS(null, "onmouseup");

	}
	
}

