function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    const cityName = `${city}, ${country}`
    const tag = tagline
    const rate = `${price}€/jour`

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const home = document.createElement( 'city' );
        home.textContent = cityName
        const sentence = document.createElement( 'sentence' );
        sentence.textContent = tag
        const hourRate = document.createElement( 'hourRate' );
        hourRate.textContent = rate
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(home)
        article.appendChild(sentence)
        article.appendChild(hourRate)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}