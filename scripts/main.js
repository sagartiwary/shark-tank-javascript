// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${import.meta.env.REACT_APP_JSON_SERVER_PORT
  }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const pitchURL = `${baseServerURL}/pitches`;
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// add pitches

function addNewPitches() {
  let newObj = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
    price: pitchPriceInput.value,
  }
  fetch(pitchURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newObj)
  })
    .then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)

      listLoading()
    }).catch((err) => {
      console.log(err)
    })
}
pitchCreateBtn.addEventListener("click", addNewPitches);

// get the list of all the items
function listLoading() {
  fetch(pitchURL)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      filterData = data
      displayData(data)
    }).catch((err) => {
      console.log(err)
    })
}

function displayData(data) {
  mainSection.innerHTML = null
  data.forEach((ele, index) => {
    let cardList = document.createElement("div")
    let card = document.createElement("div")
    let card_image = document.createElement("div")
    let card_body = document.createElement('div');
    cardList.classList.add("card-list")
    card.classList.add("card");
    card.setAttribute("data-id", ele.id)
    card_image.classList.add("card-image")
    card_body.classList.add("card-body");
    let image = document.createElement('img')
    image.setAttribute('src', ele.image);
    card_image.append(image)
    let heading = document.createElement("h4")
    heading.classList.add("card-title");
    heading.textContent = ele.title;
    let founder = document.createElement("p")
    founder.classList.add('card-founder')
    founder.textContent = `Founder : ${ele.founder}`;
    let category = document.createElement("p")
    category.classList.add('card-category')
    category.textContent = ele.category;
    let price = document.createElement("p")
    price.classList.add('card-price')
    price.textContent = ele.price;
    let anchor = document.createElement('a')
    anchor.setAttribute("href", "#")
    anchor.classList.add("card-link")
    anchor.setAttribute("data-id", ele.id)
    anchor.textContent = "Edit"
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

    })
    let btn = document.createElement('button');
    btn.classList.add("card-button")
    btn.setAttribute("data-id", ele.id);
    btn.textContent = "Delete";
    btn.addEventListener("click", () => {
      deleteItem(ele.id)
    })
    card_body.append(heading, founder, category, price, anchor, btn)
    card.append(card_image, card_body)
    cardList.append(card)
    mainSection.append(cardList)
  })
}

function deleteItem(id) {
  fetch(`${pitchURL}/${id}`, {
    method: 'DELETE'
  })
    .then((res) => {
      return res.json()
    }).then((data) => {
      // console.log(data)
      listLoading()
    }).catch((err) => {
      console.log(err)
    })
}


window.addEventListener('load', listLoading)







// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

function updateData() {
  let newObj = {
    id: updatePitchIdInput.value,
    title: updatePitchTitleInput.value,
    image: updatePitchImageInput.value,
    category: updatePitchCategoryInput.value,
    founder: updatePitchfounderInput.value,
    price: updatePitchPriceInput.value,
  }




}

updatePitchBtn.addEventListener("click", () => {
  updateData()
})











//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

let filterData = []



filterFood.addEventListener("click", () => {
  let filterByFood = filterData.filter((ele) => {
    if (ele.category === "Food") {
      return true
    } else {
      return false
    }
  })
  displayData(filterByFood)
})

filterElectronics.addEventListener("click", () => {
  let filterByElectronics = filterData.filter((ele) => {
    if (ele.category === "Electronics") {
      return true
    } else {
      return false
    }
  })
  displayData(filterByElectronics)
})

filterPersonalCare.addEventListener("click", () => {
  let filterByPersonalCare = filterData.filter((ele) => {
    if (ele.category === "Personal Care") {
      return true
    } else {
      return false
    }
  })
  displayData(filterByPersonalCare)
})

sortAtoZBtn.addEventListener("click", () => {
  let newFilterAtoZ = filterData.sort((a, b) => {
    return a.price - b.price
  })
  displayData(newFilterAtoZ)
})

sortZtoABtn.addEventListener('click', () => {
  let newFilterZtoA = filterData.sort((a, b) => {
    return b.price - a.price
  })
  displayData(newFilterZtoA)
})


//Search by title/founder
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


searchByButton.addEventListener("click", () => {

  let searchSelect = searchBySelect.value.trim().toLowerCase()
  let searchInput = searchByInput.value.trim().toLowerCase();
  let utl = `${pitchURL}?${searchSelect}_like=${searchInput}`;
  fetch(utl)
    .then((res) => {
      return res.json()
    }).then((data) => {
      // console.log(data)
      displayData(data)
    }).catch((err) => {
      console.log(err)
    })







});

