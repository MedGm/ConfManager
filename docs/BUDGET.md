# Budget & Estimation des Charges

## Méthodologie : COCOMO Simplifié (Constructive Cost Model)

### 1. Estimation de la taille du projet
Basé sur les fonctionnalités (Auth, CRUD Event, Dashboard, Planning), nous estimons le projet à environ **2,000 lignes de code (KLOC = 2)**.

### 2. Formule de l'effort
Le projet est de type "Organique" (petite équipe, environnement familier).
`Effort (E) = a * (KLOC) ^ b`
- a = 2.4
- b = 1.05

`E = 2.4 * (2) ^ 1.05 ≈ 5 mois-homme` 
*(Note: Cette valeur est théorique pour un projet industriel. En mode projet étudiant accéléré, l'effort est compressé).*

### 3. Coût Théorique
Si nous étions une agence junior :
- Taux journalier moyen (TJM) : **300€**
- Durée réelle : 4 semaines x 8 personnes (temps partiel étudiant) ≈ **32 jours-homme effectifs**.

**Budget total estimé = 32 * 300€ = 9,600 €**

## Répartition Budgétaire (Fictive)
- **Ressources Humaines** : 8,400 €
- **Infrastructure (Hébergement Vercel/Render)** : 0 € (Tier gratuit)
- **Outils (Jira, GitHub)** : 0 € (Licences étudiantes/gratuites)

**Total : 9,600 €**
