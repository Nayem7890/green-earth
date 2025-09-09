const categoryContainer = document.getElementById('categoryContainer')
const treesContainer = document.getElementById('treesContainer')
const cartContainer = document.getElementById('cartContainer')
const detailsContainer = document.getElementById('detailsContainer')
let carts = []

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => {
            const categories = data.categories
            // console.log(categories)
            showCategory(categories)
        })
        .catch(err => {
            console.log(err);
        });
};

const showCategory = (categories) => {
    categories.forEach(cat => {
        // console.log(cat.category_name)
        categoryContainer.innerHTML += `
                 <li id="${cat.id}" class="hover:w-full hover:bg-[#15803D] py-1 pl-1 rounded-sm hover:text-white cursor-pointer">${cat.category_name} </li>
                `;
    });
    categoryContainer.addEventListener('click', (e) => {

        const allLi = document.querySelectorAll('li')
        allLi.forEach(li => {
            li.classList.remove('bg-[#15803D]', 'text-white')
        })

        if (e.target.localName === 'li') {
            // console.log(e.target.id)
             showLoading()
            e.target.classList.add('bg-[#15803D]', 'text-white')
            loadTressByCategory(e.target.id)
        }
    })
}

const loadTressByCategory = (categoryId) => {
    console.log(categoryId)
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.plants)
            showTreesByCategory(data.plants)

        })
        .catch(err => {
            console.log(err)
        })
}

const loadAllPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(plants => {
            showTreesByCategory(plants.plants);
        })
        .catch(err => {
            console.log(err);
        });
};


const showTreesByCategory = (plants) => {

    treesContainer.innerHTML = ""
    plants.forEach(plant => {
        treesContainer.innerHTML += `
            <div class="plant-card p-4 bg-white rounded-xl w-10/12 md:w-full mx-auto" id="${plant.id}">
                <div class="aspect-[4/3] md:aspect-[16/9]">
                    <img class="h-full w-full object-cover rounded-md" src="${plant.image}" alt="">
                </div>
                <div class="py-3" onclick="loadPlantDetail(${plant.id})">
                    <h2 class="plant-name text-sm font-bold cursor-pointer">${plant.name}</h2>
                </div>
                <p class="text-xs opacity-80">${plant.description}</p>
                <div class="flex justify-between items-center py-3 mb-2">
                    <p class="w-[120px] bg-[#DCFCE7] rounded-2xl text-center text-[#15803D] font-bold p-1">${plant.category}</p>
                    <p class="plant-price text-sm font-bold">$${plant.price}</p>
                </div>
                <button class="add-to-cart-btn w-full rounded-3xl bg-[#15803D] py-3 text-white font-semibold cursor-pointer">Add to Cart</button>
            </div>
        `;
    })
};

       const loadPlantDetail =(id) =>{
         fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
         .then(res => res.json())
         .then (data =>{
            displayPlantDetails(data.plants)
         })
       }

       const displayPlantDetails =(plant)=>{
         detailsContainer.innerHTML= `
            <div> 
                 <h2 class="font-bold text-xl mb-2">${plant.name}</h2>
                 <div class="aspect-[4/3] md:aspect-[16/9]">
                                <img class="h-full w-full object-cover rounded-md" src="${plant.image}" alt="">
                            </div>
                        <p class="py-2"><span class="font-bold">Category: </span>${plant.category}</p>
                       <p class=""><span class="font-bold">Price: </span>$${plant.price}</p>
                     <p class="opacity-80 pt-2"><span class="font-bold">Description: </span>${plant.description} </p>
            </div>
         `;
         document.getElementById('word_modal').showModal();
       }

  const showLoading = () =>{
    treesContainer.innerHTML = `
        <div class="col-span-3 flex items-center justify-center py-12">
      <span class="loading loading-dots loading-xl text-[#15803D]"></span>
      <span class="loading loading-dots loading-xl text-[#15803D]"></span>
      <span class="loading loading-dots loading-xl text-[#15803D]"></span>
    </div>
    `
  }

  treesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const card = e.target.parentNode; 
        const title = card.querySelector('.plant-name').innerText;
        const price = parseFloat(card.querySelector('.plant-price').innerText.replace('$',''));
        const id = card.id;



        alert(`${title} has been added to the cart!`);

    
        carts.push({ id, title, price });

        
        showCarts(carts);
    }
});

  const handleCarts = (e) => {
    const card = e.target.parentNode; 
    const title = card.children[1].innerText; 
    const price = parseFloat(card.children[3].children[1].innerText.replace('$','')); 
    const id = card.id;

    carts.push({ id, title, price });
    showCarts(carts);
};

  const showCarts = (carts) => {
    cartContainer.innerHTML = "";
    let total = 0;

    carts.forEach(cart => {
        total += cart.price;
        cartContainer.innerHTML += `
            <div class="flex justify-between items-center my-2 py-1 px-0 md:py-3 md:px-3 bg-[#F0FDF4] rounded-xl">
                <div class="space-y-2">
                  <h2 class="font-bold text-sm md:text-base">${cart.title}</h2>
                  <p>$${cart.price} × 1</p>
                </div>
                <button onclick="handleDeleteCart('${cart.id}')" class="cursor-pointer text-xs md:text-base">❌</button>
            </div>
        `;
    });

    
    document.getElementById('total-price-value').innerText = total;
};

  const handleDeleteCart = (cartId) => {
    carts = carts.filter(cart => cart.id !== cartId);
    showCarts(carts);
};

  

loadCategory();
loadAllPlants();