import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const PER_PAGE = 12;

const getImages = async (query, page) => {
  const params = new URLSearchParams({
    key: '37647312-75763e51f9f1f1c0faecc27a9',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
    page: page,
  });

  const imageList = await axios(`?q=${query}&${params}`);
  return imageList.data;
};

export { getImages, PER_PAGE };
