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

export const handleFileChange = (
  event,
  files,
  base64Files,
  setFiles,
  setBase64Files
) => {
  const newFiles = Array.from(event.target.files);

  const readerPromises = newFiles.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  });

  Promise.all(readerPromises)
    .then((newBase64Files) => {
      setFiles([...files, ...newFiles]);
      setBase64Files([...base64Files, ...newBase64Files]);
    })
    .catch((error) => console.error("Error reading files:", error));
};
