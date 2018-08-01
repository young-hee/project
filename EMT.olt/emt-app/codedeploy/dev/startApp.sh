#!/bin/bash

echo "startApp"
rm -rf /data/was/emtinstance/webapps/ROOT
# setenv.sh 에 -Dspring.profiles.active=dev 설정
sudo -u tomcat /data/was/emtinstance/bin/startup.sh
