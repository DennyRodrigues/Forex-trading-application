export const parseData = (data: Object) => {
  const response = data.toString(); // Shows the original stringified version
  // JSON.parse not working, Get mid value using string split
  let responseArray = response.split(":");
  return Number(responseArray[responseArray.length - 1].slice(0, -1));
}
