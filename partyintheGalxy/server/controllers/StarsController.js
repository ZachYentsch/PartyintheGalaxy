import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";


export class StarsController extends BaseController {
    constructor() {
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/galaxies', this.getGalaxiesByUserId)
            .use(Auth0Provider)
    }
}