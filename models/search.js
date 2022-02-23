const axios = require("axios");

class Search {
    constructor() {
        // TODO: read db --IF EXISTS
    }

    get paramsMapBox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            language: "es",
            limit: 7,
        };
    }

    async searchCity(city) {
        try {
            // HTTP request

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapBox,
            });

            const resp = await instance.get();
            return resp.data; // list of matching cities
        } catch (err) {
            return [];
        }
    }
}

module.exports = Search;