describe('Ping', () => {
  it('should respond with pong', async () => {
    const response = await fetch('http://localhost:3001/ping');
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toBe('pong');
  });
});
