import { generateId } from "../../client/app/Utils/generateId";
import { FakeDb } from "../db/FakeDb";

class DogsService {
    async getAll() {
        return FakeDb.dogs
    }

    async getById(id) {
        const dog = await FakeDb.dogs.find(dog => dog.id === id)
        if (!dog) {
            throw BadRequest('Invalid Id')
        }
        return dog
    }

    async create(dog) {
        dog.id = generateId()
        FakeDb.dogs.push(dog)
        return dog
    }

    async edit(dog) {
        const original = await this.getById(dog.id)
        original.name = dog.name || original.name
        original.age = dog.age || original.age
        return original
    }

    async remove(id) {
        await this.getById(id)
        FakeDb.dogs = FakeDb.dogs.filter(d => d.id !== id)
    }
}

export const dogsService = new DogsService()