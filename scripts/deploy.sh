#!/bin/bash

HOST="pitaya@192.168.1.19"
APP_NAME="walletaya"
APP_DIR="~/pitayahub/$APP_NAME/repo" 

# Construire l'image Docker à distance
ssh $HOST "cd $APP_DIR && docker build -t $APP_NAME ."

# Exécuter le conteneur sur l'hôte
ssh $HOST "docker run -d -p 3000:3000 $APP_NAME"
