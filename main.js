let jsonArr = []
const jewelery = 'jewelery'
const men = "men's clothing"
const woman = "women's clothing";
const electronics = "electronics"

// fetch the data
fetch('https://fakestoreapi.com/products')
.then(res => res.json())
.then(json => {
  displayData(json)
  jsonArr = json
  // console.log(jsonArr)
})

// short by price
const shortByPrice = ( ) => {
  const short = jsonArr.sort((a, b) => {
    return a.price - b.price
  })
  displayData(short)
}

// search by input
document.getElementById('searchField').addEventListener('keyup', (e) => {
  const inputTxt = e.target.value
  const searchArr = jsonArr.filter((elem) => elem.title.includes(inputTxt))
  displayData(searchArr)
})

// showing spinner
const showingSpinner = isSpinning => {
  const spinnerContainer = document.getElementById('showSpinner');
  if(isSpinning == true){
    spinnerContainer.classList.add('d-none')
  }
}
// filter mens fashion
const mens = (arr, category) => {
  const mensArr = arr.filter((elem) => elem.category == category)
  displayData(mensArr)
}

// showing all data
const displayData = (allData) => {
    // showing spinner
    const itemContainer = document.getElementById('item-container')
    itemContainer.innerHTML = ''
    allData.forEach((data) => {
        const div = document.createElement('div')
        const {id, title, price, image, rating, description, category} = data
        div.innerHTML = `
        <div class="card mt-3 align-items-center h-100 border border-warning">
        <img src="${image}" class="" style="width: 250px; height: 300px" alt="...">
        <div class="card-body">
            <div class="text-end"><span class="badge rounded-pill text-bg-warning me-2">${id}</span><span class="badge rounded-pill text-bg-warning">${category.split(' ')[0]}</span></div>
          <h5 class="card-title">${title.slice(0, 30)}</h5>
          <p class="card-text">${description.slice(0, 100)+ '.....'}</p>
          <h6 class="card-text">Price: ${price}$</h6>
          <h6 >Rating: ${rating.rate}(${rating.count})</h6>
          <button class="btn btn-outline-dark">Buy now</button>
        </div>
      </div>
        `
        itemContainer.appendChild(div)
    })
    showingSpinner(true)
}