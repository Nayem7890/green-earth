const categoryContainer = document.getElementById('categoryContainer')
const treesContainer = document.getElementById('treesContainer')

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
    console.log(plants)
    treesContainer.innerHTML = ""
    plants.forEach(plant => {
        treesContainer.innerHTML += `
                        <div class="p-4 bg-white rounded-xl w-10/12 md:w-full mx-auto">
                                <div>
                                <img class="h-[230px] w-full rounded-md" src="${plant.image}" alt="">
                            </div>
                            <div class="py-3" >
                                <h2 class="text-sm font-bold">${plant.name}</h2>
                            </div>
                            <p class="text-xs opacity-80">${plant.description} </p>
                            <div class="flex justify-between items-center py-3 mb-2">
                                <p class="w-[120px] bg-[#DCFCE7] rounded-2xl text-center text-[#15803D] font-bold p-1 " >${plant.category}</p>
                                <p class="text-sm font-bold">$${plant.price}</p>
                            </div>
                            <button class="w-full rounded-3xl bg-[#15803D] py-3 text-white font-semibold cursor-pointer">Add to Cart</button>
                         </div>
        
        `
    })
}

loadCategory();
loadAllPlants();