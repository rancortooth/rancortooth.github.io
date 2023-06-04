#!/bin/bash
set -ex

#
# Tried collecting a bunch of clean-ups and other things to resolve
# prerendering failures. Doesn't really work but not bad steps to remember.
#

rm -rf dist/StarshipFluke
rm -rf .angular/cache
rm package-lock.json
rm -rf node_modules/
rm server.ts
npm install
ng add @nguniversal/express-engine
./build.sh
