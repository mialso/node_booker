#!/bin/bash

data_dir="../../design/app.dsg"
echo "Content-type: text/html"
echo ""

echo "$(cat $data_dir)"

exit 0
