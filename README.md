# Toeliching opdracht

Om deze app lokaal te testen:

1. Installeer de depencies `npm install`

2. Start de backend `npm run server`

3. Start de frontend `npm run dev`, navigeer naar http://localhost:5173/

4. Test de app `npm run test`

Toelichting opdracht

Omdat de voorbeelddata die gegeven is, data is die je normaliter zou willen ophalen van de server met de laatste beschikbare data, heb ik een simpele server gemaakt met 'express' welke de search query filtering afhandelt. Om het simpel te houden heb ik dit dezelfde repo gedaan als de frontend.

De frontend is gemaakt met React en Vite. Bij het typen in het input veld begint de app direct met zoeken er zit een simpele debounce van 300ms, idealiter zouden vorige request afgebroken worden zodat er geen race conditions ontstaan, dit is iets wat boven aan mijn TODO lijst staat. Ik heb gebruik gemaakt van tanstack/react-query zodat caching en alle states met betrekking tot het fetchen afgehandeld worden door deze library.

Voor de styling heb ik tailwind gebruikt waar ik de geleverde kleuren heb geintegreerd.

Voor testen heb ik wat simpele test toegevoegd die een simpele happy en sad flows testen, deze zouden nog wat kunnen worden uitgebreid.

Er staan nog wat Todo's door de app heen die voornamelijk zijn voor intenties die ik had om te doen maar niet al te veel afgeleid wilde worden met side-quest.
