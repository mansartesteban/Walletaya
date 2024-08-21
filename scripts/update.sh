#!/bin/bash

# Se déplacer dans le répertoire de l'application
cd ~/apps/Walletaya

# Tirer les dernières modifications depuis GitHub

# Installer les dépendances (si nécessaire)
pnpm install

pnpm build

# Relancer l'application
sh ~/apps/tracrypto/scripts/start.sh 