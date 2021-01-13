const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")


for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    } 
}

// Paginacao
let totalPages = 25,
    selectedPage = 15,
    pages = [],
    oldPage

    // 1, 2, ... 14, 15, 16, ... 24, 25 

for(let currentPage =1; currentPage<= totalPages; currentPage++) {
    
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const secondPage = currentPage == 2 
    const penultimatePage = currentPage == totalPages -1
    const pagesAfterSelectedPage = currentPage <= selectedPage +1
    const pagesBeforeSelectedPage = currentPage >= selectedPage -1
    
    if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage || secondPage || penultimatePage) {
        

        if(oldPage && currentPage - oldPage >2) {
            pages.push("...")
        }

        if(oldPage && currentPage - oldPage ==2) {
            pages.push(oldPage + 2)
        }
        
        pages.push(currentPage)

        oldPage = currentPage
    }
}

console.log(pages)