#!/bin/bash

# Se déplacer dans le répertoire de l'application
cd /var/www/bunkapp/Walletaya/repo

# Tirer les dernières modifications depuis GitHub

# Installer les dépendances (si nécessaire)
pnpm install

pnpm build

# Relancer l'application
sh ./scripts/start.sh 