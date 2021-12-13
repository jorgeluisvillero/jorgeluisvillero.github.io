var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

function start() {

    function ajax(url, metodo) {    // argumentos con valores por default
        let xhr = new XMLHttpRequest
        xhr.open(metodo || 'get', url)
        xhr.send()

        return xhr
    }

    function getNombreArchivo(id) {
        return 'vistas/' + id + '.html'
    }

    function marcarLink(id) {
        let links = document.querySelectorAll('header nav a')
        links.forEach( link => {
            if(link.id == id) link.classList.add('active')
            else link.classList.remove('active')
        })
    }

    function initJS(id) {
        if(id == 'alta') {
            initAlta()
        }
        else if(id == 'inicio') {
            initInicio()
        }
        else if(id == 'nosotros') {
            initNosotros()
        }
        else if(id == 'contacto') {
            initContacto()
        }
    }

    function cargarPlantilla(id) {
        let archivo = getNombreArchivo(id)

        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let plantilla = xhr.response

                // Carga del código de vista (HTML) de la plantilla
                let main = document.querySelector('main')
                main.innerHTML = plantilla

                // Carga del código script (JS) de la plantilla
                initJS(id)
            }
        })
    }

    function cargarPlantillas() {
        /* --------------------------------------------------------- */
        /* Carga inicial de la vista determinada por la url visitada */
        /* --------------------------------------------------------- */
        let id = location.hash.slice(1) || 'inicio'
        marcarLink(id)
        cargarPlantilla(id)

        /* ------------------------------------------------------------- */
        /* Carga de cada uno de los contenidos según la navegación local */
        /* ------------------------------------------------------------- */
        let links = document.querySelectorAll('header nav a')
        //console.log(links)

        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()

                let id = link.id
                //console.log(id)
                location.hash = id
            })
        })

        window.addEventListener('hashchange', () => {
            //console.log('Cambió la URL')

            let id = location.hash.slice(1) || 'inicio'
            marcarLink(id)
            cargarPlantilla(id)
        })
    }

    cargarPlantillas()
}

start()
