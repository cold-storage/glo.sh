#!/usr/bin/env bash
set -e
MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $MY_DIR
echo "MY DIR: $MY_DIR"
cd ../node/deploy
rm -rf node_modules
npm install
. ~/.nvm/nvm.sh
nvm use 6
echo "Here are the results $(./deploy.js)"
