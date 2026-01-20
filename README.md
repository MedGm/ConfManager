# ConfManager - Plateforme de Gestion de Conférences

![ConfManager Logo](/docs/images/logo.png)

## 📌 Présentation

**ConfManager** est une application web complète permettant l'organisation et la gestion de conférences scientifiques et académiques. Le projet a été réalisé par l'**Équipe 7** dans le cadre du module "Logiciels et Systèmes Intelligents" à la FST de Tanger (Université Abdelmalek Essaâdi).

L'objectif principal est de fournir une interface intuitive pour :
*   Les **organisateurs** : Création d'événements, gestion des plannings, suivi des inscriptions.
*   Les **participants** : Inscription aux conférences, consultation du programme, gestion de leurs billets.

---

## 👥 L'Équipe (Team 7)

| Membre | Rôle | Responsabilités |
|:---|:---|:---|
| **Uthman Junaid** | Chef de Projet | Coordination, Scrum Master, Gestion des Risques, Outil Agile |
| **Ahmane Yahya** | Analyste | Cahier des charges, WBS, Cas d'utilisation |
| **Essalhi Salma** | Analyste | Analyse des besoins, Maquettage, Diagrammes |
| **Kamouss Yassine** | Dev Back-End | API, Base de données, Logique d'inscription |
| **El Gorrim Mohamed** | Dev Back-End | Authentification (NextAuth), Services métier |
| **Salhi Mohamed** | Dev Front-End | UI/UX, Intégration React/Tailwind, Dashboard |
| **Kchibal Ismail** | Testeur | Tests Unitaires (Jest), Tests d'Intégration |
| **Mohand Omar Moussa** | Qualité / Doc | Revue de code, Documentation Technique (Report) |

---

## 🛠️ Stack Technique

*   **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
*   **Langage** : TypeScript
*   **Base de données** : SQLite (Dev) / PostgreSQL (Prod) via [Prisma ORM](https://www.prisma.io/)
*   **Authentification** : [NextAuth.js](https://next-auth.js.org/)
*   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
*   **Tests** : Jest & React Testing Library
*   **Animation** : Framer Motion

---

## 🚀 Fonctionnalités Clés

### 1. Gestion des Événements
*    CRUD complet des conférences.
*    Système de dates, lieux et descriptions détaillées.

### 2. Gestion des Inscriptions
*    Flux d'inscription utilisateur sécurisé.
*    Tableau de bord personnalisé pour suivre ses inscriptions.

### 3. Outil de Gestion Agile (Interne)
*    Un module **Kanban Board** intégré directement au Back-Office.
*    Permet de visualiser l'avancement du projet (To Do, In Progress, Done).
*    Accessible via le menu **"Suivi Projet (Agile)"**.

---

## 📦 Installation & Démarrage

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/MedGm/ConfManager.git
    cd ConfManager
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Configurer la base de données**
    ```bash
    npx prisma migrate dev
    npx ts-node prisma/seed.ts  # (Optionnel) Pour créer les utilisateurs Admin/Guest et les tâches Agile
    ```

4.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```

Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 🧪 Tests

Le projet inclut une suite de tests unitaires et d'intégration.
```bash
npm test
```

---
    
## 🔍 Qualité du Code (SonarQube)

Le projet intègre une configuration pour [SonarQube](https://www.sonarqube.org/) afin d'analyser la qualité du code.

### Pré-requis
*   Docker installé.

### Lancer l'analyse localement
1.  Démarrer le serveur SonarQube :
    ```bash
    docker-compose -f docker-compose.sonar.yml up -d
    ```
2.  Accéder à [http://localhost:9000](http://localhost:9000) (Login: `admin` / Password: `admin`).
3.  Créer un projet nommé "ConfManager" et générer un token.
4.  Lancer le scan :
    ```bash
    npm run sonar -- -Dsonar.login=<votre-token>
    ```

---

## 📄 Documentation

Le rapport complet du projet est disponible dans le dossier `docs/` au format LaTeX :
*   `docs/REPORT.tex` : Rapport technique détaillé.
*   `docs/AUDIT_REPORT.md` : Rapport d'audit interne.
*   `docs/GANTT.md`, `docs/WBS.md` : Documents de planification.
