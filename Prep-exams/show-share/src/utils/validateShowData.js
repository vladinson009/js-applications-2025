export default function validateShowData(formData) {
  const objectData = Object.fromEntries(formData);
  const arrayData = Object.entries(objectData);

  for (const [name, value] of arrayData) {
    if (value.trim() == '') {
      throw new Error(`${name} is reqired!`);
    }
  }
  return objectData;
}
