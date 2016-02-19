define(["jquery","utilities/ModuleManager"], function($, moduleManager) {
function OmnyText() {
	this.elementName = "omny-text";
	this.display = function(element) {

	};

	this.processChildren = false;

	this.markEditable = function(element) {
		require(["lib/ckeditor/ckeditor"], function(ckeditor) {
        window.CKEDITOR.disableAutoInline = true;
        var toolBarItems = ["Bold","Italic","Underline","Undo","Redo","Sourcedialog"];
        var toolbar = {"toolbar":[toolBarItems]};
				var div = document.createElement("div");
				div.innerHTML = element.innerHTML;
				element.innerHTML="";
				element.appendChild(div);
        var editor = window.CKEDITOR.inline(div,toolbar);
				$(div).attr("contenteditable","true");
        editor.on("instanceReady", function() {
            editor.setReadOnly(false);
        });
				moduleManager.setSaveFunction(element,function() {
            return "<omny-text>"+editor.getData()+"</omny-text>"
        });
    });
	};

	this.getStatic = function(element) {
		return element.outerHTML;
	};
}
return new OmnyText();
});
