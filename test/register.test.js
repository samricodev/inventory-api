
describe('Register Category and Item', () => {
  let idCategory;
  it('should register a new category', async () => {
    const response = await fetch('http://localhost:3080/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Aceite monogrado',
        items: [],
      }),
    });
    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Aceite monogrado');
    idCategory = data.id;
  });

  it('should register a new item in the category', async () => {
    const response = await fetch('http://localhost:3080/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Cartek Monogrado 20W50',
        category: idCategory,
        price: 1000,
        stock: 50,
        description: 'Aceite monogrado de alta calidad',
      }),
    });
    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Cartek Monogrado 20W50');
  });
});