const baseUrl = "http://23.94.117.101:8081/api/v1/media/serve";
export const generateImageLinks = (mediaData) => {
  let images = [];

  mediaData.forEach((data) => {
    if (data.path) {
      images.push(baseUrl + "/" + data.id);
    }
  });
  return images;
};
