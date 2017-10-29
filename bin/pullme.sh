#!/usr/bin/env bash
set -e
#
# Check and see if I have been updated.
# If not, do nothing. If yes, run my deployment script.
#
# We can run this every minute.
# crontab -e
# * * * * * /home/ubuntu/glo.sh/bin/pullme.sh >/dev/null 2>&1

MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $MY_DIR
cd ..
OUTPUT="$(git pull)"

if [ "$OUTPUT" != "Already up-to-date." ]; then
  $MY_DIR/deploy.sh
fi
