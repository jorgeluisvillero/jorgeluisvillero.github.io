function initAlta() {
    console.warn('initAlta()')

    let productos = []

    const inputs = document.querySelectorAll('main form input')
    const form = document.querySelector('main form')
    const button = document.querySelector('main form button') 

    button.disabled = true
    let camposValidos= [false,false,false,false,false,false,false]


    const setCustomValidityJS = function(mensaje, index) {
        let divs = document.querySelectorAll('form div')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje? 'block' : 'none'
    }

    function algunCampoNoValido() {
        let valido = 
            camposValidos[0] &&
            camposValidos[1] &&
            camposValidos[2] &&
            camposValidos[3] &&
            camposValidos[4] &&
            camposValidos[5] &&
            camposValidos[6]
        
        return !valido
    }

    function validar(valor, validador, index) {
        console.log(valor,index)

        if(!validador.test(valor)) {
            setCustomValidityJS('Este campo no es válido',index)
            camposValidos[index] = false
            button.disabled = true
            return null
        }

        camposValidos[index] = true
        button.disabled = algunCampoNoValido()

        setCustomValidityJS('',index)
        return valor
    }

    const regExpValidar = [
        /^[a-zA-Z]+$/, //regexp nombre
        /^[0-9]+$/, //regexp precio    
        /^[0-9]+$/, //regexp stock
        /^[a-zA-Z]+$/, //regexp marca
        /^[a-zA-Z]+$/, //regexp categoria
        /^[a-zA-Z]+$/, //regexp detalles
        /^[a-zA-Z]+$/, //regexp foto
    ]

    //console.log(inputs)
    inputs.forEach((input,index) => {
        if(input.type != 'checkbox') {
            input.addEventListener('input', () => {
                validar(input.value, regExpValidar[index], index )
            })
        }
    })

    form.addEventListener('submit', e => {
        e.preventDefault()

        let producto = {
            nombre: inputs[0].value,
            precio: inputs[1].value,
            stock: inputs[2].value,
            marca: inputs[3].value,
            categoria: inputs[4].value,
            detalles: inputs[5].value,
            foto: inputs[6].value,
            envio: inputs[7].checked,
        }

        //borro todos los input
        inputs.forEach(input => {
            if(input.type != 'checkbox') input.value = ''
            else if(input.type == 'checkbox') input.checked = false
        })

        //console.log(producto)
        productos.push(producto)

        //console.log(productos)
        renderProds()

        button.disabled = true
        camposValidos = [false,false,false,false,false,false,false]

    })

    function renderProdsObjetos() {
        let html = ''
        for(let i=0; i<productos.length; i++) {
            html += `<p>${JSON.stringify(productos[i])}</p>`
        }
        document.getElementById('listado-productos').innerHTML = html
    }


    function renderProdsTemplateString() {
        let html = ''

        html += '<table>'
        html += `
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Marca</th>
                <th>Categoria</th>
                <th>Detalles</th>
                <th>Foto</th>
                <th>Envio</th>
            </tr>
        `

        for(let i=0; i<productos.length; i++) {
            let producto = productos[i]
            
            html += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.marca}</td>
                <td>${producto.categoria}</td>
                <td>${producto.detalles}</td>
                <td>${producto.foto}</td>
                <td>${producto.envio}</td>
            </tr>
            `
        }

        html += '</table>'

        document.getElementById('listado-productos').innerHTML = html
    }


    function renderProds() {

        const xhr = new XMLHttpRequest
        xhr.open('get','plantillas/listado.hbs')
        xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
                let plantillaHbs = xhr.response
                //console.log(plantillaHbs)

                var template = Handlebars.compile(plantillaHbs);
                // execute the compiled template and print the output to the console
                let html = template({ productos: productos })
            
                document.getElementById('listado-productos').innerHTML = html            
            }
        })
        xhr.send()
    }

    renderProds()
}
