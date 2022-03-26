let current = window.location.href;
let splittedCurrent = current.split(`?`);
let idSplit = splittedCurrent[1];
fetch(`https://character-database.becode.xyz/characters/${idSplit}`)
.then(response => response.json())
.then(data => {
    image = data.image
    document.querySelector('img').src = `data:image/png;base64,${data.image}`;
    document.querySelector('input#name').value = data.name;
    document.querySelector('input#shortdescription').value = data.shortDescription;
    document.querySelector('textarea#description').value = data.description;
})

document.querySelector("input[type=file]").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file)
});

image.onchange = evt => {
    var [file] = image.files
    if (file) {
        blah.src = URL.createObjectURL(file)
    }
}
document.querySelector('#submit').addEventListener("click", async (event) => {
    event.preventDefault();
    const input = Array.from(document.querySelectorAll("input[type=text], textarea"));
    const values = input.map(({ value }) => value.trim());
    const [name, shortDescription, description] = values;
    if(name.length == 0 || shortDescription.length == 0 || description.length == 0){
        alert('Something is empty')
    }else{

        const response = await fetch(`https://character-database.becode.xyz/characters/${idSplit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image,
                name,
                shortDescription,
                description,
            }),
        });

        window.location.href = "index.html"
        alert('Character Update !')
    }

});