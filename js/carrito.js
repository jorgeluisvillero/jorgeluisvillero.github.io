function initCarrito() {
    var btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    btnCarrito.addEventListener('click', function () {
        elemSectionCarrito.classList.toggle('section-carrito--visible')
    })
}

initCarrito()
