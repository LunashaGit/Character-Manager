let subString = location.search.substring(1);
fetch('https://character-database.becode.xyz/characters')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            if (subString === element.id) {
                document.getElementById("submit").addEventListener('click', async () => {
                    window.location.href = `update.html?${element.id}`
                });
                document.querySelector("img").src = `data:image/png;base64, ${element.image}`;
                document.querySelector("img").alt = `picture of ${element.name}`;
                document.querySelector('h2').innerText = element.name;
                document.querySelector('h5').innerText = element.shortDescription;
                document.querySelector('p').innerHTML = element.description;
            }
        });
        document.getElementById("delete").addEventListener("click", () => {
            if (confirm('Are you sure ?')) {
                fetch(`https://character-database.becode.xyz/characters/${subString}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                alert("Delete")
                window.location.href = "index.html"
            }

        });
    })