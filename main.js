function getRandomNum(num) {
  return Math.floor(Math.random() * num);
}

// let mainPoke = document.querySelector("#mainPoke");
// let similarPokes = document.querySelector("#similarPokes");
// let pic = document.createElement("img");
// let typeNum = 1;

const displayPokemons = async () => {
  try {
    let num = Math.floor(Math.random() * 897) + 1;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${num}`
    );
    let typeUrl = response.data.types[0].type.url;
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${num}.png`;
    let mainPoke = document.querySelector("#mainPoke");
    let pic = document.createElement("img");
    pic.src = imageUrl;
    pic.alt = response.data.species.name;
    if (mainPoke.firstChild) {
      mainPoke.removeChild(mainPoke.firstChild);
    }
    mainPoke.appendChild(pic);
    displayOtherPokes(response, typeUrl);
  } catch (e) {
    console.log(e);
  }
};

const displayOtherPokes = async (response, typeUrl) => {
  let similarPokes = document.querySelector("#similarPokes");
  while (similarPokes.firstChild) {
    similarPokes.removeChild(similarPokes.firstChild);
  }
  const similarResponse = await axios.get(typeUrl);
  const similarPokemons = similarResponse.data.pokemon;
  const typeLength = similarPokemons.length;
  console.log(typeLength);
  for (let i = 0; i < 5; i++) {
    let simNum = getRandomNum(typeLength);
    if (similarPokemons[simNum].pokemon.name !== response.data.species.name) {
      console.log(similarPokes.children.length);
      let similarPokeUrl = similarPokemons[simNum].pokemon.url;
      let pokeNum = similarPokeUrl.split("/")[6] % 898;
      let pic = document.createElement("img");
      pic.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeNum}.png`;
      pic.alt = similarPokemons[simNum].pokemon.name;
      let myDiv = document.createElement("div");
      myDiv.appendChild(pic);
      similarPokes.appendChild(myDiv);
    }
  }
};
