export const AddCarFields = [
  {
    name: "company",
    type: "select",
    placeholder: "Select Company",
    options: [
      { value: "Toyota", label: "Toyota" },
      { value: "Honda", label: "Honda" },
      { value: "Tata Motors", label: "Tata" },
      { value: "Mahindra", label: "Mahindra" },
      { value: "Maruti Suzuki", label: "Maruti Suzuki" },
      { value: "Hyundai", label: "Hyundai" },
      { value: "Skoda", label: "Skoda" },
      { value: "Kia", label: "Kia" },
      { value: "Ford", label: "Ford" },
      { value: "Volkswagen", label: "Volkswagen" },
    ],
  },
  {
    name: "modelName",
    type: "select",
    placeholder: "Select Model",
    options: [
      {
        name: "modelName",
        type: "select",
        placeholder: "Select Model",
        options: [
          // Toyota Models
          { value: "Fortuner", label: "Fortuner" },
          { value: "Innova Crysta", label: "Innova Crysta" },
          { value: "Glanza", label: "Glanza" },
          // Honda Models
          { value: "City", label: "City" },
          { value: "Amaze", label: "Amaze" },
          { value: "Jazz", label: "Jazz" },
          // Tata Motors Models
          { value: "Nexon", label: "Nexon" },
          { value: "Harrier", label: "Harrier" },
          { value: "Altroz", label: "Altroz" },
          // Mahindra Models
          { value: "Scorpio", label: "Scorpio" },
          { value: "Thar", label: "Thar" },
          { value: "XUV700", label: "XUV700" },
          // Maruti Suzuki Models
          { value: "Swift", label: "Swift" },
          { value: "Baleno", label: "Baleno" },
          { value: "Ertiga", label: "Ertiga" },
          // Hyundai Models
          { value: "Creta", label: "Creta" },
          { value: "Venue", label: "Venue" },
          { value: "i20", label: "i20" },
          // Skoda Models
          { value: "Rapid", label: "Rapid" },
          { value: "Kushaq", label: "Kushaq" },
          { value: "Octavia", label: "Octavia" },
          // Kia Models
          { value: "Seltos", label: "Seltos" },
          { value: "Sonet", label: "Sonet" },
          { value: "Carnival", label: "Carnival" },
          // Ford Models
          { value: "EcoSport", label: "EcoSport" },
          { value: "Endeavour", label: "Endeavour" },
          { value: "Figo", label: "Figo" },
          // Volkswagen Models
          { value: "Polo", label: "Polo" },
          { value: "Vento", label: "Vento" },
          { value: "Tiguan", label: "Tiguan" },
        ],
      },
    ],
  },
  { name: "variant", type: "text", placeholder: "Enter Variant" },
  {
    name: "type",
    type: "select",
    placeholder: "Select Type",
    options: [
      { value: "Compact SUV", label: "Compact SUV" },
      { value: "Coupe", label: "Coupe" },
      { value: "Crossover Suv", label: "Crossover Suv" },
      { value: "Hatchback", label: "Hatchback" },
      { value: "Pickup", label: "Pickup" },
      { value: "Sedan", label: "Sedan" },
      { value: "SUV", label: "SUV" },
      { value: "Van", label: "Van" },
    ],
  },
  {
    name: "yearOfManufacture",
    type: "month",
    placeholder: "Select Year of Manufacture",
  },
  {
    name: "registrationDate",
    type: "date",
    placeholder: "Select Registration Date",
  },
  { name: "numberPlate", type: "text", placeholder: "Enter Number Plate" },
  { name: "price", type: "number", placeholder: "Enter Price" },
  {
    name: "color",
    type: "select",
    placeholder: "Select Color",
    options: [
      { value: "Red", label: "Red" },
      { value: "Blue", label: "Blue" },
      { value: "Black", label: "Black" },
      { value: "White", label: "White" },
      { value: "Silver", label: "Silver" },
      { value: "Gray", label: "Gray" },
      { value: "Green", label: "Green" },
      { value: "Yellow", label: "Yellow" },
      { value: "Orange", label: "Orange" },
    ],
  },
  {
    name: "transmission",
    type: "select",
    placeholder: "Select Transmission",
    options: [
      { value: "Manual", label: "Manual" },
      { value: "Automatic", label: "Automatic" },
      { value: "Paddle Shift", label: "Paddle Shift" },
    ],
  },
  {
    name: "fuelType",
    type: "select",
    placeholder: "Select Fuel Type",
    options: [
      { value: "Petrol", label: "Petrol" },
      { value: "Diesel", label: "Diesel" },
      { value: "Electric", label: "Electric" },
      { value: "CNG", label: "CNG" },
    ],
  },
  {
    name: "cubicCapacity",
    type: "number",
    placeholder: "Enter Cubic Capacity",
  },
  { name: "mileage", type: "number", placeholder: "Enter Mileage" },
  { name: "kmDriven", type: "number", placeholder: "Enter Kilometers Driven" },
  {
    name: "airConditioner",
    type: "select",
    placeholder: "Select Air Conditioner",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    name: "powerWindow",
    type: "select",
    placeholder: "Select Power Window",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    name: "ownerType",
    type: "select",
    placeholder: "Select Owner Type",
    options: [
      { value: "First Owner", label: "First Owner" },
      { value: "Second Owner", label: "Second Owner" },
      { value: "Third Owner", label: "Third Owner" },
    ],
  },
  {
    name: "insurance",
    type: "select",
    placeholder: "Select Insurance",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  // { name: "insuranceValidity", type: "date", placeholder: "Enter Insurance Validity Date" },
];

export const AddBikeFields = [
  {
    name: "company",
    type: "select",
    placeholder: "Select Company",
    options: [
      { value: "Bajaj", label: "Bajaj" },
      { value: "Hero", label: "Hero" },
      { value: "Honda", label: "Honda" },
      { value: "Royal Enfield", label: "Royal Enfield" },
      { value: "TVS", label: "TVS" },
      { value: "Yamaha", label: "Yamaha" },
      { value: "Suzuki", label: "Suzuki" },
      { value: "KTM", label: "KTM" },
      { value: "Mahindra", label: "Mahindra" },
      { value: "Jawa", label: "Jawa" },
    ],
  },
  {
    name: "modelName",
    type: "select",
    placeholder: "Select Model",
    options: [
      // Bajaj Models
      { value: "Pulsar", label: "Pulsar" },
      { value: "Dominar", label: "Dominar" },
      { value: "Avenger", label: "Avenger" },
      // Hero Models
      { value: "Splendor", label: "Splendor" },
      { value: "Glamour", label: "Glamour" },
      { value: "Xtreme", label: "Xtreme" },
      // Honda Models
      { value: "CB Shine", label: "CB Shine" },
      { value: "Unicorn", label: "Unicorn" },
      { value: "Hornet", label: "Hornet" },
      // Royal Enfield Models
      { value: "Classic 350", label: "Classic 350" },
      { value: "Bullet 350", label: "Bullet 350" },
      { value: "Meteor 350", label: "Meteor 350" },
      // TVS Models
      { value: "Apache", label: "Apache" },
      { value: "Jupiter", label: "Jupiter" },
      { value: "Star City", label: "Star City" },
      // Yamaha Models
      { value: "FZ", label: "FZ" },
      { value: "R15", label: "R15" },
      { value: "Fascino", label: "Fascino" },
      // Suzuki Models
      { value: "Gixxer", label: "Gixxer" },
      { value: "Access", label: "Access" },
      { value: "Intruder", label: "Intruder" },
      // KTM Models
      { value: "Duke", label: "Duke" },
      { value: "RC", label: "RC" },
      { value: "Adventure", label: "Adventure" },
      // Mahindra Models
      { value: "Mojo", label: "Mojo" },
      { value: "Centuro", label: "Centuro" },
      { value: "Gusto", label: "Gusto" },
      // Jawa Models
      { value: "Jawa 42", label: "Jawa 42" },
      { value: "Perak", label: "Perak" },
      { value: "Jawa", label: "Jawa" },
    ],
  },
  { name: "variant", type: "text", placeholder: "Enter Variant" },
  {
    name: "yearOfManufacture",
    type: "month",
    placeholder: "Select Year of Manufacture",
  },
  {
    name: "registrationDate",
    type: "date",
    placeholder: "Select Registration Date",
  },
  { name: "numberPlate", type: "text", placeholder: "Enter Number Plate" },
  { name: "price", type: "number", placeholder: "Enter Price" },
  {
    name: "color",
    type: "select",
    placeholder: "Select Color",
    options: [
      { value: "Red", label: "Red" },
      { value: "Blue", label: "Blue" },
      { value: "Black", label: "Black" },
      { value: "White", label: "White" },
      { value: "Silver", label: "Silver" },
      { value: "Gray", label: "Gray" },
      { value: "Green", label: "Green" },
      { value: "Yellow", label: "Yellow" },
      { value: "Orange", label: "Orange" },
    ],
  },
  {
    name: "fuelType",
    type: "select",
    placeholder: "Select Fuel Type",
    options: [
      { value: "Petrol", label: "Petrol" },
      { value: "Electric", label: "Electric" },
    ],
  },
  {
    name: "cubicCapacity",
    type: "number",
    placeholder: "Enter Cubic Capacity",
  },
  { name: "mileage", type: "number", placeholder: "Enter Mileage" },
  { name: "kmDriven", type: "number", placeholder: "Enter Kilometers Driven" },
  {
    name: "ownerType",
    type: "select",
    placeholder: "Select Owner Type",
    options: [
      { value: "First Owner", label: "First Owner" },
      { value: "Second Owner", label: "Second Owner" },
      { value: "Third Owner", label: "Third Owner" },
    ],
  },
  {
    name: "insurance",
    type: "select",
    placeholder: "Select Insurance",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
];

export const carFilter = [
  {
    name: "company",
    type: "select",
    placeholder: "Company",
    options: [
      { value: "Ford", label: "Ford" },
      { value: "Honda", label: "Honda" },
      { value: "Hyundai", label: "Hyundai" },
      { value: "Kia", label: "Kia" },
      { value: "Mahindra", label: "Mahindra" },
      { value: "Maruti Suzuki", label: "Maruti Suzuki" },
      { value: "Skoda", label: "Skoda" },
      { value: "Tata Motors", label: "Tata" },
      { value: "Toyota", label: "Toyota" },
      { value: "Volkswagen", label: "Volkswagen" },
    ],
  },
  {
    name: "modelName",
    type: "select",
    placeholder: "Car Model",
    options: [
      { value: "Renault Kwid", label: "Renault Kwid" },
      { value: "Datsun Redi-GO", label: "Datsun Redi-GO" },
      { value: "Maruti Suzuki S-Presso", label: "Maruti Suzuki S-Presso" },
    ],
  },
  {
    name: "modelYear",
    type: "select",
    placeholder: "Model Year",
    options: [
      { value: "2022 - 2024", label: "2022 - 2024" },
      { value: "2019 - 2021", label: "2019 - 2021" },
      { value: "2016 - 2018", label: "2016 - 2018" },
      { value: "2013 - 2015", label: "2013 - 2015" },
      { value: "Before - 2013", label: "Before - 2013" },
    ],
  },
];

export const bikeFilter = [
  {
    name: "company",
    type: "select",
    placeholder: "Company",
    options: [
      { value: "Bajaj", label: "Bajaj" },
      { value: "Hero", label: "Hero" },
      { value: "Honda", label: "Honda" },
      { value: "Royal Enfield", label: "Royal Enfield" },
      { value: "TVS", label: "TVS" },
      { value: "Yamaha", label: "Yamaha" },
      { value: "Suzuki", label: "Suzuki" },
      { value: "KTM", label: "KTM" },
      { value: "Mahindra", label: "Mahindra" },
      { value: "Jawa", label: "Jawa" },
    ],
  },
  {
    name: "modelName",
    type: "select",
    placeholder: "Bike Model",
    options: [
      // Bajaj Models
      { value: "Pulsar", label: "Pulsar" },
      { value: "Dominar", label: "Dominar" },
      { value: "Avenger", label: "Avenger" },
      // Hero Models
      { value: "Splendor", label: "Splendor" },
      { value: "Glamour", label: "Glamour" },
      { value: "Xtreme", label: "Xtreme" },
      // Honda Models
      { value: "CB Shine", label: "CB Shine" },
      { value: "Unicorn", label: "Unicorn" },
      { value: "Hornet", label: "Hornet" },
      // Royal Enfield Models
      { value: "Classic 350", label: "Classic 350" },
      { value: "Bullet 350", label: "Bullet 350" },
      { value: "Meteor 350", label: "Meteor 350" },
      // TVS Models
      { value: "Apache", label: "Apache" },
      { value: "Jupiter", label: "Jupiter" },
      { value: "Star City", label: "Star City" },
      // Yamaha Models
      { value: "FZ", label: "FZ" },
      { value: "R15", label: "R15" },
      { value: "Fascino", label: "Fascino" },
      // Suzuki Models
      { value: "Gixxer", label: "Gixxer" },
      { value: "Access", label: "Access" },
      { value: "Intruder", label: "Intruder" },
      // KTM Models
      { value: "Duke", label: "Duke" },
      { value: "RC", label: "RC" },
      { value: "Adventure", label: "Adventure" },
      // Mahindra Models
      { value: "Mojo", label: "Mojo" },
      { value: "Centuro", label: "Centuro" },
      { value: "Gusto", label: "Gusto" },
      // Jawa Models
      { value: "Jawa 42", label: "Jawa 42" },
      { value: "Perak", label: "Perak" },
      { value: "Jawa", label: "Jawa" },
    ],
  },
  {
    name: "modelYear",
    type: "select",
    placeholder: "Model Year",
    options: [
      { value: "2022 - 2024", label: "2022 - 2024" },
      { value: "2019 - 2021", label: "2019 - 2021" },
      { value: "2016 - 2018", label: "2016 - 2018" },
      { value: "2013 - 2015", label: "2013 - 2015" },
      { value: "Before - 2013", label: "Before - 2013" },
    ],
  },
];

export const bikeDrawerFilters = [
  {
    filterName: "company",
    label: "company",
    filters: [
      "Bajaj",
      "Hero",
      "Honda",
      "Royal Enfield",
      "TVS",
      "Yamaha",
      "Suzuki",
      "KTM",
      "Mahindra",
      "Jawa",
    ],
  },
  {
    filterName: "modelYear",
    label: "Model Year",
    filters: [
      "2022 - 2024",
      "2019 - 2021",
      "2016 - 2018",
      "2013 - 2015",
      "Before - 2013",
    ],
  },
  {
    filterName: "color",
    label: "color",
    filters: [
      "Red",
      "Blue",
      "Black",
      "White",
      "Silver",
      "Gray",
      "Green",
      "Yellow",
      "Orange",
    ],
  },
];

export const carDrawerFilters = [
  {
    filterName: "company",
    label: "company",
    filters: [
      "Ford",
      "Honda",
      "Hyundai",
      "Kia",
      "Mahindra",
      "Skoda",
      "Suzuki",
      "Tata Motors",
      "Toyota",
      "Volkswagen",
    ],
  },
  {
    filterName: "modelYear",
    label: "Model Year",
    filters: [
      "2022 - 2024",
      "2019 - 2021",
      "2016 - 2018",
      "2013 - 2015",
      "Before - 2013",
    ],
  },
  {
    filterName: "color",
    label: "color",
    filters: [
      "Red",
      "Blue",
      "Black",
      "White",
      "Silver",
      "Gray",
      "Green",
      "Yellow",
      "Orange",
    ],
  },
  {
    filterName: "transmission",
    label: "transmission",
    filters: ["Manual", "Automatic"],
  },
  {
    filterName: "carType",
    label: "Car Type",
    filters: [
      "Compact SUV",
      "Coupe",
      "Crossover SUV",
      "Hatchback",
      "Pickup",
      "Sedan",
      "SUV",
      "Van",
    ],
  },
];
