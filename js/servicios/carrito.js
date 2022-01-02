class CarritoService {
    URL_CARRITO = 'https://61d1a32eda87830017e592c9.mockapi.io/carrito/'

    async guardarCarritoService(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()
