# Utiliser une image de base officielle
FROM node:18

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN pnpm install

# Copier le reste de l'application
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 6000
EXPOSE 6001

# Se déplacer dans le dossier du serveur
RUN cd server

# Commande pour démarrer l'application
CMD ["pnpm", "start"]