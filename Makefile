
all: compiler.js test

compiler.js: compiler.ol
	./outlet/bin/ol -c compiler.ol > compiler.js

tests/compile.js: tests/compile.ol
	./outlet/bin/ol -c tests/compile.ol > tests/compile.js

test: tests/compile.js
	node tests/compile
