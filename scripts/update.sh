#!/bin/bash

# Se déplacer dans le répertoire de l'application
cd ~/apps/Walletaya

# Tirer les dernières modifications depuis GitHub
# git reset --hard origin/main
# git pull origin main

# Installer les dépendances (si nécessaire)
pnpm install

pnpm build

# Relancer l'application
sh ~/apps/tracrypto/scripts/start.sh 