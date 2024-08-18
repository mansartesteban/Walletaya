#!/bin/bash

# Se déplacer dans le répertoire de l'application
cd ~/apps/tracrypto

# Tirer les dernières modifications depuis GitHub
git pull origin main

# Installer les dépendances (si nécessaire)
npm install --production

npm run build

# Relancer l'application
sh ./start.sh 