export default (category = "other") => {
  const ICONS = {
    japanese_food: {
      type: "entypo",
      name: "bowl"
    },
    western_food: {
      type: "material",
      name: "restaurant-menu"
    },
    chinese_korean_ethnic: {
      type: "entypo",
      name: "bowl"
    },
    cafe: {
      type: "material",
      name: "free-breakfast"
    },
    snack_fastfood: {
      type: "material community",
      name: "food"
    },
    food_court: {
      type: "material",
      name: "restaurant"
    },
    bar_izakaya: {
      type: "material community",
      name: "food-variant"
    },
    european_food: {
      type: "material",
      name: "restaurant-menu"
    },
    chinese_food: {
      type: "entypo",
      name: "bowl"
    },
    cafe_snack: {
      type: "material community",
      name: "food-croissant"
    },
    travelling_gears: {
      type: "material",
      name: "flight-takeoff"
    },
    convenience_store: {
      type: "material",
      name: "shopping-basket"
    },
    drugstore: {
      type: "material",
      name: "local-pharmacy"
    },
    books: {
      type: "material",
      name: "import-contacts"
    },
    fashion: {
      type: "material community",
      name: "shopping"
    },
    souvenirs: {
      type: "material",
      name: "redeem"
    },
    toys: {
      type: "material community",
      name: "castle"
    },
    general_goods_stationeries: {
      type: "material",
      name: "shopping-cart"
    },
    massage: {
      type: "material",
      name: "spa"
    },
    personal_grooming: {
      type: "material",
      name: "spa"
    },
    convenience_stores: {
      type: "material",
      name: "shopping-basket"
    },
    other: {
      type: "material",
      name: "category"
    },
    other_shop: {
      type: "material",
      name: "attach-money"
    }
  };

  return ICONS[category].name;
};
