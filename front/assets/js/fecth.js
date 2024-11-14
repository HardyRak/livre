function createTableRow(livre) {
  const tr = document.createElement('tr');

  const icon = createTableCellWithImage(livre.image);
  tr.appendChild(icon);
  
  const titre = createTableCell(livre.titre);
  tr.appendChild(titre);

  const pages = createTableCell(livre.pages);
  tr.appendChild(pages);

  const detailsCell = createDetailsCell(livre);
  tr.appendChild(detailsCell);

  const deleteCell = createDeleteCell(livre);
  tr.appendChild(deleteCell);

  return tr;
}

function createTableCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}

function createTableCellWithImage(base64Image) {
  const cell = document.createElement('td');
  if (base64Image) {
    const img = document.createElement('img');
    img.src = base64Image;
    img.alt = "Image du livre";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "50px";
    cell.appendChild(img);
  }
  return cell;
}

function createDetailsCell(livre) {
  const detailsCell = document.createElement('td');
  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Détails';

  detailsButton.onclick = function () {
    showDetails(livre._id);
  };

  detailsCell.appendChild(detailsButton);
  return detailsCell;
}

function createDeleteCell(livre) {
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.style.backgroundColor = '#F38071';
  deleteButton.textContent = 'Supprimer';

  deleteButton.onclick = function () {
    deleteLivre(livre);
  };

  deleteCell.appendChild(deleteButton);
  return deleteCell;
}

function showDetails(id) {
  const url = `api/livre/${id}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      const display = document.getElementById('details');
      display.style.display = '';

      const titreElement = document.getElementById('titre');
      titreElement.textContent = 'Titre: ' + data.titre;
    
      const auteurElement = document.getElementById('auteur');
      auteurElement.textContent = 'Auteur: ' + data.auteur;
    
      const pagesElement = document.getElementById('pages');
      pagesElement.textContent = 'Pages: ' + data.pages;
    
      const dateSortieElement = document.getElementById('dateSortie');
      dateSortieElement.textContent = 'Date de sortie: ' + new Date(data.dateSortie).toLocaleDateString('fr-FR');
    }
  };
  xhr.send();
}

function closeDetails() {
  const details = document.getElementById("details");
  details.style.display = 'none';
}

function deleteLivre(livre) {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce livre ?");

  if (confirmation) {
    const url = `api/livre/${livre._id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(() => {
        alert("Livre supprimé avec succès");
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("Erreur :", error);
      });
  }
}

function fetchPage(page,order,orderType) {
  const url = `api/livre?page=${page}&order=${order}&orderType=${orderType}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const tbody = document.querySelector('#table tbody');
      tbody.innerHTML = '';
      
      const pageInfo = document.getElementById('page');
      pageInfo.textContent = `${page} / ${response.totalPages} pages`;
      
      localStorage.setItem("totalPage", response.totalPages);

      response.books.forEach((livre) => {
        const tr = createTableRow(livre);
        tbody.appendChild(tr);
      });

      document.getElementById('prevButton').disabled = page === 1;
      document.getElementById('nextButton').disabled = page >= response.totalPages;
    }
  };
  xhr.send();
}

const inputCurrentPage = document.getElementById('currentPage');

if(!localStorage.getItem("currentPage")){
  localStorage.setItem("currentPage",1);
}
if(!localStorage.getItem("currentOrder")){
  localStorage.setItem("currentOrder",'id');
}
if(!localStorage.getItem("currentOrderType")){
  localStorage.setItem("currentOrderType",'1');
}
let currentPage = parseInt(localStorage.getItem("currentPage"));
inputCurrentPage.value = currentPage;

function nextPage() {
  if (currentPage < parseInt(localStorage.getItem("totalPage"))) {
    currentPage++;
    localStorage.setItem("currentPage", currentPage);
    inputCurrentPage.value = currentPage;
      fetchPage(currentPage,localStorage.getItem("currentOrder"),localStorage.getItem("currentOrderType"));
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    localStorage.setItem("currentPage", currentPage);
    inputCurrentPage.value = currentPage;
      fetchPage(currentPage,localStorage.getItem("currentOrder"),localStorage.getItem("currentOrderType"));
  }
}

inputCurrentPage.addEventListener('input', () => {
  let newPage = parseInt(inputCurrentPage.value);
  const totalPage = parseInt(localStorage.getItem("totalPage"));
  
  if (!isNaN(newPage) && newPage > 0) {
    newPage = Math.min(newPage, totalPage);
    currentPage = newPage;
    localStorage.setItem("currentPage", currentPage);
    fetchPage(currentPage,localStorage.getItem("currentOrder"),localStorage.getItem("currentOrderType"));
  }
});

function sortTable(order,orderType){
  localStorage.setItem("currentOrder",order);
  localStorage.setItem("currentOrderType",orderType);
  fetchPage(currentPage,localStorage.getItem("currentOrder"),localStorage.getItem("currentOrderType"));
}

  fetchPage(currentPage,localStorage.getItem("currentOrder"),localStorage.getItem("currentOrderType"));