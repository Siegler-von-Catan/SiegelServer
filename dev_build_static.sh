#!/bin/bash

if [ -d static ]; then
  rm -rf static
fi
mkdir static
server_dir=$PWD

cd "$1" || exit
npm install
npm run build
cp -r dist/. "$server_dir/static"

cd "$server_dir" || exit
