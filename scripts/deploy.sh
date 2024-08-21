#!/bin/bash
APP_NAME="walletaya"

# Construire l'image Docker à distance
docker build -t $APP_NAME .

docker stop $APP_NAME

# Exécuter le conteneur sur l'hôte
docker run -it -d -p 6000:6000 --rm $APP_NAME 
