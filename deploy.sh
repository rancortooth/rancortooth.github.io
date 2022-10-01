#!/bin/bash
set -ex

ng deploy --cname starshipfluke.com
git add .; git commit -m "update"; git push
