#! /usr/bin/env bash

#echo -n '应用名称:'
#read appName
#echo -n '应用代码:'
#read appLink

while read -r line; do
    echo $line
done <"$PWD/src/utils/applist.ts"

echo "----New App----"
echo "----Name:${appName}----"
echo "----Link:${appLink}----"
echo "Done."

exit 0
