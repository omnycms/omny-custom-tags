define(["jquery"], function($) {
function OmnyYoutube() {
	this.elementName = "omny-youtube";
	this.display = function(element) {
		var url = element.getAttribute("url");
		var id = url.substring(url.indexOf("v=")+2);
		var content = '<iframe width="854" height="480" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
		element.innerHTML=content;
	};

	this.processChildren = false;

	this.markEditable = function(element) {

	};

	this.getStatic = function(element) {

	};
}
return new OmnyYoutube();
});
