import axios, { AxiosResponse } from "axios";
import { Options } from "./modules/modules";


const apiKey = "e18ffc8adf733c47e41d9b3bee5ed4d5" ;
export function flickrSearch(query: string, options?:Options) {
  // Vérifiez les valeurs des paramètres
  let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e18ffc8adf733c47e41d9b3bee5ed4d5&format=json&nojsoncallback=1&text=" + query;
  if (options) {
    if (options.size) {
      url += "&size=" + options.size;
    }
    if (options.color) {
      url += "&color=" + options.color;
    }
    if (options.orientation) {
      url += "&orientation=" + options.orientation;
    }
    if (options.safe_search) {
      url += "&safe_search=" + options.safe_search;
    }

    if (options.minDate) {
      const minDateString = options.minDate.toISOString();
      url += "&min_taken_date=" + minDateString;
    }
    if (options.maxDate) {
      const maxDateString = options.maxDate.toISOString();
      url += "&max_taken_date=" + maxDateString;
    }
  }
 
   
  

  // Envoyez la requête
  return axios.get(url).then((response) => {
    if (response.status === 200) {
      // Créez une liste d'images
      const images = [];
      for (const photo of response.data.photos.photo) {
        images.push({
          src: "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg",
          title: photo.title,
          description: photo.description,
          id : photo.id 
        });
      }

      // Renvoyez la liste d'images
      return images;
    } else {
      return [];
    }
  });
}


export function getPhotoDetails(photoId: string): Promise<any> {
  const infoUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;
  const infoPromise = axios.get(infoUrl);

  const commentsUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;
  const commentsPromise = axios.get(commentsUrl);

  const locationUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;
  const locationPromise = axios.get(locationUrl);

  return Promise.all([infoPromise, commentsPromise, locationPromise]).then((responses) => {
    const [infoResponse, commentsResponse, locationResponse] = responses;
    const details = {
      info: infoResponse.status === 200 ? infoResponse.data.photo : {},
      comments: commentsResponse.status === 200 ? commentsResponse.data.comments.comment : [],
      location: locationResponse.status === 200 && locationResponse.data.photo ? locationResponse.data.photo.location : null,
    };
    console.log(details);
    
    return details;
  }).catch(error => {
    console.error('Failed to fetch photo details', error);
    return {}; // Return an empty object in case of error
  });
}