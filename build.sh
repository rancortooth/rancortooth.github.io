#!/bin/bash
set -ex

rm -rf docs/
rm -rf .angular/cache/
ng run StarshipFluke:prerender

if [ "$1" == "run" ]; then
    cd docs
    python3 -m http.server
fi
