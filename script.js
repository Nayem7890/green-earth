const categoryContainer = document.getElementById('categoryContainer')

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => {
            const categories = data.categories
            console.log(categories)
            showCategory(categories)
        })
        .catch(err => {
            console.log(err);
        });
};

    const showCategory = (categories) =>{
        categories.forEach(cat => {
                console.log(cat.category_name)
                categoryContainer.innerHTML += `
                 <li id="${cat.id}" class="hover:w-full hover:bg-[#15803D] py-1 pl-1 rounded-sm hover:text-white cursor-pointer">${cat.category_name} </li>
                `;
            });
    }



loadCategory()
