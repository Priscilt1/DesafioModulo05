const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")


for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    } 
}


function paginate (selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage<= totalPages; currentPage++) {
    
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const secondPage = currentPage == 2 
        const penultimatePage = currentPage == totalPages -1
        const pagesAfterSelectedPage = currentPage <= selectedPage +1
        const pagesBeforeSelectedPage = currentPage >= selectedPage -1
        
        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage || secondPage || penultimatePage) {
            if(oldPage && currentPage - oldPage >2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage ==2) {
                pages.push(oldPage + 2)
            }
            
            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages 
}

const pagination = document.querySelector(".pagination")
// o + serve para transformar em numero o dado que sera mostrado na pagina
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)

console.log(pages, total, page)

let elements = ""

for (let page of pages) {
    if(String(page).includes("...")) {
        // para tirar o underline das reticencias dando acesso ao clicar do mouse
        elements += `<span>${page}</span>`
    } else {
        elements += `<a href="?page=${page}">${page}</a>`
    }
}

// inserindo o html
pagination.innerHTML = elements