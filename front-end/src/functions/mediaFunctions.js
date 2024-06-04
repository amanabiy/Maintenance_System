const baseUrl = "http://23.94.117.101:8081/api/v1/media/serve";
export const generateMediaLinks = (mediaData) => {
  let medias = [];

  mediaData.forEach((data) => {
    if (data.path) {
      medias.push(baseUrl + "/" + data.id);
    }
  });
  return medias;
};
