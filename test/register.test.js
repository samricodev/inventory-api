
describe('Register Location, Brand, Category and Item', () => {
  let idLocation;
  let idBrand;
  let idCategory;

  it('should register a new location', async () => {
    const response = await fetch('http://localhost:3080/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Ubicación secundaria',
        address: 'Calle Niño perdido 232',
        city: 'Tizapán el Alto',
        state: 'Jalisco',
        items: [],
      }),
    });
    const { data } = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Ubicación secundaria');
    idLocation = data._id;
  });

  it('should register a new brand', async () => {
    const response = await fetch('http://localhost:3080/brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Mobil',
        description: 'Mobil es una marca de aceites para autos de alta calidad',
        items: [],
      }),
    });
    const { data } = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Mobil');
    idBrand = data._id;
  });

  it('should register a new category', async () => {
    const response = await fetch('http://localhost:3080/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Aceite sintético',
        items: [],
      }),
    });
    const { data } = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Aceite sintético');
    idCategory = data._id;
  });

  it('should register a new item in the category', async () => {
    const response = await fetch('http://localhost:3080/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Aceite sintético 10W30',
        category: idCategory,
        location: idLocation,
        brand: idBrand,
        price: 1000,
        stock: 50,
        description: 'Aceite sintético de alta calidad',
      }),
    });
    const { data } = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Aceite sintético 10W30');
  });
});