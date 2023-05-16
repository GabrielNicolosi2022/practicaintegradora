// Obtener referencia al formulario y los checkboxes
const form = document.getElementById('prodForm');
const postCheckbox = document.getElementById('postCheckbox');
const putCheckbox = document.getElementById('putCheckbox');
const deleteCheckbox = document.getElementById('deleteCheckbox');
const actionFormHeader = document.getElementById('actionFormHeader');

// Functions
function hideIdField() {
  const id = document.getElementById('field-id');
  id.style.display = 'none';
}
function hideFields() {
  const fields = [
    '#field-title',
    '#field-description',
    '#field-code',
    '#field-price',
    '#field-status',
    '#field-stock',
    '#field-category',
    '#field-thumbnail',
  ];

  fields.forEach((selector) => {
    const field = document.querySelector(selector);
    if (field) {
      field.style.display = 'none';
    }
  });
}
function showIdField() {
  const id = document.getElementById('field-id');
  id.style.display = 'block';
}
function showFields() {
  const fields = [
    '#field-title',
    '#field-description',
    '#field-code',
    '#field-price',
    '#field-status',
    '#field-stock',
    '#field-category',
    '#field-thumbnail',
  ];

  fields.forEach((selector) => {
    const field = document.querySelector(selector);
    if (field) {
      field.style.display = 'block';
    }
  });
}

// Agregar eventos para detectar cambios en los checkboxes
postCheckbox.addEventListener('change', function () {
  if (postCheckbox.checked) {
    form.method = 'POST';
    actionFormHeader.textContent = 'Agregar Producto';
    hideIdField();
    showFields();
    // Obtener todos los elementos de formulario dentro del formulario
    const formElements = form.elements;
    // Iterar sobre los elementos y agregar la propiedad 'required'
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      console.log(element);
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        element.setAttribute('required', 'required');
        if (element.id === 'thumbnail') {
          element.removeAttribute('required');
        }
      }
    }
  }
});

putCheckbox.addEventListener('change', function () {
  if (putCheckbox.checked) {
    form.method = 'PUT';
    actionFormHeader.textContent = 'Modificar Producto';
    showIdField();
    showFields();
    // Obtener todos los elementos de formulario dentro del formulario
    const formElements = form.elements;
    // Iterar sobre los elementos y quitar la propiedad 'required'
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        element.removeAttribute('required');
        if (element.id === 'id') {
          element.setAttribute('required','required');
        }
      }
    }
  }
});

deleteCheckbox.addEventListener('change', function () {
  if (deleteCheckbox.checked) {
    form.method = 'DELETE';
    actionFormHeader.textContent = 'Eliminar Producto';
    showIdField();
    hideFields();
  }
});

// Evento de envío del formulario
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario
  if (postCheckbox.checked || putCheckbox.checked || deleteCheckbox.checked) {
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de enviar el formulario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se hace clic en "Enviar", enviar el formulario
        form.submit();
      }
    });
  }
});
