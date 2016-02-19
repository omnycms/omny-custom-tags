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

register(new OmnyText());
register(new OmnyYoutube());
register(new OmnyMenu());

window.loadPromise = process(document.body);
window.loadPromise.then(function() {
	console.log("page loaded");
})
