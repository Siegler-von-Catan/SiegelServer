#!/bin/bash

#
# ShapeFromShading - Creating heightmaps out of 2D seal images.
# Copyright (C) 2021
# Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

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
