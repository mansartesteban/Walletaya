#!/bin/bash

CURRENT_DIRECTORY=${PWD}

# Build the app
pnpm build

# Go to target directory build
cd ../mansartesteban.github.io

# Adding version build number
pnpm version patch
LIB_VERSION=$(pnpm pkg get version --workspaces=false | tr -d \")
echo $LIB_VERSION > version

# Pushing the build on github
# echo "Creating branch v_$LIB_VERSION"
# git checkout -b v_$LIB_VERSION
git add --all
git commit -am "Building ${LIB_VERSION}"
git push

# Finally go back to original directory
cd $CURRENT_DIRECTORY