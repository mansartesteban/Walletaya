#!/bin/bash

# Se déplacer dans le répertoire de l'application
cd ~/apps/tracrypto

# Tirer les dernières modifications depuis GitHub
git reset --hard origin/main
git pull origin main

# Installer les dépendances (si nécessaire)
pnpm install

pnpm run build

# Relancer l'application
sh ./start.sh 