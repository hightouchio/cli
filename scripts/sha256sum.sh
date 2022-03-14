#!/bin/sh
set -e

SHA="sha256sum"
if [ "$(uname)" = "Darwin" ]; then
    SHA="shasum -a 256"
fi

cd ./dist/artifacts && find ht* -type f -exec $SHA {} \; > ./sha256sum-amd64.txt;
