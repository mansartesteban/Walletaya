#!/bin/bash

# Variables
USER=pi
HOST=192.168.1.16
APP_DIR=/var/www/tracrypto
LOCAL_BUILD_DIR=F:/dev/tracrypto/dist

# Transférer les fichiers
scp -r $LOCAL_BUILD_DIR $USER@$HOST:$APP_DIR

# Se connecter au Raspberry Pi et démarrer l'application
ssh $USER@$HOST 
cd $APP_DIR
ls
