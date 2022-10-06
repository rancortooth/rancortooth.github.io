#!/bin/bash
set -ex

rm -rf docs/
rm -rf .angular/cache/
ng run StarshipFluke:prerender

cd docs
python3 -m http.server

#git status
#git add .; git commit -m "update"; git push
