
all: compiler.js test

compiler.js: compiler.ol
	./outlet/bin/ol -c -l ./outlet compiler.ol > compiler.js

tests/compile.js: tests/compile.ol
	./outlet/bin/ol -c -l ../outlet tests/compile.ol > tests/compile.js

test: tests/compile.js
	node tests/compile

clean:
	rm compiler.js
	rm tests/compile.js
