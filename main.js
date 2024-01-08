// Obtener el contenedor padre de los productos
const containerPreview = document.querySelector('.m-productTile__container');
let data;
let ultimoButton = null;
// Realizar la solicitud GET al archivo JSON
fetch('./productos.json')
    .then(response => response.json()) // Convertir la respuesta a un objeto JSON
    .then(data => {
        data = data.productos; // Acceder al arreglo de productos

        // Para cada producto en el JSON, crear un elemento HTML y agregarlo al contenedor
        data.forEach(productos => {

            function crearProductCard(clases) {
                const card = document.createElement('div');
                card.className = clases;
                return card;
            }
            
            const card = crearProductCard('producto-card')

            const previewContainer = crearProductCard('m-productTile__previewContainer');
            const img = document.createElement('img');
            img.src = productos.imagen;
            img.alt = productos.descripcion;
            previewContainer.appendChild(img);
            card.appendChild(previewContainer);

            const discount = document.createElement('span');
            discount.className = 'carousel_badge__discount';
            discount.style.backgroundColor = 'rgb(235, 0, 41)';
            discount.style.color = 'rgb(255, 255, 255)';
            discount.textContent = `-${productos.descuento}%`;
            previewContainer.appendChild(discount);
            card.appendChild(previewContainer);

            const productoInfo = document.createElement('div');
            productoInfo.className = 'producto-info';
            const marca = document.createElement('p');
            marca.className = 'producto-marca';
            marca.textContent = productos.marca;
            productoInfo.appendChild(marca);

            const descripcion = document.createElement('p');
            descripcion.className = 'producto-description';
            descripcion.textContent = productos.descripcion;
            productoInfo.appendChild(descripcion);
            card.appendChild(productoInfo);

            const precioActual = document.createElement('p');
            precioActual.className = 'producto-precioActual';
            precioActual.textContent = `$ ${productos.precioActual}`;
            card.appendChild(precioActual);

            const precioSecundario = document.createElement('p');
            precioSecundario.className = 'producto-precioSecundario';
            precioSecundario.textContent = `${productos.precioSecundario}`;
            card.appendChild(precioSecundario);

            const button = document.createElement('button');
            button.className = 'button-calcular-descuento';
            button.textContent = 'Calcular descuento';
            card.appendChild(button);

            button.addEventListener('click', calcularDescuento);

            function calcularDescuento(event){
                event.preventDefault();

                // Almacenar el precio secundario original
                const producto = event.target.closest('.product-card');
                const precioSecundarioOriginal = producto.querySelector('.producto-precioSecundario').innerText;
            
                // Calcular el descuento
                const resultado = (productos.precioActual - (productos.precioActual * (productos.descuento/100))).toFixed(3);
            
                // Actualizar el precio secundario
                producto.querySelector('.producto-precioSecundario').innerText = "Descuento: $ " + resultado;
            
                // Actualizar la variable `ultimoButton`
                ultimoButton = event.target;
            }
            containerPreview.appendChild(card);
        });// agregado paréntesis cerrado adicional
    });


