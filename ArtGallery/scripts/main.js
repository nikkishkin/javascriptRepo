(function() {
	var selectedIndex = 0;
	var items;
	var renderedItemsCount = 0;
	
	$(document).ready(function() {
		$.getJSON("pictures.json", showExhibits);
		$(document).keydown(keydownHandler);
	});
	
	function keydownHandler(event) {
		if (items) {
			switch(event.which) {
				case 37:
					event.preventDefault();
					if (selectedIndex === 0) {
						break;
					}
					selectedIndex--;
					var selectedElement = $("#exhibitList").children().eq(selectedIndex);
					selectedElement.addClass("selected");
					selectedElement.next().removeClass("selected");				
					
					var delta = selectedElement.offset().left - $("body").scrollLeft();
					if (delta < 0) {
						var oldDelta = parseInt($("#exhibitList li").css("transform")
							.split('(')[1].split(')')[0].split(',')[4], 10);
						$("#exhibitList li").css("transform", "translateX(" + (oldDelta - delta) + "px)");
					}
					break;
				case 39:
					event.preventDefault();
					if (selectedIndex === (items.length - 1)) {
						break;
					}
					selectedIndex++;
					var selectedElement = $("#exhibitList").children().eq(selectedIndex);
					selectedElement.addClass("selected");
					selectedElement.prev().removeClass("selected");
					
					var delta = $("body").innerWidth() - selectedElement.offset().left 
						- selectedElement.outerWidth() + $("body").scrollLeft();
					if (delta < 0) {
						if (renderedItemsCount < items.length) {
							$("#exhibitList").append(items[selectedIndex + 1]);
							renderedItemsCount++;
						}
						var oldDelta = parseInt($("#exhibitList li").css("transform")
							.split('(')[1].split(')')[0].split(',')[4], 10);
						$("#exhibitList li").css("transform", "translateX(" + (oldDelta + delta) + "px)");
					}
					break;
			}
		}
	}
	
	function showExhibits(data) {
		items = [];
		if (data.length > 0) {
			items.push("<li class='selected'><div class='pictureContainer'><img class='picture' src='"
				+ data[0].source + "'></div><div class='description'>" + data[0].description 
				+ "</div></li>");
		}
		for(var i = 1; i < data.length; i++) {
			items.push("<li><div class='pictureContainer'><img class='picture' src='"
                + data[i].source + "'></div><div class='description'>" + data[i].description 
                + "</div></li>");
		}
		
		var renderCount = (getItemsToRenderCount() < data.length) ? getItemsToRenderCount() : data.length;	
		$("#exhibitList").html(items.slice(0, renderCount).join(""));
		renderedItemsCount = renderCount;
	}
	
	function getItemsToRenderCount() {
		return Math.floor($("body").innerWidth() / $("#exhibitList li").first().outerWidth()) + 1;
	}
})();