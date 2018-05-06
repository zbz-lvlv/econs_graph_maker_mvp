function SvgGraph(){
	
	this.svg = document.getElementById("svgGraph");
	
	this.addItem = function(){
	
	}
	
	this.editItem = function(){
		
	}
	
	this.removeItem = function(){
	
	}
	
	this.draw = function(objToBeDrawn){
		this.svg.appendChild(objToBeDrawn);
	}
	
	this.refresh = function(){
	
	}
	
	this.getWidth = function(){
		return window.screen.availWidth - 2 * SIDE_BAR_WIDTH;
	}
	
	this.getHeight = function(){
		return window.screen.availHeight - (window.outerHeight - window.innerHeight) - TOP_BAR_HEIGHT;
	}
	
	this.getAllElements = function(){
		return this.svg.childNodes;
	}
	
	this.removeElement = function(elementIn){
		this.svg.removeChild(elementIn);
	}
	
	this.clearGraphSpace = function(){
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}
		
		var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.setAttribute('x', 0);
		rect.setAttribute('y', 0);
		rect.setAttribute('height', this.getHeight());
		rect.setAttribute('width', this.getWidth());
		rect.setAttribute('fill', '#ffffff');
		this.svg.appendChild(rect);
	}
	
	this.clearRightSideBar = function(){
		let rightSideBarTop = document.getElementById("rightSideNavigationBarTop");
		
		while (rightSideBarTop.firstChild){
			rightSideBarTop.removeChild(rightSideBarTop.firstChild);
		}
		
		let rightSideBarBottom = document.getElementById("rightSideNavigationBarBottom");
		
		while (rightSideBarBottom.firstChild){
			rightSideBarBottom.removeChild(rightSideBarBottom.firstChild);
		}
	}

}

