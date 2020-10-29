#!/bin/bash

# Download Webapp and build it into static/

repo="https://github.com/Siegler-von-Catan/SiegelWebapp"

if [ -d static ]; then
  cd static || exit
  cached_head=$(cat head_version)
  current_head=$(git ls-remote $repo.git refs/heads/release | cut -d$'\t' -f1)
  if [ "$cached_head" = "$current_head" ]; then
    echo 'Newest webpage version already downloaded'
    exit
  fi
  cd .. || exit
fi

mkdir static_tmp
cd static_tmp || exit
curl -L $repo/tarball/release | tar xz -C . --strip-components=1
head=$(git ls-remote $repo.git refs/heads/release | cut -d$'\t' -f1)
npm install
npm run build
cd .. || exit

rm -rf static
mkdir static
mv static_tmp/dist/* static
echo "$head" > static/head_version

rm -rf static_tmp
