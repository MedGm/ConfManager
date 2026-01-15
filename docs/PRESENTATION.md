# Présentation Finale - Projet Gestion Conférence

## Slide 1 : Titre & Équipe
- **Projet** : Plateforme de Gestion de Conférences
- **Équipe** : [Noms des membres]
- **Date** : Janvier 2026

## Slide 2 : Contexte & Objectifs
- Gestion d'événements simplifiée (type EasyChair).
- Cibles : Organisateurs, Participants.
- Objectif : Centraliser créations, inscriptions et planning.

## Slide 3 : Gestion de Projet (Méthodologie)
- **Cycle de vie** : Agile Scrum (Sprints de 1 semaine).
- **Outils de collaboration** : GitHub (Versioning), Trello/Jira (Suivi des tâches).
- **Livrables de gestion** :
    - WBS (Structure de découpage) & OBS (Équipe).
    - Diagramme de Gantt (Planification).
    - Matrice des Risques (Analyse préventive).

## Slide 4 : Architecture Technique & Choix
- **Frontend** : Next.js 14 (App Router) - Pour le SSR et la performance SEO.
- **Styling** : Tailwind CSS - Pour un design moderne et responsif ("Deep Indigo Theme").
- **Backend** : API Routes (Serverless functions).
- **Base de données** : SQLite avec Prisma ORM (Typage fort, migrations faciles).
- **Auth** : NextAuth.js (Sécurité robuste, sessions cryptées).

## Slide 5 : Fonctionnalités Réalisées
- **Organisateur** :
    - Dashboard analytique (KPIs).
    - Création & Édition d'événements (Formulaires structurés).
    - Gestion du Planning (Sessions, Speakers).
- **Participant** :
    - Inscripton/Connexion sécurisée.
    - Inscription aux conférences.
    - Vue "Mes Inscriptions".
- **Public** :
    - Catalogue des conférences à venir.

## Slide 6 : Démonstration (Scénario)
1.  **Visiteur** : Arrive sur la Landing Page, consulte le programme.
2.  **Inscription** : Crée un compte "Guest".
3.  **Action** : S'inscrit à une conférence -> Redirection Dashboard.
4.  **Admin** : Se connecte, voit le nouvel inscrit, ajoute une session au planning.
5.  **Vérification** : Le planning est mis à jour en temps réel sur le site public.

## Slide 7 : Bilan & Conclusion
- **Objectifs atteints** : Application fonctionnelle respectant le cahier des charges.
- **Difficultés** : Prise en main de Next.js 14, Gestion des dates/Timezones.
- **Améliorations futures** : Paiements Stripe, Notifications Email, Version Mobile App.

