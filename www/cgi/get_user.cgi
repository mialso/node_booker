#!/bin/bash

echo "Content-type: text/html"
echo ""

declare result
declare user_name
data_path='../../data/users/'

# get user name from request
user_name=$QUERY_STRING
# read user data to variable
result=$(cat "$data_path$user_name")
if [ "$?" -eq "0" ]; then
    echo "$result"
else
    echo ""
fi

exit 0
