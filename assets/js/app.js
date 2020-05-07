//variables
const listaTweets = document.getElementById('lista-tweets');


//event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el form
    document.querySelector('#formulario').addEventListener('submit',
        agregarTweet);

    //borrar tweets
    listaTweets.addEventListener('click', borrarTweets);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//functions

function agregarTweet(e) {
    e.preventDefault();
    //leer valor textarea
    const tweet = document.getElementById('tweet').value;
    //crear btn eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // crear elemento y añadir elemento a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el btn de borrar
    li.appendChild(botonBorrar);
    //añade a la lista
    listaTweets.appendChild(li);

    //añadir al local storage
    agregarTweetLocalStorage(tweet);

}

// elimina el tweet del dom
function borrarTweets(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}
// agrega tweet al local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// comprobar el localstorage
function obtenerTweetLocalStorage() {
    let tweets;
    //revisando localstorage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets', tweet));
    }
    return tweets;
}

function localStorageListo() {
    let tweets;
    tweets = obtenerTweetLocalStorage();
    console.log(tweets);
    tweets.forEach(function(tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // crear elemento y añadir elemento a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el btn de borrar
        li.appendChild(botonBorrar);
        //añade a la lista
        listaTweets.appendChild(li);
    });
}

// eliminar del local storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetLocalStorage();
    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}