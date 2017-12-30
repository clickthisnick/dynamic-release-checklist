# /bin/bash

cp src/checklist.html dist/examples/hotel-checkout-checklist
cp -r dist/src/js dist/examples/hotel-checkout-checklist
cp dist/src/checklist.js dist/examples/hotel-checkout-checklist

cp src/checklist.html dist/examples/jira-release-checklist
cp -r dist/src/js dist/examples/jira-release-checklist
cp dist/src/checklist.js dist/examples/jira-release-checklist

cp src/checklist.html dist/examples/travel-checklist
cp -r dist/src/js dist/examples/travel-checklist
cp dist/src/checklist.js dist/examples/travel-checklist

rm -r dist/src
rm -r dist/test
