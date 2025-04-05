export default function validateData(formData) {
  const objectData = Object.fromEntries(formData);
  const arrayData = Object.entries(objectData);

  const name = objectData['name-input'];
  const imageUrl = objectData['image-url-input'];
  const year = objectData['year-input'];
  const learnMore = objectData['more-info-textarea'];

  for (const [name, value] of arrayData) {
    if (value.trim() == '') {
      throw new Error(`${name} is reqired!`);
    }
  }
  return { name, imageUrl, year, learnMore };
}
