#!/bin/bash
# ref https://stackoverflow.com/questions/21395159/shell-script-to-create-a-static-html-directory-listing


# ref for redirect: https://stackoverflow.com/questions/637827/redirect-stderr-and-stdout-in-bash
# Close STDOUT file descriptor
exec 1<&-
# Open STDOUT as $LOG_FILE file for read and write.
exec 1<>index.html

root="."
echo "<html><body><ul>"
for file in "$root"/*/*; do
  parentpath="${file#*/}"
  parent="${parentpath%/*}"
  filename="${file##*/}"
  if [[ -z $oldparent ]]; then
    echo "  <li> $parent </li>" && oldparent="$parent"
    echo "  <ul>"
  elif [[ $oldparent != $parent ]]; then
    echo "  </ul>"
    echo "  <li> $parent </li>" && oldparent="$parent"
    echo "  <ul>"
  fi
  echo "    <li><a href=\"$parentpath\">$filename</a></li>"
done
echo "  </ul>"
echo "</ul></body></html>"
