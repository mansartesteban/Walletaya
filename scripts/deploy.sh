#!/bin/bash
APP_NAME="walletaya"

# Construire l'image Docker à distance
docker build -t $APP_NAME .

docker stop $APP_NAME
docker rm $APP_NAME

# Exécuter le conteneur sur l'hôte
docker run -p 6000:6000 -p 6001:6001 --name $APP_NAME $APP_NAME 
