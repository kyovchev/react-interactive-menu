export function formatPrice(price) {
  let BGN = new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency: "BGN",
  });

  return BGN.format(price);
}
