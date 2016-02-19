
define(["jquery", "utilities/OmnyApiRequester"], function($, api) {
function OmnyMenu() {
	this.elementName = "omny-menu";
	this.display = function(element) {
		var promise = new Promise(function (fulfill, reject) {
			api.apiRequestPromise("menus","default/entries",{}).then(function(sites) {
				var ul = document.createElement("ul");
				for(var i=0; i<sites.length; i++) {
					var link = sites[i];
					var li = document.createElement("li");
					var a = document.createElement("a");
					a.innerHTML = link.title;
					a.setAttribute("href", link.link);
					li.appendChild(a);
					ul.appendChild(li);
				}
				element.appendChild(ul);
				fulfill();
			})

		});
		return promise;
	};

	this.processChildren = false;

	this.markEditable = function(element) {
	};

	this.getStatic = function(element) {
		return element.outerHTML;
	};
}

return new OmnyMenu();
});
