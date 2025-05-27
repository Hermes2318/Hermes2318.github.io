const form = document.getElementById('property-form');
const list = document.getElementById('property-list');

let properties = [];
let editIndex = null;

window.onload = () => {
  const stored = localStorage.getItem('properties');
  if (stored) {
    properties = JSON.parse(stored);
    renderProperties();
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newProperty = {
    title: document.getElementById('title').value.trim(),
    address: document.getElementById('address').value.trim(),
    price: document.getElementById('price').value.trim(),
    image: document.getElementById('image').value.trim(),
    description: document.getElementById('description').value.trim()
  };

  if (editIndex !== null) {
    properties[editIndex] = newProperty;
    editIndex = null;
  } else {
    properties.push(newProperty);
  }

  saveAndRender();
  form.reset();
});

function renderProperties(filtered = null) {
  const data = filtered || properties;
  list.innerHTML = '';

  if (data.length === 0) {
    list.innerHTML = '<p>No hay inmuebles para mostrar.</p>';
    return;
  }

  data.forEach((property, index) => {
    const card = document.createElement('div');
    card.className = 'property-card';

    const img = document.createElement('img');
    img.src = property.image;

    const content = document.createElement('div');
    content.className = 'property-content';

    content.innerHTML = `
      <div class="property-title">${property.title}</div>
      <div class="property-price">$${parseFloat(property.price).toLocaleString()}</div>
      <div class="property-address">📍 ${property.address}</div>
      <div class="property-description">${property.description}</div>
    `;

    const actions = document.createElement('div');
    actions.className = 'property-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => editProperty(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => deleteProperty(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    content.appendChild(actions);

    card.appendChild(img);
    card.appendChild(content);
    list.appendChild(card);
  });
}

function editProperty(index) {
  const p = properties[index];
  document.getElementById('title').value = p.title;
  document.getElementById('address').value = p.address;
  document.getElementById('price').value = p.price;
  document.getElementById('image').value = p.image;
  document.getElementById('description').value = p.description;
  editIndex = index;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProperty(index) {
  if (confirm('¿Estás seguro de eliminar este inmueble?')) {
    properties.splice(index, 1);
    saveAndRender();
  }
}

function applyFilters() {
  const dir = document.getElementById('filter-address').value.toLowerCase();
  const min = parseFloat(document.getElementById('filter-min-price').value) || 0;
  const max = parseFloat(document.getElementById('filter-max-price').value) || Infinity;

  const filtered = properties.filter(p => {
    const matchesDir = p.address.toLowerCase().includes(dir);
    const price = parseFloat(p.price);
    return matchesDir && price >= min && price <= max;
  });

  renderProperties(filtered);
}

function clearFilters() {
  document.getElementById('filter-address').value = '';
  document.getElementById('filter-min-price').value = '';
  document.getElementById('filter-max-price').value = '';
  renderProperties();
}

function saveAndRender() {
  localStorage.setItem('properties', JSON.stringify(properties));
  renderProperties();
}
