#!/bin/bash
set -ex

rm -rf dist/StarshipFluke
rm -rf docs
rm -rf .angular/cache/
node ./scripts/generatePageIndex.js
ng run StarshipFluke:prerender

#
# Github needs to locate the files in a "docs" directory
#
mkdir docs
mv dist/StarshipFluke/browser/* docs/
mv dist/StarshipFluke/server/main.js docs/

if [ "$1" == "run" ]; then
    cd docs
    cmd.exe /C start http://localhost:8000
    python3 -m http.server
fi
