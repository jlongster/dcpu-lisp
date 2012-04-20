
all: compiler.js test

compiler.js: compiler.ol
	ol -c compiler.ol > compiler.js

tests/compile.js: tests/compile.ol
	ol -c tests/compile.ol > tests/compile.js

test: tests/compile.js
	node tests/compile
