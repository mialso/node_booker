#!/bin/bash

echo "Content-type: text/html"
echo ""
echo $(cat ../data/nodes.db)

exit 0
