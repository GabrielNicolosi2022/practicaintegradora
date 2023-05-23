import productsModel from '../../dao/models/products';

// Evento de envío del formulario
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  if (
    getCheckbox.checked ||
    postCheckbox.checked ||
    putCheckbox.checked ||
    deleteCheckbox.checked
  ) {
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de enviar el formulario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // crear un objeto con los datos de formulario
        const productData = {
          id: document.getElementById('id').value,
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
          code: document.getElementById('code').value,
          price: parseFloat(document.getElementById('price').value),
          status: document.getElementById('status').value === 'true',
          stock: parseInt(document.getElementById('stock').value),
          category: document.getElementById('category').value,
          thumbnails: [], // Lógica para manejar las imágenes del formulario si las hubiera
        };

        if (getCheckbox.checked) {
          // Listar los productos
          try {
            products = await productsModel.find();
          } catch (error) {
            console.log(error);
          }
        } else if (postCheckbox.checked) {
          // Realizar la creación de un nuevo producto
          try {
            const newProduct = await productsModel.create(productData);
            // Lógica adicional después de crear el producto (redireccionar, mostrar mensaje, etc.)
          } catch (error) {
            // Manejo de errores en caso de fallo en la creación del producto
            console.log(error);
          }
        } else if (putCheckbox.checked) {
          // obtener el Id del producto del formulario
          const productId = document.getElementById('id').value;
          // Realizar la actualizacion del producto
          try {
            const updateProduct = await productsModel.findByIdAndUpdate(
              productId,
              productData,
              {
                new: true,
              }
              // Lógica adicional después de crear el producto (redireccionar, mostrar mensaje, etc.)
            );
          } catch (error) {
            // Manejo de errores en caso de fallo en la creación del producto
            console.log(error);
          }
        } else if (deleteCheckbox.checked) {
          // Obtener el ID del producto del formulario
          const productId = document.getElementById('id').value;

          // Realizar la eliminación del producto
          try {
            await productsModel.findByIdAndDelete(productId);
            // Lógica adicional después de eliminar el producto (redireccionar, mostrar mensaje, etc.)
          } catch (error) {
            // Manejo de errores en caso de fallo en la eliminación del producto
            console.log(error);
          }
        }
      }
      form.submit();
      // form.reset();
    });
  }
});
