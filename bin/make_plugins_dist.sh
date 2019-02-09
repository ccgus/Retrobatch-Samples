#!/bin/bash

SRC_DIR=`cd ${0%/*}/..; pwd`

cd $SRC_DIR/plugin/
mkdir -p $SRC_DIR/plugin/dist/

for i in *.retrobatchplugin; do
    echo $i
    ditto -c -k --sequesterRsrc --keepParent "$i" dist/"$i.zip"
done




