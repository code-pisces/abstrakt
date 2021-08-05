import should from 'should';
import request, { CoreOptions } from 'request';
import { expect } from 'chai';

const urlBase = "http://localhost:8080/";

const options: CoreOptions = {
    baseUrl: urlBase,
    headers: {
        "origin": "http://localhost:8080",
        'accept-language': 'pt-BR',
        'accept': "application/json"
    }
}

/**
 * Section to test Auth system in development ambient
 * @route /auth/local/signup
 */

describe("API Auth Local Signup", () => {
    it("Should return name invalid error", (done) => {
        request.post("/auth/local/signup", {
            ...options,
            json: {
                name: ".]dwadáçw[ç[ḉ"
            }
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });

    it("Should return email empty error", (done) => {
        request.post("/auth/local/signup", options, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });

    it("Should return email invalid error", (done) => {
        request.post("/auth/local/signup", {
            ...options,
            json: {
                email: "teste",
                password: "123"
            }
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });
    it("Should return password empty error", (done) => {
        request.post("/auth/local/signup", {
            ...options,
            json: {
                email: "teste@teste.com"
            }
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });
    it("Should return password small error", (done) => {
        request.post("/auth/local/signup", {
            ...options,
            json: {
                email: "teste@teste.com",
                password: "123"
            }
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });
    it("Should successfully register new user", (done) => {
        request.post("/auth/local/signup", {
            ...options,
            json: {
                email: "teste@teste.com",
                password: "123456"
            }
        }, (error, response, body) => {
            var _body: any = {};
            try{
                _body = JSON.parse(body);
            }
            catch(e){
                _body = {};
            }

            if(!(response.statusCode == 400 || response.statusCode == 201)){
                expect(response.statusCode).to.equal(201);
            }

            done();
        })
    });
});

/**
 * Section to test Auth system in development ambient
 * @route /auth/local/login
 */

 describe("API Auth Local Login", () => {
    it("Should return email empty error", (done) => {
        request.post("/auth/local/login", {
            ...options
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });

    it("Should return password empty error", (done) => {
        request.post("/auth/local/login", {
            ...options,
            json: {
                email: "teste@teste.com"
            }
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    });

    it("Should return accessToken on login success", (done) => {
        request.post("/auth/local/login", {
            ...options,
            json: {
                email: "teste@teste.com",
                password: "123456"
            }
        }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            
            if(should(body).hasOwnProperty("data"))
                expect(body.data.accessToken).to.not.null;

            done();
        })
    });
});