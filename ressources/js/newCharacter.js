document.querySelector("input[type=file]").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file)
});

image.onchange = () => {
    const [file] = image.files
    if (file) {
        blah.src = URL.createObjectURL(file)
    }
}
document.querySelector('#submit').addEventListener("click", (event) => {
    event.preventDefault();
    const input = Array.from(document.querySelectorAll("input[type=text], textarea"));
    const values = input.map(({ value }) => value.trim());
    const [name, shortDescription, description] = values;
    if(name.length == 0 || shortDescription.length == 0 || description.length == 0 || document.querySelector("input[type=file]").files.length == 0){
        alert('Something is empty')
    }else{
        const dataContainer = fetch('https://character-database.becode.xyz/characters', {
            method: "POST",
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
        alert('Character added !')
    }

    
});

    
