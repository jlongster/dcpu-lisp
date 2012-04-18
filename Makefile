
all: compiler.js

compiler.js: compiler.ol
	ol -c compiler.ol > compiler.js
