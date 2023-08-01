const request = require('supertest');
const app = require('../../src/app');
const libroModel = require('../../src/models/Libro')
// Mockup de Autenticación
jest.mock('express-oauth2-jwt-bearer', () =>{
    return {
        auth : jest.fn().mockImplementation(() => (req, res, next) => next()),
        requiredScopes: jest.fn().mockImplementation(() =>(req, res, next) => next()),
    };
});

// Mockup Mongoose
jest.mock('../../src/models/Libro.js');

describe('Libro API', () => {
    test('GET /libros debería obtener todos los libros', async () =>{
        const mockLibros = [
            {id: '1', titulo: 'Libro 1', autor: 'Autor 1'},
            {id: '2', titulo: 'Libro 2', autor: 'Autor 2'},
            ];

            libroModel.find.mockResolvedValue(mockLibros);

            const response = await request(app).get('/api/libros');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockLibros);
            expect(libroModel.find).toHaveBeenCalledTimes(1);
    });

    test("POST /libros debería crear un nuevo libro", async () => {
        const libroCreado = { id: "1", titulo: "Nuevo Libro", autor: "Juan Perez" };
        const libroMock = {
        ...libroCreado,
        save: () => {}
        };
        
        libroModel.create.mockResolvedValue(libroMock);

        const response = await request(app).post("/api/libros").send(libroMock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(libroCreado);
        expect(libroModel.create).toHaveBeenCalledTimes(1);
        expect(libroModel.create).toHaveBeenCalledWith(libroCreado);
    });
    
})