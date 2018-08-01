#!/bin/bash

echo "start installWeb"

cd /data/was/amtinstance/webapps/ROOT/WEB-INF/classes
unzip -o html-amt.zip
chown -R tomcat:tomcat *
#tar xvfz ROOT.war

echo "end installWeb"
