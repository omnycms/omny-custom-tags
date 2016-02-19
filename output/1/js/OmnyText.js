define(["jquery"], function($) {
function OmnyText() {
	this.elementName = "omny-text";
	this.display = function(element) {

	};

	this.processChildren = false;

	this.markEditable = function(element) {
		element.setAttribute("contenteditable","true");
	};

	this.getStatic = function(element) {
		return element.outerHTML;
	};
}
return new OmnyText();
});
