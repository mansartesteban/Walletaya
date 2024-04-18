export const normalizeString = (str = "") => {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[\(\)\|\\-_.,;:/!§@\s+%*]/gu, "")
    .toLowerCase();
};

export const search = (searchText = "", items = []) => {
  searchText = searchText.split(" ");
  if (!Array.isArray(searchText)) {
    searchText = [searchText];
  }
  return searchText.length === 0
    ? items
    : items.filter((item) =>
        searchText.every((searchChunk) => {
          if (typeof item === "object") {
            item = Object.values(item).join("");
          } else if (Array.isArray(item)) {
            item = item.join("");
          }
          return normalizeString(item).includes(normalizeString(searchChunk));
        })
      );
};
