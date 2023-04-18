import { fetchCurrentLocation } from "./bingSlice.jsx";

const API_URL = "https://dev.virtualearth.net/REST/v1/";
const API_KEY = `key=${import.meta.env.VITE_Bing_Api_Key}`;


export const generateUrl = (method, params) => {
  switch (method) {
    case "addrByString": {
      const { city, streetNumber, street, currentCoords } = params;
      const URL_END = currentCoords?`userLocation=${currentCoords}&${API_KEY}`:`${API_KEY}`
      const url = `${API_URL}Locations?countryRegion=israel&locality=${city}&addressLine=${streetNumber}-${street}-street&maxResults=1&${URL_END}`;
      
      return url;
    }

    case "addrByCoords": {
      const coords = params;
      const url = `${API_URL}Locations/${coords}?includeEntityTypes=address&includeNeighborhood=1&${API_KEY}`;
      return url;
    }
    case "routeInfo": {
      const { start, end } = params;
      const url = `${API_URL}Routes?wayPoint.1=${start}&waypoint.2=${end}&optimize=timeWithTraffic&maxSolutions=1&routeAttributes=routeSummariesOnly&${API_KEY}`;
      return url;
    }
    case "routeInfoVia": {
      const { start,via, end } = params;
      const url = `${API_URL}Routes?wayPoint.1=${start}&viaWaypoint.2=${via}&waypoint.3=${end}&optimize=timeWithTraffic&maxSolutions=1&routeAttributes=routeSummariesOnly&${API_KEY}`;
      return url;
    }
    default: {
      return `${method} or [${params}] are incorrect`;
    }
  }
};
