#!/bin/bash

echo "Content-type: text/html"
echo ""

declare result
data_path='../../data/reserves/'
split="|"

# read all data to variable, and split each node
for reserve in $(ls "$data_path");do

    # read reserve data
    data=$(cat "$data_path$reserve")

    # append node data + splitter to result
    result="$result$reserve;$data$split"
done

# remove last 'split' to avoid empty object
echo ${result:0: -1}

exit 0
