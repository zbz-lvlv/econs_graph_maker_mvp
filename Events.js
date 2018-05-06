function onClickSvgGraphItemText(textClickedOn){
	
	var attributesTemplate = document.getElementById('svgGraphItemTextAttributeTemplate');
	var navBarBottom = document.getElementById('rightSideNavigationBarBottom');
	
	while(navBarBottom.firstChild){
		navBarBottom.removeChild(navBarBottom.firstChild);
	}
	navBarBottom.appendChild(attributesTemplate.content.cloneNode(true));
	
	var inputText = document.getElementById('svgGraphItemTextAttributeInputText');
	inputText.value = textClickedOn.textContent;
	
	$(inputText).on('input', function() { 
		textClickedOn.textContent = inputText.value;
	});
	
}

function onClickSvgGraphItemLine(lineClickedOn) {

    var attributesTemplate = document.getElementById('svgGraphItemLineAttributeTemplate');
    var navBarBottom = document.getElementById('rightSideNavigationBarBottom');

    while (navBarBottom.firstChild) {
        navBarBottom.removeChild(navBarBottom.firstChild);
    }
	
	var navBarBottomContentNode = attributesTemplate.content.cloneNode(true);
	var lineIndex = $(lineClickedOn).attr("lineIndex");
	navBarBottom.setAttribute('lineIndex', lineIndex);
    navBarBottom.appendChild(navBarBottomContentNode);

}

function onClickExport(linkExport){
	
	//Load a svg snippet in the canvas with id = 'svgGraph'
	let graphCanvas = document.createElement('canvas');
	graphCanvas.width = window.screen.availWidth - 2 * SIDE_BAR_WIDTH;
	graphCanvas.height = window.screen.availHeight - (window.outerHeight - window.innerHeight) - TOP_BAR_HEIGHT;
	
	let svg = document.getElementById('svgGraph');
	
	var svg_xml = (new XMLSerializer()).serializeToString(svg);

	// write serialized svg to canvas
	canvg(graphCanvas, svg_xml, {useCORS: true});

	linkExport.href = graphCanvas.toDataURL('image/png');

}