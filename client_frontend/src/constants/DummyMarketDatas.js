import grocerryShop from "../assets/grocerry_shop.png";
import produceone from "../assets/produce1.jpg";
import producetwo from "../assets/produce2.jpg";
import seafoodone from "../assets/seafoodone.jpg";
import seafoodtwo from "../assets/seafoodtwo.jpg";

import chickenone from "../assets/chicken1.jpg";
import chickentwo from "../assets/chicken2.jpg";
import porkone from "../assets/pork1.jpg";
import porktwo from "../assets/pork2.jpg";
import beafone from "../assets/beaf2.jpg";
import beaftwo from "../assets/beaf1.jpg";
import paperone from "../assets/paper1.jpg";
import papertwo from "../assets/paper2.jpg";
import dairyone from "../assets/dairy1.jpg";
import dairytwo from "../assets/dairy2.jpg";
import bevaragesone from "../assets/bevarages1.jpg";
import bevaragestwo from "../assets/bevarages2.jpg";
import cleaningone from "../assets/cleaning1.jpg";
import cleaningtwo from "../assets/cleaning2.jpeg";
import merchone from "../assets/merch1.jpg";
import merchtwo from "../assets/merch2.webp";

const marketDummyData = [
  {
    id: 1,
    name: "Fresh Dairy Co.",
    bannerImage: {
      secure_url: dairyone,
    },
    category: ["Dairy"],
    rating: { rate: 4.7, ratedBy: 300 },
    recentyEnquiredBy: 20,
    email: "freshdairy@gmail.com",
    phoneNumber: "+919641131615",
  },
  {
    id: 2,
    name: "Dairy Delight",
    bannerImage: {
      secure_url: dairytwo,
    },
    category: ["Dairy"],
    rating: { rate: 4.5, ratedBy: 250 },
    recentyEnquiredBy: 18,
    email: "dairydelight@gmail.com",
    phoneNumber: "+919812345678",
  },
  {
    id: 3,
    name: "Prime Beef Suppliers",
    bannerImage: {
      secure_url: beafone,
    },
    category: ["Beef"],
    rating: { rate: 4.8, ratedBy: 350 },
    recentyEnquiredBy: 18,
    email: "primebeef@gmail.com",
    phoneNumber: "+919876543210",
  },
  {
    id: 4,
    name: "Beef Masters",
    bannerImage: {
      secure_url: beaftwo,
    },
    category: ["Beef"],
    rating: { rate: 4.7, ratedBy: 300 },
    recentyEnquiredBy: 22,
    email: "beefmasters@gmail.com",
    phoneNumber: "+919856789123",
  },
  {
    id: 5,
    name: "Bubbly Beverages Ltd.",
    bannerImage: {
      secure_url: bevaragesone,
    },
    category: ["Beverages"],
    rating: { rate: 4.5, ratedBy: 400 },
    recentyEnquiredBy: 25,
    email: "bubblybeverages@gmail.com",
    phoneNumber: "+919123456789",
  },
  {
    id: 6,
    name: "Thirst Quenchers",
    bannerImage: {
      secure_url: bevaragestwo,
    },
    category: ["Beverages"],
    rating: { rate: 4.6, ratedBy: 370 },
    recentyEnquiredBy: 24,
    email: "thirstquenchers@gmail.com",
    phoneNumber: "+919912345678",
  },
  {
    id: 7,
    name: "Porky's Pork Farms",
    bannerImage: {
      secure_url: porkone,
    },
    category: ["Pork"],
    rating: { rate: 4.6, ratedBy: 280 },
    recentyEnquiredBy: 16,
    email: "porkys@gmail.com",
    phoneNumber: "+919872345678",
  },
  {
    id: 8,
    name: "Premium Pork Providers",
    bannerImage: {
      secure_url: porktwo,
    },
    category: ["Pork"],
    rating: { rate: 4.5, ratedBy: 260 },
    recentyEnquiredBy: 15,
    email: "premiumpork@gmail.com",
    phoneNumber: "+919874563210",
  },
  {
    id: 9,
    name: "Cluck Cluck Chicken Co.",
    bannerImage: {
      secure_url: chickenone,
    },
    category: ["Chicken"],
    rating: { rate: 4.7, ratedBy: 220 },
    recentyEnquiredBy: 22,
    email: "cluckcluck@gmail.com",
    phoneNumber: "+919876543212",
  },
  {
    id: 10,
    name: "Farm Fresh Chicken",
    bannerImage: {
      secure_url: chickentwo,
    },
    category: ["Chicken"],
    rating: { rate: 4.6, ratedBy: 210 },
    recentyEnquiredBy: 20,
    email: "farmfreshchicken@gmail.com",
    phoneNumber: "+919823456789",
  },
  {
    id: 11,
    name: "Ocean Fresh Seafood",
    bannerImage: {
      secure_url: seafoodone,
    },
    category: ["Seafood"],
    rating: { rate: 4.9, ratedBy: 500 },
    recentyEnquiredBy: 35,
    email: "oceanfresh@gmail.com",
    phoneNumber: "+919856784321",
  },
  {
    id: 12,
    name: "Seaside Seafood Suppliers",
    bannerImage: {
      secure_url: seafoodtwo,
    },
    category: ["Seafood"],
    rating: { rate: 4.8, ratedBy: 470 },
    recentyEnquiredBy: 30,
    email: "seasideseafood@gmail.com",
    phoneNumber: "+919856987654",
  },
  {
    id: 13,
    name: "Harvest Produce Supplies",
    bannerImage: {
      secure_url: produceone,
    },
    category: ["Produce"],
    rating: { rate: 4.6, ratedBy: 340 },
    recentyEnquiredBy: 30,
    email: "harvestproduce@gmail.com",
    phoneNumber: "+919234567890",
  },
  {
    id: 14,
    name: "Green Valley Produce",
    bannerImage: {
      secure_url: producetwo,
    },
    category: ["Produce"],
    rating: { rate: 4.5, ratedBy: 320 },
    recentyEnquiredBy: 28,
    email: "greenvalleyproduce@gmail.com",
    phoneNumber: "+919234987654",
  },
  {
    id: 15,
    name: "Eco Paper Goods",
    bannerImage: {
      secure_url: paperone,
    },
    category: ["Paper Goods"],
    rating: { rate: 4.4, ratedBy: 190 },
    recentyEnquiredBy: 14,
    email: "ecopaper@gmail.com",
    phoneNumber: "+919198765432",
  },
  {
    id: 16,
    name: "Sustainable Paper Products",
    bannerImage: {
      secure_url: papertwo,
    },
    category: ["Paper Goods"],
    rating: { rate: 4.3, ratedBy: 180 },
    recentyEnquiredBy: 13,
    email: "sustainablepaper@gmail.com",
    phoneNumber: "+919178543219",
  },
  {
    id: 17,
    name: "CleanPro Supplies",
    bannerImage: {
      secure_url: cleaningone,
    },
    category: ["Cleaning Supplies"],
    rating: { rate: 4.7, ratedBy: 220 },
    recentyEnquiredBy: 20,
    email: "cleanpro@gmail.com",
    phoneNumber: "+919876543222",
  },
  {
    id: 18,
    name: "PureClean Solutions",
    bannerImage: {
      secure_url: cleaningtwo,
    },
    category: ["Cleaning Supplies"],
    rating: { rate: 4.6, ratedBy: 210 },
    recentyEnquiredBy: 18,
    email: "pureclean@gmail.com",
    phoneNumber: "+919856789234",
  },
  {
    id: 19,
    name: "Merch Kings",
    bannerImage: {
      secure_url: merchone,
    },
    category: ["Merch"],
    rating: { rate: 4.8, ratedBy: 260 },
    recentyEnquiredBy: 28,
    email: "merchkings@gmail.com",
    phoneNumber: "+919876543213",
  },
  {
    id: 20,
    name: "Global Merch Hub",
    bannerImage: {
      secure_url: merchtwo,
    },
    category: ["Merch"],
    rating: { rate: 4.7, ratedBy: 240 },
    recentyEnquiredBy: 26,
    email: "globalmerch@gmail.com",
    phoneNumber: "+919876543214",
  },
];

// Fisher-Yates Shuffle to mix the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mix the marketDummyData array
export const mixedMarketDummyData = shuffleArray([...marketDummyData]);
