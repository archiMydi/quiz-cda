# Quiz CDA

Bienvenue dans le projet **Quiz CDA** ! Ce projet est une application web interactive permettant aux utilisateurs de tester leurs connaissances à travers des quiz personnalisés.

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

---

## Aperçu

L'application **Quiz CDA** permet aux utilisateurs de :

- Configurer un quiz en choisissant une catégorie, un type de questions et le nombre de questions.
- Répondre à des questions à choix multiples ou vrai/faux.
- Voir leurs résultats à la fin du quiz.

## Fonctionnalités

- **Page d'accueil** : Présentation de l'application et bouton pour démarrer.
- **Configuration du quiz** : Formulaire pour personnaliser le quiz.
- **Quiz interactif** : Affichage des questions avec des réponses aléatoires.
- **Résultats** : Résumé des performances de l'utilisateur.
- **Responsive Design** : Compatible avec les appareils mobiles et desktop.

## Technologies utilisées

- **Framework** : [Angular](https://angular.io/) (v19.2.0)
- **Langage** : TypeScript
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Backend** : [Express](https://expressjs.com/) pour le rendu côté serveur (SSR)
- **API** : Utilisation d'une API externe pour récupérer les questions du quiz.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/archiMydi/quiz-cda.git
   cd quiz-cda
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez l'application :

   ```bash
   npm start
   ```

4. Accédez à l'application dans votre navigateur à l'adresse : [http://localhost:4200](http://localhost:4200)

## Utilisation

1. Accédez à la page d'accueil et cliquez sur **Commencer à jouer**.
2. Configurez votre quiz en remplissant le formulaire (nom, prénom, catégorie, etc.).
3. Répondez aux questions du quiz.
4. Consultez vos résultats à la fin.

## Scripts disponibles

- `npm start` : Démarre le serveur de développement Angular.
- `npm run build` : Compile le projet pour la production.
- `npm run ssr` : Lance le rendu côté serveur (SSR) avec Express.

## Structure du projet

```
quiz-cda/
├── src/
│   ├── app/
│   │   ├── components/           # Composants Angular (Home, Quiz, Configuration, etc.)
│   │   ├── services/             # Services Angular pour les appels API
│   │   ├── app-routing.module.ts # Configuration des routes
│   │   ├── app.component.ts      # Composant principal
│   │   ├── app.config.ts         # Configuration de l'application
│   │   ├── app.config.server.ts  # Configuration pour le SSR
│   └── styles.scss               # Styles globaux
├── angular.json                 # Configuration Angular CLI
├── package.json                 # Dépendances et scripts
├── tsconfig.json                # Configuration TypeScript
├── .vscode/                     # Configuration pour Visual Studio Code
└── README.md                    # Documentation du projet
```

## Contributeurs

- **Archi**  
  GitHub : [@archiMydi](https://github.com/archiMydi)

## Licence

Ce projet est sous licence **MIT**.
