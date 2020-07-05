import axios from 'axios';
const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  try {
    let changebleUrl = url;

    if (country) {
      changebleUrl = `${url}/countries/${country}`;
    }

    const {
      data: { confirmed, recovered, deaths, lastUpdate },
      data
    } =  await axios.get(changebleUrl);
    console.log('BY COUNTRY = ', data);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log('fetchData', error);
    return null;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data }  = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    console.log('dd = ', data);
    return modifiedData;
  } catch (error) {
    console.log('fetchDailyData', error);
    return null;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    }  = await axios.get(`${url}/countries`);
    
    return countries.map((country) => country.name);
  } catch (e) {
    console.log('fetchCountries',e);
  }
};
