#!/bin/bash

# Nom de l'application dans PM2
APP_NAME="tracrypto"

# Vérifier si l'application est déjà en cours d'exécution
pm2 describe $APP_NAME > /dev/null 2>&1

if [ $? -eq 0 ]; then
    # Si l'application est en cours d'exécution, la redémarrer
    echo "Redémarrage de l'application $APP_NAME"
    pm2 restart $APP_NAME
else
    # Sinon, démarrer l'application
    echo "Démarrage de l'application $APP_NAME"
    pm2 start /home/pi/apps/tracrypto/server/index.js --name $APP_NAME
fi