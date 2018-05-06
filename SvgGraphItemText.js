function SvgGraphItemText(svgGraph){
	
	this.svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	
	this.textT = "";
	this.fontSizeT = 21;
	this.fontFamilyT = 'Verdana'
	this.fontColorT = '#000000'
	this.horizontalAlignment = 'start';
	this.verticalAlignment = 'middle';
	
	this.type = LabelTypeEnum.DEFAULT;

	this.x = 0;
	this.y = 0;
	
	this.draw = function(){

	    this.svgText.setAttribute('x', this.x);      
	    this.svgText.setAttribute('y', this.y);   
		this.svgText.setAttribute('text-anchor', this.horizontalAlignment);
		this.svgText.setAttribute('alignment-baseline', this.verticalAlignment);
		this.svgText.setAttribute('type', this.type);
		this.svgText.setAttribute('style', "fill: " + this.fontColorT + "; font-size: " + this.fontSizeT + "; font-family: " + this.fontFamilyT);
		this.svgText.onclick = function() { onClickSvgGraphItemText(this.svgText); };
		this.svgText.textContent = this.textT;
		
		svgGraph.draw(this.svgText);
		
	}
	
}