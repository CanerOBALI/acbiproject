const XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

let meallist, hotBevs, otherBevs;

XHR.onreadystatechange = function() {
    if (fetchMenu()) {
        populateMenu(mealList, hotBevs, otherBevs);
    }
};

XHR.open("GET", "../XML/menu.xml", true);
XHR.send();

function fetchMenu() {
    if (XHR.readyState === 4 && XHR.status === 200) {
        mealList = XHR.responseXML.getElementsByTagName('meals')[0].children;
        hotBevs = XHR.responseXML.getElementsByTagName('hotBeverages')[0].children;
        otherBevs = XHR.responseXML.getElementsByTagName('otherBeverages')[0].children;
        return true;
    }
    return false;
}

function generateCard(name, price, desc, imageURL) {
    let card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card">
            <img src="${imageURL}" class="card-img-top" alt="Menu item - ${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${desc}</p>
                <p class="card-text">${price}</p>
            </div>
        </div>
    `;
    return card;
}

function populateMenu(meals, hotBevs, otherBevs) {
    populateMeals(meals);
    populateBeverages(hotBevs, otherBevs);
}

function populateMeals(meals) {
    let menu = document.getElementById('menu');
    for (let i = 0, n = meals.length; i < n; i++) {
        let name = meals[i].getElementsByTagName("name")[0].textContent;
        let price = meals[i].getElementsByTagName("price")[0].textContent;
        let imageURL = meals[i].getElementsByTagName("imageURL")[0].textContent;
        let desc = meals[i].getElementsByTagName("description")[0].textContent;
        menu.appendChild(generateCard(name, price, desc, imageURL));
    }
}

function populateBeverages(hotBevs, otherBevs) {
    let menu = document.getElementById('menu');
    for (let i = 0, n = hotBevs.length; i < n; i++) {
        let size = `Coffee and hot chocolates - ${hotBevs[i].getElementsByTagName("size")[0].textContent}`;
        let price = hotBevs[i].getElementsByTagName("price")[0].textContent;
        let imageURL = "../images/coffee-cup-sizes.webp";
        let desc = hotBevs[i].getElementsByTagName("description")[0].textContent;
        menu.appendChild(generateCard(size, price, desc, imageURL));
    }
    for (let i = 0, n = otherBevs.length; i < n; i++) {
        let name = otherBevs[i].getElementsByTagName("name")[0].textContent;
        let price = otherBevs[i].getElementsByTagName("price")[0].textContent;
        let imageURL = "../images/Beverages.png";
        let desc = "";
        menu.appendChild(generateCard(name, price, desc, imageURL));
    }
}