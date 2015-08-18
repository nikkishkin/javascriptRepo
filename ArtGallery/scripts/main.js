(function() {
	var selectedIndex = 0;
	var itemsCount;
	
	$(document).ready(function() {
		$.getJSON("pictures.json", showExhibits);
		$(document).keydown(keydownHandler);
	});
	
	function keydownHandler(event) {
		if (itemsCount) {
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
						window.scrollBy(delta, 0)
					}
					break;
				case 39:
					event.preventDefault();
					if (selectedIndex === (itemsCount - 1)) {
						break;
					}
					selectedIndex++;
					var selectedElement = $("#exhibitList").children().eq(selectedIndex);
					selectedElement.addClass("selected");
					selectedElement.prev().removeClass("selected");
					
					var delta = $("body").innerWidth() - selectedElement.offset().left 
						- selectedElement.outerWidth() + $("body").scrollLeft();
					if (delta < 0) {
						window.scrollBy(-delta, 0)
					}
					break;
			}
		}
	}
	
	function showExhibits(data) {
		var items = [];
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
		itemsCount = items.length;

        $("#exhibitList").html(items.join(""));
	}
})();