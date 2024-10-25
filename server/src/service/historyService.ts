import fs from 'fs';
import * as path from 'path';//Added my Matt after migration
import { fileURLToPath } from 'url'//Added by Matt after migration

// TODO: Define a City class with name and id properties
 class City {
    name: string;
    id: string;
    constructor(name: string, id: string) {
      this.name = name;
      this.id = id;
    }
  }
 
// Get the current file path and directory //Added by Matt after migration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
  // Define the path to searchHistory.json
  const searchHistoryPath = path.resolve(__dirname, '../../db/searchHistory.json');
  
  // Example of reading the file
  fs.readFile(searchHistoryPath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading searchHistory.json:', err);
          return;
      }
      console.log('File data:', data);
  });
 //End added by Matt after migration 
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const data = await fs.promises.readFile('../server/db/searchHistory.json', 'utf-8');
    return JSON.parse(data);
   
  }
  
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    private async write(cities: City[]) { 
      await fs.promises.writeFile('../server/db/searchHistory.json', JSON.stringify(cities));
    }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  public async getCities() {
    const cities = await this.read();
    return cities.map((city: City) => new City(city.name, city.id));
  }


  // TODO Define an addCity method that adds a city to the searchHistory.json file
  public async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(city, cities.length.toString());
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  public async removeCity(id: string) {
    const cities = await this.getCities();
    const newCities = cities.filter((city: City) => city.id !== id);
    await this.write(newCities);
  }
  // my TODO: define getHistory() weatherRoutes.ts
  public async getHistory() {
    // Implementation for retrieving history
    return this.getCities(); // Example return value
  }

}

export default new HistoryService();
