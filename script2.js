let comprador = {
    nombre: null,
    total: 0,
    cantidad: 0,
    inventario: [],
  };

  if (localStorage.getItem("comprador")) {
    comprador = JSON.parse(localStorage.getItem("comprador"));
  }
  
  while (!comprador.nombre) {
    comprador.nombre = prompt("Ingresa tu nombre para realizar una compra");
    guardar_info();
  }
  
  function guardar_info() {
    localStorage.setItem("comprador", JSON.stringify(comprador));
  }
  
  mostrar_informacion_comprador();
  

  function mostrar_informacion_comprador() {
    const els_comprador_nombre = document.querySelectorAll(".comprador_nombre");
          els_comprador_nombre.forEach((el) => (el.innerText = comprador.nombre));

    const els_comprador_total = document.querySelectorAll(".comprador_total");
          els_comprador_total.forEach((el) => (el.innerText = comprador.total));

    const els_comprador_cantidad = document.querySelectorAll(".comprador_cantidad");
          els_comprador_cantidad.forEach((el) => (el.innerText = comprador.cantidad));

   const el_inventario=document.querySelector("#inventario");
         el_inventario.innerHTML = "";

   comprador.inventario.forEach((item) => {
     el_inventario.innerHTML += `<img src="img/${item.imagen}" data-id="${item.id}" class="quitar_item" title="Nombre: ${item.nombre} | Precio: ${item.precio}" />`;
   });
   const els_inventario = document.querySelectorAll(".quitar_item");
   els_inventario.forEach((el) => {
     el.addEventListener("click", (event) => {
       quitar_item(event.target.getAttribute("data-id"));
     });
   });
  }


  class Item {
    constructor(id, nombre, precio, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
    }
  }
  
 
  const shop = [
    new Item(1, "angel", 400, "angel.jpeg"),
    new Item(2, "castillo", 800, "castillo.jpeg"),
    new Item(3, "pulpo", 600, "pulpo.jpg"),
    new Item(4, "redmarket", 1000, "redmarket.jpeg"),
    new Item(5, "sueño", 900, "sueño.jpg"),
  ];

const el_items_a_la_venta = document.querySelector("#tarjeta_ventas");
el_items_a_la_venta.innerHTML = "";

shop.forEach((item) => {
    el_items_a_la_venta.innerHTML += `<img src="img/${item.imagen}" data-id="${item.id}" class="imagen_a_comprar" title="Nombre: ${item.nombre} | Precio: ${item.precio}"/>`;
  });

  const imagen_en_venta = document.querySelectorAll(".imagen_a_comprar");

  imagen_en_venta.forEach((el) => {
    el.addEventListener("click", (event) => {
        comprar_item(event.target.getAttribute("data-id"));
  });
});

function comprar_item(id) {
    const imagen_a_comprar = shop.find((item) => item.id === Number(id));
    if (imagen_a_comprar) {
        comprador.inventario.push(imagen_a_comprar);
        comprador.total += imagen_a_comprar.precio;
        comprador.cantidad += 1;
        mostrar_informacion_comprador();
        guardar_info();
    }
    Swal.fire({
      title: "Agregaste al carrito",
      icon: "success",
      draggable: true
    });
}


function quitar_item(id) {
    const quitar_item = comprador.inventario.find((item) => item.id === Number(id));
    setTimeout(()=> {
    if (quitar_item) {
      const indice = comprador.inventario.findIndex((item) => item.id === Number(id));
      comprador.inventario.splice(indice, 1);
      comprador.total -= quitar_item.precio;
      comprador.cantidad -= 1;
      mostrar_informacion_comprador();
      guardar_info();
    }
  },2000)
    Swal.fire({
      title: "Deseas eliminar este producto?",
      icon: "error",
      draggable: true
    });
  }