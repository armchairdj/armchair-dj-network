REPORTER = min

test: unit functional

unit:
	@NODE_ENV=test NODE_PATH=lib:spec \
		./node_modules/.bin/mocha \
		-r ./spec/testUtils/testRunner \
		-t 4000 \
		-R $(REPORTER) \
		spec/testUtils/unitTestHooks.js spec/unit/**/*.js 2>&1 | grep -v timer | grep -v /node_modules/

functional:
	@NODE_ENV=test NODE_PATH=lib:spec \
		./node_modules/.bin/mocha \
		-r ./spec/testUtils/testRunner \
		-t 4000 \
		-R $(REPORTER) \
		spec/functional/**/*.js 2>&1 | grep -v timer | grep -v /node_modules/ | grep -v 'EXCEPTION - ' | grep -v "at.*:*[0-9]:*[0-9].*"

test-single:
	@NODE_ENV=test NODE_PATH=lib:spec \
		./node_modules/.bin/mocha \
		-r ./spec/testUtils/testRunner \
		-t 4000 \
		-R $(REPORTER) \
		${FILE} 2>&1 | grep -v timer | grep -v /node_modules/ | grep .

test-d:
	@NODE_ENV=test NODE_PATH=lib:spec \
		./node_modules/.bin/mocha debug \
		-r ./spec/testUtils/testRunner \
		-t 4000 \
		-R $(REPORTER) \
		spec/**/*.js

server:
	node server.js

debug:
	node debug server.js

gulp:
	@./node_modules/.bin/gulp

inspector:
	@./node_modules/.bin/node-inspector --web-port 9070 \
		--no-preload & node --debug app.js
