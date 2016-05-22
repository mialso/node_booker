#!/bin/bash

echo $QUERY_STRING > "./user.req"

echo "Content-type: text/html"
echo ""
echo "OK"
