const generateImageLink = (byte, mimetype) => {
  const str = byte.toString("base64");
  return `data:${mimetype};base64,${str}`;
};

module.exports = generateImageLink;
