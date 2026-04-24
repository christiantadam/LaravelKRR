numeral.register("locale", "id", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
  abbreviations: {
    thousand: "rb",
    million: "jt",
    billion: "m",
    trillion: "t",
  },
  ordinal: function () {
    return "";
  },
  currency: {
    symbol: "Rp",
  },
});
