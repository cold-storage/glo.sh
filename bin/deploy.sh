#!/usr/bin/env bash

cd ../node/deploy
rm -rf node_modules
npm install
./deploy.js
