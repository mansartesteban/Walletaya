# Utiliser nodejs v16
FROM node:16

# Installer pnpm
RUN npm install -g pnpm

# Créer un dossier temporaire pour la mise en place
WORKDIR /setup

# Copier le fichier package du front et installer les dépendances
COPY package*.json ./
RUN rm -rf node_modules
RUN pnpm install

# Copier le reste des fichiers depuis la machine vers l'image docker
COPY . .

# Build l'image du front
RUN pnpm build
RUN rm package.json
RUN rm package-lock.yaml
RUN rm package-lock.json
RUN rm -rf node_modules

# Se déplacer dans le dossier du server et installer les dépendances
RUN cd server
RUN npm install

# Créer un dossier de livraison finale et copie le front et le server
WORKDIR /serve
RUN cp /setup/dist ./
RUN cp /setup/server ./

# Nettoyer l'image pour l'alléger
RUN rm -rf /setup

# Exposer les ports 6000, et 6001
EXPOSE 6000
EXPOSE 6001

# Servir l'application
CMD ["npm", "start"]