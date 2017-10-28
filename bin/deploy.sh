#!/usr/bin/env bash
set -e
MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $MY_DIR
cd ../node/deploy
rm -rf node_modules
npm install > /dev/null 2>&1
. ~/.nvm/nvm.sh > /dev/null 2>&1
nvm use 6 > /dev/null 2>&1
SYNC_DIR="$(./deploy.js)"
echo $SYNC_DIR
