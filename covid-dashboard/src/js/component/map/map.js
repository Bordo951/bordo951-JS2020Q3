import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as esri from 'esri-leaflet/dist/esri-leaflet';
import dataGeoCountries from '../../../../public/data/data-geo-countries.json';
import CovidRepository from "../../repositories/covid-repository";

export default class CovidMap {
  constructor(id) {
    this.id = id;
    this.covidRepository = new CovidRepository();
  }

  initMap() {
    const map = L.map('map', {
      center: [30, 80],
      attributionControl: false,
      zoom: 2.5
    });

    map.zoomControl.setPosition('bottomright');
    esri.basemapLayer('DarkGray').addTo(map);

    // Get Countries Data
    const currentDataObject = this.covidRepository.getCountriesData();

    L.geoJSON(dataGeoCountries, {
      style: feature => {
        return {
          fillColor: '#2a2a28',
          color: 'red',
          weight: 0.5
        }
      },
      onEachFeature: (feature, layer) => {
        currentDataObject.then(data => {
          data.forEach((item) => {
            const featureSlug = feature.properties.name.replace(/\s+/g, '-').toLowerCase();
            const dataCountrySlug = item['Slug'].toLowerCase();
            if (featureSlug === dataCountrySlug) {
              const html = `
                <b>${feature.properties.name}</b><br>
                NewConfirmed: ${item['NewConfirmed']}<br>
                TotalConfirmed: ${item['TotalConfirmed']}<br>
                NewRecovered: ${item['NewRecovered']}<br>
                TotalRecovered: ${item['TotalRecovered']}<br>
                NewDeaths: ${item['NewDeaths']}<br>
                TotalDeaths: ${item['TotalDeaths']}
              `
              layer.bindPopup(`${html}`);
            }
          });
        });
      }
    }).addTo(map);
  }
}
