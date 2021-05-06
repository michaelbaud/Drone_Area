### Visitez le site : https://mika-drone-area.netlify.app/

Première approche pour vérifier si un drone se situe dans une zone interdite au vol.

On pourrait imaginer :
    * récupérer les coodonnées de toutes les zones interdites au vol depuis une base de données.
    * récuperer les cordonnées d'un drone à interval régulier.
    * envoyer une alerte en requêtant un microservice lorsque le drone entre dans une zone interdite au vol.