let Character = document.querySelector('.character')
let Clone = document.querySelector('template');
let searchBar = document.querySelector('.top__input')

const searchBarFuc = (x) => {
    Character.innerHTML = "";
    x.forEach(element => {
        let Node = document.importNode(Clone.content, true);
        Node.querySelector('img').src = `data:image/gif;base64,${element.image}`;
        Node.querySelector('h2').innerText = `${element.name}`;
        Node.querySelector('p').innerHTML = `${element.description}`;
        Node.querySelector('a').href = `single.html?${element.id}`;
        Node.querySelector('a').innerText = `See the Character`;
        Character.appendChild(Node)
    })
}
fetch('https://character-database.becode.xyz/characters')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        searchBarFuc(data)
        searchBar.addEventListener('keyup', (e) => {
            if (searchBar.value.length == 0) {
                searchBarFuc(data)
            } else {
                const searchString = e.target.value;
                const filteredCharacters = data.filter((Person) => {
                    return (
                        Person.name.includes(searchString)
                    );
                });
                searchBarFuc(filteredCharacters)
            }

        })
    })
