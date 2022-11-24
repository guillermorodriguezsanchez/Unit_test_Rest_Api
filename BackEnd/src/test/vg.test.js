//import nock from "nock";
const request = require('supertest');
const mongoose = require("mongoose");

require("dotenv").config();

const app = require('../../index');




/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DBCONNECTION);
 });

 afterAll(async () => {
    await mongoose.disconnect(process.env.DBCONNECTION);
 });

const data = {
    name : "Far Cry 10",
    category : "War",
    ageToPlay : "+18",
    amount : 20
}

test("POST /api/posts", async () => {
	
	const result = await request(app)
		.post("/videoGames")
		.send(data)
		
        expect(result.body).toEqual(
            {
                ok: true,
                msg: 'addGame',
                videogame: data.name
            }
        )
    // Delete the videogame once we finish with the add Test.
    const result1  = await request(app)
		.delete(`/videoGames?name=${result.body.videogame}`)

        expect(result1.body).toEqual(
            {
                ok: true,
                msg: 'This videoGame has been eliminated',
            }
        ) 
})

describe("GET /videogames", () => {
    it("should return all videogames", async () => {
        
      const res = await request(app)
      
      .get("/videoGames");
      
      expect(res.body).toHaveProperty('ok', true);
      expect(res.body).toHaveProperty('msg', 'All videoGames');
      expect(res.body).toEqual(
        {
            ok:true,
            msg: 'All videoGames',
            videogame: res.body.videogame
        }
      )
      
    });
});

test("GET /videogames/:name", async () => {

    const name = "Far Cry 6";

	const result  = await request(app)
		.get(`/videoGames/one?name=${name}`)
		
		expect(result.body).toEqual(
            {
                ok:true,
                msg: 'One videogame',
                videogame: name
            }
        )
})

test("DELETE a videogame", async () => {

    const resultP = await request(app)
		.post("/videoGames")
		.send(data)
		
        expect(resultP.body).toEqual(
            {
                ok: true,
                msg: 'addGame',
                videogame: data.name
            }
        )
	const result  = await request(app)
		.delete(`/videoGames?name=${data.name}`)
		
		expect(result.body).toEqual(
            {
                ok: true,
                msg: 'This videoGame has been eliminated',
            }
        )
})

test("DELETE doesnt exist", async () => {

    const nameFake = "asddfg";

	const result  = await request(app)
		.delete(`/videoGames?name=${nameFake}`)
		
		expect(result.body).toEqual(
            {
                ok: false,
                msg: 'The id of the videoGame does not exist',
            }
        )
})

test("POST name exists /videoGames", async () => {
	
    const data = {
		name : "Cod of War3",
        category : "War",
        ageToPlay : "+18",
        amount : 20
	}

	const result = await request(app)
		.post("/videoGames")
		.send(data)
		
        expect(result.body).toEqual(
            {
                ok: false,
                msg: 'Name of this game exists'
            }
        )
})

test("POST amount /videoGames", async () => {
	
    const data = {
		name : "Cod of War10",
        category : "War",
        ageToPlay : "+18",
        amount : 25
	}

	const result = await request(app)
		.post("/videoGames")
		.send(data)
		
        expect(result.body).toEqual(
            {
                ok: false,
                msg: 'We do not have enough space'
            }
        )
})

test("POST  the age +18 /videoGames", async () => {
	
    const data = {
		name : "Cod of War10",
        category : "Combat",
        ageToPlay : "+12",
        amount : 20
	}

	const result = await request(app)
		.post("/videoGames")
		.send(data)
		
        expect(result.body).toEqual(
            {
                ok: false,
                msg: 'The age to play should be +18 if its a war category'
            }
        )
})

test("POST category doesnt exist /videoGames", async () => {
	
    const data = {
		name : "Full guys",
        category : "adventure",
        ageToPlay : "+12",
        amount : 20
	}

	const result = await request(app)
		.post("/videoGames")
		.send(data)
		
        expect(result.body).toEqual(
            {
                ok:false,
                msg: 'The category does not exist'
            }
        )
})



