npm install requirejs

mkdir -p output/$2/js/lib

cp src/js/lib/ output/$2/js/ -r
node node_modules/requirejs/bin/r.js -o build.js
mv output/js/app.js output/$2/js/app.js -f
npm install -g mustache
mustache $1 src/partial-index.html > output/$2/index.html
