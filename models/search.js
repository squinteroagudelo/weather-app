const fs = require("fs");

const axios = require("axios");

class Search {
    history = [];
    dbPath = "./db/database.json";

    constructor() {
        // TODO: read db --IF EXISTS
        this.readDB();
    }

    get capitalizedHistory() {
        return this.history.map((city) => {
            return city.replace(
                /\w\S*/g,
                (e) =>
                `${e.charAt(0).toUpperCase()}${e.substr(1).toLowerCase()}`
            );
        });
    }

    get paramsMapBox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            language: "es",
            limit: 5,
            types: [
                "country",
                "region",
                "address",
                "place",
                "locality",
                "district",
            ],
        };
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: "metric",
            lang: "es",
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

            return resp.data.features.map((place) => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
        } catch (err) {
            return [];
        }
    }

    async weatherCity(lat, lon) {
        try {
            // HTTP request

            const instance = axios.create({
                baseURL: "https://api.openweathermap.org/data/2.5/weather",
                params: {...this.paramsOpenWeather, lat, lon },
            });

            const resp = await instance.get();

            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                max: main.temp_max,
                min: main.temp_min,
            };
        } catch (err) {
            return [];
        }
    }

    addHistory(city) {
        if (!this.history.includes(city)) {
            this.history.unshift(city);
        }

        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history,
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
        const data = JSON.parse(info);

        this.history = data.history;
    }
}

module.exports = Search;