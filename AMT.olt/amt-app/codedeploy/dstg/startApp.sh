#!/bin/bash

echo "startApp"
rm -rf /data/was-app/amt/ROOT
sudo -u tomcat /data/was/amtinstance/bin/startup.sh
