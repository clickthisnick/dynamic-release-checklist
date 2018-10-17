#!/bin/bash

# Remove the config template
rm dist/src/config.js

cp -r dist/src/. dist/examples/hotel-checkout-checklist
cp webpack.config.js dist/examples/hotel-checkout-checklist
cp src/checklist.html dist/examples/hotel-checkout-checklist
$(cd dist/examples/hotel-checkout-checklist && npx webpack && find *.js | grep -v bundle.js | xargs rm)

cp -r dist/src/. dist/examples/jira-release-checklist
cp webpack.config.js dist/examples/jira-release-checklist
cp src/checklist.html dist/examples/jira-release-checklist
$(cd dist/examples/jira-release-checklist && npx webpack && find *.js | grep -v bundle.js | xargs rm)

cp -r dist/src/. dist/examples/travel-checklist
cp webpack.config.js dist/examples/travel-checklist
cp src/checklist.html dist/examples/travel-checklist
$(cd dist/examples/travel-checklist && npx webpack && find *.js | grep -v bundle.js | xargs rm)

rm -r dist/src
rm -r dist/test
