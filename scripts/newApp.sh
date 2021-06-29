#! /usr/bin/env bash

echo -n '应用名称:'
read appName
echo -n '应用代码(推荐使用下划线代替空格):'
read appLink
echo -n '应用图标:'
read appIcon
echo -n '应用介绍:'
read appDescrip
echo -n "应用分类1：人工智能；2：图片视频；3：编程开发；4：生活常用"
read appChannel
re='^[0-9]+$'
if ! [[ $appChannel =~ $re ]] ; then
   echo "error: Channel must be a Number" >&2; exit 1
fi

DATA_PATH="$PWD/src/data/appData.ts"
DATA=$(<$DATA_PATH)
APP_PATH="$PWD/src/apps/$appLink"

# Write app meta info
JSON_FMT="{\"name\":\"$appName\",\"channel\": $appChannel, \"icon\":\"$appIcon\",\"link\":\"$appLink\",\"description\":\"$appDescrip\"}"
printf "export default [$JSON_FMT,${DATA:16}" >$DATA_PATH

if [ ! -d $APP_PATH ]; then
    mkdir -p "$APP_PATH"
    touch "$APP_PATH/README.md"
    touch "$APP_PATH/index.ts"
    printf "import * as React from 'react';\n\nconst App = () =>{ \n   return null\n}\n\nexport default App" >"$APP_PATH/index.ts"
fi

GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "Now you can dev new app at ${GREEN}'/src/apps/$appLink'${NC}. It is recommended to edit the README.md which can help user have better known to this app"

exit 0
