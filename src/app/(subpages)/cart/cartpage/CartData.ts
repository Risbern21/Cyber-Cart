// Websites:

// - https://github.com/pmndrs/gltfjsx (GLTF JSX for 3D Models)
// - https://lucide.dev/icons/ (Lucide Icons)
// - https://github.com/anuraghazra/github-readme-stats (Github Readme Stats)
// - https://skillicons.dev (Skill Icons to show skills)
// - https://github-readme-streak-stats.herokuapp.com (Github Readme Streak Stats)

type card = {
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
  quantity: number;
};

export const cartProducts: card[] = [
  {
    productName: "AK-900 Wired keyboard",
    productImage:
      "https://media.wired.com/photos/65b0438c22aa647640de5c75/master/w_2560%2Cc_limit/Mechanical-Keyboard-Guide-Gear-GettyImages-1313504623.jpg",
    productPrice: 120,
    quantity: 5,
    discount: 40,
  },
  {
    productName: "Asus Monitor",
    productImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmWW35MyZmSDDOXLOJfYSW04hVl015TTnsQ&s",
    productPrice: 120,
    quantity: 5,
    discount: 40,
  },
];
