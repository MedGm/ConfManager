# Rapport d'Audit de Projet: Plateforme de Gestion de Conférences

**Auditeur:** Senior Lead Auditor / Professeur CS
**Date:** 15 Janvier 2026
**Projet:** Plateforme de Gestion d’Événements et Conférences
**Équipe:** Team 7

---

## 1. Executive Summary

Le projet présente une base solide avec une architecture technique moderne (Next.js 14, Prisma, PostgreSQL/SQLite) et une bonne structure documentaire. Les fonctionnalités minimales requises (Auth, Events, Dashboard) sont implémentées et fonctionnelles.

Cependant, le projet souffre de **deux lacunes critiques** qui empêchent une validation totale :
1.  **Absence totale de tests automatisés** (Unitaires & Intégration), contrairement à ce qui est affirmé dans le rapport.
2.  **Manque de preuves tangibles** pour la méthodologie Agile et les assets visuels (Screenshots, Diagrammes originaux manquants dans le dossier source).

---

## 2. Matrice de Conformité (Compliance Matrix)

| Requirement | Status | Evidence / Notes |
|:---|:---:|:---|
| **1. Fonctionnalités Minimales** | | |
| Création de compte (Org/Part) | **COMPLIANT** | Implémenté via NextAuth (Credentials + Bcrypt). `src/lib/auth.ts` |
| Création d'événement | **COMPLIANT** | Formulaire complet dans `src/components/events/CreateEventForm.tsx`. |
| Système d'inscriptions | **COMPLIANT** | Logique backend présente et `RegisterButton.tsx`. |
| Tableau de bord (Dashboard) | **COMPLIANT** | `src/app/dashboard/page.tsx` différencie bien Organisateur/Participant. |
| Génération Planning | **PARTIAL** | Création manuelle de sessions supportée (`CreateSessionForm.tsx`). Pas de génération "automatique" (algo) trouvée, mais le manuel est accepté. |
| Page publique Programme | **COMPLIANT** | `src/app/page.tsx` affiche les événements et détails. |
| **2. Project Management** | | |
| Cahier des charges | **COMPLIANT** | Intégré dans `docs/REPORT.tex`. |
| WBS + OBS | **COMPLIANT** | Documents présents dans `docs/WBS.md` et `docs/OBS.md`. Bien structurés. |
| Diagramme de Gantt | **COMPLIANT** | `docs/GANTT.md` (Format Mermaid). |
| Analyse des Risques | **COMPLIANT** | `docs/RISKS.md` contient la matrice Probabilité x Impact. |
| Budget & Estimation | **COMPLIANT** | `docs/BUDGET.md` utilise la méthode COCOMO Simplifié. |
| Revues Hebdomadaires | **PARTIAL** | Mentionnées textuellement dans le rapport, mais pas de PV de réunion ou traces (commits datés/logs). |
| **3. Software Engineering** | | |
| Cycle de vie Agile Scrum | **PARTIAL** | Affirmé dans le rapport, mais aucune preuve d'artefacts (Backlog Jira/Trello, Burndown charts). |
| Modélisation (Use Case / Class) | **COMPLIANT** | Fichiers Mermaid présents (`docs/CLASSES.md`, `docs/USE_CASES.md`). |
| Prototype (Figma) | **MISSING** | Aucune image ou lien Figma fonctionnel trouvé. Dossier `docs/images` vide d'assets. |
| Développement (Front/Back) | **COMPLIANT** | Codebase complète (Next.js, API Routes, Prisma). |
| Tests (Unitaires + Intégration) | **MISSING** | **Critique.** Aucun fichier de test (`*.test.ts`, `*.spec.ts`) trouvé. `package.json` ne contient que `eslint`. |
| Dossier Technique Complet | **PARTIAL** | `REPORT.tex` est un excellent squelette, mais les images sont des placeholders. |
| **4. Team & Tools** | | |
| Rôles (Chef, Analyste, Dev...) | **COMPLIANT** | Définis clairement dans `docs/OBS.md` et Rapport. |
| Outils (Jira/Trello...) | **MISSING** | Pas de preuve d'utilisation (screenshots ou exports). |

---

## 3. Gap Analysis (Analyse des Écarts)

### 🔴 Critique (Bloquant pour la validation)
1.  **Tests Manquants** : Le rapport mentionne "Les tests ont couvert : Tests Unitaires... Tests d'Intégration", mais le code source ne contient **aucun test**. C'est une divergence majeure entre le rapport et le livrable.
    *   *Action requise* : Installer Jest/Vitest et écrire au moins 2-3 tests unitaires (ex: validation dates événement) et 1 test d'intégration (API register).
2.  **Assets Manquants** : Le fichier LaTeX `docs/REPORT.tex` appelle des images (`images/logo.png`, `images/gantt_chart.png`, `images/screenshot_dashboard.png`) qui **n'existent pas** dans le dossier `docs/images`.
    *   *Action requise* : Générer les images (export Mermaid, screenshots de l'app) et les placer dans `docs/images`.

### 🟡 Majeur (À améliorer pour une bonne note)
1.  **Preuves Agile Faibles** : On ne voit pas la "vie" du projet. Il manque des captures d'écran du Board Trello/Jira ou des extraits de compte-rendu de sprint.
2.  **Planning "Automatique"** : L'objectif mentionnait "Génération automatique", mais seule la création manuelle est là. C'est acceptable pour un MVP mais c'est un écart par rapport à l'idéal.

---

## 4. Recommandations pour le Rapport Final

Votre fichier `docs/REPORT.tex` est une excellente base. Voici comment l'améliorer pour la soumission finale :

1.  **Insérer les Diagrammes** :
    *   Convertissez les fichiers Mermaid (`GANTT.md`, `WBS.md`, `CLASSES.md`) en images PNG.
    *   Insérez-les dans les sections correspondantes du LaTeX.
2.  **Section "Preuves de Gestion"** :
    *   Ajoutez une sous-section dans le chapitre "Pilotage" avec une capture d'écran de votre outil de gestion (simulé si nécessaire).
3.  **Honnêteté sur les Tests** :
    *   Si vous n'avez pas le temps d'écrire les tests, **modifiez le rapport** pour dire "Les tests n'ont pas pu être finalisés faute de temps" plutôt que de prétendre qu'ils existent (ce qui est pénalisant lors d'un audit).
4.  **Structure Suggérée** :
    *   Gardez la structure actuelle, elle est conforme au standard académique.

---

## 5. Vérification des Rôles

*   **QA (Mohand Omar Moussa)** : Le rôle est défini, mais l'absence de tests pose question sur l'exécution ce rôle. Il faudrait ajouter un "Plan de Test" (même fichier texte) pour prouver l'activité.
*   **Analyste (Ahmane/Essalhi)** : Le travail est visible via les diagrammes (Use Cases, WBS) qui sont bien faits.
*   **Chef de Projet (Uthman Junaid)** : La documentation de gestion (Risques, Budget) prouve l'activité.

---

**Note Globale Estimée en l'état : 65/100**
*(-20 pts pour absence de tests, -15 pts pour images manquantes/preuves)*
**Potentiel après correction : 90+/100**
