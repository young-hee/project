#!/bin/bash

echo "startApp"
rm -rf /data/was/amtinstance/webapps/ROOT
# setenv.sh 에 -Dspring.profiles.active=dev 설정
sudo -u tomcat /data/was/amtinstance/bin/startup.sh
