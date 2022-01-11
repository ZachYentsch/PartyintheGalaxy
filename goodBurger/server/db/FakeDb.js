import { generateId } from "../../client/app/Utils/generateId";

export const FakeDb = {
    dogs: [{ id: generateId(), name: 'Larry', age: 1 }, { id: generateId(), name: 'Kona', age: 5 }]

}