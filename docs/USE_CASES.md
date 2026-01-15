# Diagramme des Cas d'Utilisation (Use Cases)

```mermaid
usecaseDiagram
    actor Participant
    actor Organisateur
    actor Visiteur

    package "Système de Gestion Conférence" {
        usecase "S'inscrire / Se connecter" as UC1
        usecase "Consulter les événements" as UC2
        usecase "Voir le planning" as UC3
        usecase "S'inscrire à un événement" as UC4
        usecase "Créer un événement" as UC5
        usecase "Gérer le planning" as UC6
        usecase "Valider inscriptions" as UC7
        usecase "Voir tableau de bord" as UC8
    }

    Visiteur --> UC1
    Visiteur --> UC2
    Visiteur --> UC3

    Participant --> UC1
    Participant --> UC2
    Participant --> UC3
    Participant --> UC4
    Participant --> UC8

    Organisateur --> UC1
    Organisateur --> UC5
    Organisateur --> UC6
    Organisateur --> UC7
    Organisateur --> UC8
```
