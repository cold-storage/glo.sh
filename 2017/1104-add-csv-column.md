# Add Fixed Value Column to CSV File

```shell
#!/usr/bin/env bash

if [ $# -lt 2 ]; then
  me="$(basename "$(test -L "$0" && readlink "$0" || echo "$0")")"
  echo ""
  echo "Usage: $me HEADER VALUE"
  echo ""
  echo "  We read from STDIN and write to STDOUT."
  echo ""
  exit 1
fi

cat /dev/stdin | sed "1 s/$/,$1/" | sed "1 ! s/$/,$2/"
```
