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

function createPagination (pagination) {
    const filter = pagination.dataset.filter
    const currentPage = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(currentPage, total)


    let elements = ""

    for (let page of pages) {
        if(String(page).includes("...")) {
            // para tirar o underline das reticencias dando acesso ao clicar do mouse
            elements += `<span>${page}</span>`
        } else {
            const activeClass = page === currentPage ? `active`: ""
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}" class="${activeClass}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}" class="${activeClass}">${page}</a>`
            }
        }
    }

    // inserindo o html
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")
// o + serve para transformar em numero o dado que sera mostrado na pagina


if (pagination) {
    createPagination(pagination)
}
