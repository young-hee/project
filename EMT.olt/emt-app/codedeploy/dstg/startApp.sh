#!/bin/bash

echo "startApp"
rm -rf /data/was-app/emt/ROOT
sudo -u tomcat /data/was/emtinstance/bin/startup.sh
