#!/bin/bash
APP="~/apps/tracrypto"
USER=pi
HOST=192.168.1.16

# pnpm build
# Transférer les fichiers
scp -i ~/.ssh/raspberry -r ./dist $USER@$HOST:$APP
scp -i ~/.ssh/raspberry -r ./prod/index.js $USER@$HOST:$APP

# Se connecter au Raspberry Pi et démarrer l'application
ssh -i ~/.ssh/raspberry $USER@$HOST << "ENDSSH"
cd $APP_DIR
npm run start &
ENDSSH