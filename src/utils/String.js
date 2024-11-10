export const normalizeString = (str = "") => {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[\(\)\|\\-_.,;:/!§@\s+%*]/gu, "")
    .toLowerCase()
}

export const search = (searchText = "", items = []) => {
  searchText = searchText.split(" ")
  if (!Array.isArray(searchText)) {
    searchText = [searchText]
  }
  return searchText.length === 0
    ? items
    : items.filter((item) =>
      searchText.every((searchChunk) => {
        if (typeof item === "object") {
          item = Object.values(item).join("")
        } else if (Array.isArray(item)) {
          item = item.join("")
        }
        return normalizeString(item).includes(normalizeString(searchChunk))
      })
    )
}

export const formatNumber = (n, format = "space-coma", decimalCount = 4) => {
  let [integer, floating] = n.toString().split(".")

  integer = integer
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .reverse()
    .map(a => [...a].reverse().join(""))

  let formats = {
    "space-coma": [" ", ","],
    "space-dot": [" ", "."],
    "dot-coma": [".", ","],
    "coma-dot": [",", "."],
  }
  const [thousandSeparator, decimalSeparator] = formats[format || "space-coma"]
  return [integer.join(thousandSeparator), floating?.substr(0, decimalCount)]
    .filter(Boolean)
    .join(decimalSeparator)
}
