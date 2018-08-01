#!/bin/bash

echo "start installWeb"

cd /data/was/amtinstance/webapps
mv amt-app-1.0-SNAPSHOT.war ROOT.war
#tar xvfz ROOT.war

echo "end installWeb"
