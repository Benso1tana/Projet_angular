import axios, { AxiosResponse } from 'axios';

export async function flickrSearch(query: string): Promise<Array<{
  src: string;
  title: string;
  description: string;
}>> {
  // API owner: Antony Phonesavanh. Contact him if you have problems with it
  const apiKey = "bf98526849af7087241c03e24fe66711";
  let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&format=json&nojsoncallback=1";
  if (query) {
    url += "&text=" + query;
  }

  try {
    // Send the Flickr request using async/await with Axios
    const response: AxiosResponse = await axios.get(url);

    // Handle the results of the request
    if (response.status === 200) {
      // Create a list of images
      const images: Array<{
        src: string;
        title: string;
        description: string;
      }> = [];

      for (const photo of response.data.photos.photo) {
        const img = {
          src: "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg",
          title: photo.title,
          description: photo.description,
        };

        images.push(img);
      }

      // Return the list of images directly (not inside a Promise)
      return images;
    } else {
      // Return an empty array in case of an error
      return [];
    }
  } catch (error) {
    // Handle any errors that might occur during the asynchronous operations
    console.error('Error fetching search data:', error);

    // Return an empty array in case of an error
    return [];
  }
}
