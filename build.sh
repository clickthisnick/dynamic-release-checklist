#!/bin/bash

# Current script pwd
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Remove the config template
rm dist/src/config.js

checklists=(
    hotel-checkout-checklist
    jira-release-checklist
    moving-checklist
    travel-checklist
)

buildChecklist() {
    checklist=$1
    
    cd "$DIR" || exit 1
    cp -r "$DIR"/dist/src/. "$DIR"/dist/examples/"${checklist}"
    cp "$DIR"/webpack.config.js "$DIR"/dist/examples/"${checklist}"
    cp "$DIR"/src/checklist.html "$DIR"/dist/examples/"${checklist}"
    cd ${DIR}/dist/examples/${checklist} && ${DIR}/node_modules/webpack-cli/bin/cli.js
    cd "$DIR"/dist/examples/"${checklist}" && find *.js | grep -v bundle.js | xargs rm
}
export -f buildChecklist

for checklist in "${checklists[@]}"
do
    echo "Building ${checklist}"
    buildChecklist "${checklist}"
done;

cd "$DIR" || exit 1

rm -r dist/src
rm -r dist/test
