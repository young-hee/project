#!/bin/bash

echo "start installWeb"

cd /data/was/emtinstance/webapps
mv emt-app-1.0-SNAPSHOT.war ROOT.war
#tar xvfz ROOT.war

echo "end installWeb"
