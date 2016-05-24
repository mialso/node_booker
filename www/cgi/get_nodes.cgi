#!/bin/bash

echo "Content-type: text/html"
#echo ""

declare result
data_path='../../data/nodes/'
split="|"

# read all data to variable, and split each node
for node in $(ls "$data_path");do

    # read node data
    data=$(cat "$data_path$node")

    # append node data + splitter to result
    result="$result$data$split"
done

# remove last 'split' to avoid empty object
if [ -n $result ];then echo ${result:0: -1};fi

exit 0
