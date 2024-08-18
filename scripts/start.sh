#!/bin/bash

# Nom de l'application dans PM2
APP_NAME="tracrypto"
SERVER_PATH=~/apps/tracrypto/server

# Vérifier si l'application est déjà en cours d'exécution
pm2 describe $APP_NAME > /dev/null 2>&1

cd $SERVER_PATH

if [ $? -eq 0 ]; then
    # Si l'application est en cours d'exécution, la redémarrer
    echo "Redémarrage de l'application $APP_NAME"
    pm2 restart $APP_NAME
else
    # Sinon, démarrer l'application
    echo "Démarrage de l'application $APP_NAME"
    pm2 start pnpm --name $APP_NAME -- run start
fi