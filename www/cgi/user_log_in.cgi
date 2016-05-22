#!/bin/bash

# only lower case letters allowed
read -n $CONTENT_LENGTH QUERY_STRING_POST
request=$(echo "$QUERY_STRING_POST" | sed 's/[^a-z]//g')

echo "Content-type: text/html"
echo ""
echo "OK"
echo ";"
echo $request
