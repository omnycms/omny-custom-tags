define(["jquery", "OmnyMenu","OmnyText","OmnyYoutube", "utilities/ModuleManager", "utilities/OmnyApiRequester","utilities/QueryStringReader"],
function($, omnyMenu, omnyText, omnyYoutube, moduleManager, api, queryStringReader) {
return {
	load: function() {
		var editing = true;
		function process(element) {
			var promise = new Promise(function (fulfill, reject){

				var childrenPromises = [];

				for(var i=0; i<element.childNodes.length; i++) {
					var current = element.childNodes[i];
					var name = current.nodeName.toLowerCase();
					if(typeof functionMap[name] != "undefined") {
						var processPromise = functionMap[name].display(current);
						if(typeof processPromise != "undefined") {
							childrenPromises.push(processPromise);
						}
						if(functionMap[name].processChildren) {
							childrenPromises.push(process(current));
						}
						if(editing) {
							functionMap[name].markEditable(current);
						}
					} else {
						childrenPromises.push(process(current));
					}
				}
				if(childrenPromises.length==0) {
					fulfill();
				} else {
					Promise.all(childrenPromises).then(function(values) {
					  fulfill();
					});
				}
			});
			return promise;
		}

		var functionMap = {};
		function register(processor) {
			functionMap[processor.elementName.toLowerCase()]= processor;
		}

		function getTag(element, inner) {
			var result = "<"+element.tagName.toLowerCase();
			for(var i=0; i<element.attributes.length; i++) {
				result += " "+element.attributes[i].name+'="'+element.attributes[i].value+'"';
			}
			result+=">"
			if(typeof inner=="string") {
				result += inner;
			}

			result +="</"+element.tagName.toLowerCase()+">";
			return result;
		}

		function getSaveHtml(element) {
			if(element.nodeType==3) {
				return element.wholeText;
			}
			var html = moduleManager.getHtml(element);
			if(html==null) {
				if(element.childNodes.length==0) {
					return element.outerHTML;
				}
				var result="";
				for(var i=0; i<element.childNodes.length; i++) {
					result += getSaveHtml(element.childNodes[i]);
				}

				return getTag(element,result);
			} else {
				return html;
			}
		}

		window.getHtml= function() {
			var sections = {};
			$("omny-section").each(function() {
				var section = $(this).attr("data-section");
				sections[section] = getSaveHtml(this);
			});
			return sections;
		};

		window.writePage=function() {
			api.apiRequestPromise("ui","pages?page="+queryStringReader.getParameter("page") ,{
				type: "PUT",
				data: JSON.stringify(window.getHtml())
			}).then(function() {
				console.log("saved");
			})

		}


		register(omnyMenu);
		register(omnyText);
		register(omnyYoutube);

		var bodyLoadPromise = process(document.body);
		bodyLoadPromise.then(function() {
			window.loaded();
		});
	}
}
});
