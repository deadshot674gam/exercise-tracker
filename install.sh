#!/bin/bash
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Linux distros found..."
    if which redis-cli > /dev/null; then 
        echo "redis is already installed and running"
    else
        echo "redis-server not installed... installing redis..."
        apt-get -y install redis-server;
        sed -i "s/supervised no/supervised systemd/g" /etc/redis/redis-conf;
        systemctl restart redis-server;
        echo "REDIS SERVICE IS RUNNING ON PORT 6379..."
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "MacOS found..."
    if which redis-cli > /dev/null; then 
        echo "redis is already installed and running"
    else
        echo "redis-server is not installed...  installing redis..."
        brew install redis
        brew services start redis
        echo "REDIS SERVICE IS RUNNING ON PORT 6379..."
    fi
else
    echo "This OSTYPE IS NOT SUPPORTED YET FOR THIS PROJECT";

fi