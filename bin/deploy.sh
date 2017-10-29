#!/usr/bin/env bash
set -e
MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
cd $MY_DIR
cd ../node/deploy
rm -rf node_modules
. ~/.nvm/nvm.sh > /dev/null 2>&1
npm install > /dev/null 2>&1
nvm use 6 > /dev/null 2>&1
SYNC_DIR="$(./deploy.js)"
rm -rf node_modules
aws s3 sync --exclude 'jscss/*' --delete --content-type text/html $SYNC_DIR s3://glo.sh/$GIT_BRANCH
aws s3 sync --include 'jscss/*' $SYNC_DIR s3://glo.sh/$GIT_BRANCH
aws cloudfront create-invalidation \
  --distribution-id E29S1AZ8HEMEO5 \
  --paths '/*'
