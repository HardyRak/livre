const form = document.getElementById('ajoutLivre');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const pages = parseInt(document.getElementById('pages').value);
    const dateSortie = document.getElementById('dateSortie').value;
    const imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageBase64 = e.target.result;
            const data = {
                titre: titre,
                auteur: auteur,
                pages: pages,
                dateSortie: dateSortie,
                image: imageBase64
            };
            fetch('../api/livre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (responseData) {
                    alert('Ajout avec succès');
                    localStorage.setItem("currentPage", responseData.totalPage);
                    localStorage.setItem("currentOrderType",'1');
                    localStorage.setItem("currentOrder",'id');
                    window.location.href = "../index.html";
                })
                .catch(function (error) {
                    console.error('Erreur:', error);
                });
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert("Veuillez sélectionner une image.");
    }
});
