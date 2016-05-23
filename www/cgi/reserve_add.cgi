#!/bin/bash

read -n $CONTENT_LENGTH QUERY_STRING_POST
#request=$(echo "$QUERY_STRING_POST" | sed 's/[^a-z0-9|;]//g')

reqAr=(${QUERY_STRING_POST//|/ })

echo ${reqAr[1]} > "../../data/reserves/${reqAr[0]}"

echo "Content-type: text/html"
echo ""
echo "OK"
