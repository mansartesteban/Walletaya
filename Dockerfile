# Utiliser une image de base officielle
FROM node:18

RUN npm install -g pnpm

# Créer un répertoire de travail
WORKDIR /app
# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN pnpm install

# Copier le reste de l'application
COPY . .

RUN pnpm build

RUN rm package.*

COPY server/* .

# Exposer le port utilisé par l'application
EXPOSE 6000
EXPOSE 6001

# Se déplacer dans le dossier du serveur
RUN ls

# Commande pour démarrer l'application
CMD ["npm", "start"]