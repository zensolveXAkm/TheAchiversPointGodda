const cloudinaryConfig = {
    cloudName: "dqubwzm17",
    apiKey: "379931843428442",
    apiSecret: "cNlUdi7BCOIwqsw6zc9ew-BftnI",
    uploadPreset: "uday-oc",
  };
  
  export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };
  