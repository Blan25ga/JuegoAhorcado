let words: string[] = [  // TODO: palabras a adivinar
    "COMPUTADORA",
    "MANZANA",
    "CELULAR",
    "MESA",
    "DEPARTAMENTO",
    "SUECIA",
    "METAMORFOSIS",
    "ELEFANTE",
    "CAMION",
    "KAKAROTO"

];

// creacion de palabra random

export function getRandomWord(){

  const randomIndex = Math.floor(Math.random() * words.length); // numero random entre 0 y el numero de palabras
return words[randomIndex]; // devuelve la palabra random
}
