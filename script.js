function setConversionType(type) {
  const units = getUnits(type);
  populateDropdown("fromUnit", units);
  populateDropdown("toUnit", units);
}

function getUnits(type) {
  const unitsMap = {
    length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Micrometer", "Nanometer", "Mile", "Yard", "Foot", "Inch", "Light Year"],
    temp: ["Celsius", "Kelvin", "Fahrenheit"],
    area: ["Square Meter", "Square Kilometer", "Square Centimeter", "Square Millimeter", "Square Micrometer", "Hectare", "Square Mile", "Square Yard", "Square Foot", "Square Inch", "Acre"],
    volume: ["Cubic Meter", "Cubic Centimeter", "Cubic Millimeter", "Liter", "Milliliter", "US Gallon", "US Quart", "US Cup", "US Fluid Ounce", "US Table Spoon", "US Tea Spoon", "Imperial Gallon", "Imperial Quart", "Imperial Pint", "Imperial Fluid Ounce", "Imperial Table Spoon", "Imperial Tea Spoon", "Cubic Mile", "Cubic Yard", "Cubic Foot", "Cubic Inch"],
    weight: ["Kilogram", "Gram", "Milligram", "Metric Ton", "Long Ton", "Short Ton", "Pound", "Ounce", "Carrat", "Atomic Mass Unit"],
    time: ["Second", "Millisecond", "Microsecond", "Nanosecond", "Picosecond", "Minute", "Hour", "Day", "Week", "Month", "Year"]
  };

  return unitsMap[type] || [];
}

function populateDropdown(id, units) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = "";
  units.forEach(unit => {
    const option = document.createElement("option");
    option.value = unit;
    option.text = unit;
    dropdown.add(option);
  });
}

function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;

  if (isNaN(amount)) {
    alert("Please enter a valid number for amount.");
    return;
  }

  const conversionFactor = getConversionFactor(fromUnit, toUnit);
  if (conversionFactor !== null) {
    const result = amount + " " + fromUnit + " = " + (amount * conversionFactor).toFixed(4) + " " + toUnit;
    document.getElementById("result").innerText = result;
  } else {
    alert("Conversion not supported for selected units.");
  }
}

function getConversionFactor(fromUnit, toUnit) {
  const conversionFactors = {
    // Length
    "Meter": {
      "Kilometer": 0.001,
      "Centimeter": 100,
      "Millimeter": 1000,
      "Micrometer": 1e6,
      "Nanometer": 1e9,
      "Mile": 0.000621371,
      "Yard": 1.09361,
      "Foot": 3.28084,
      "Inch": 39.3701,
      "Light Year": 1.057e-16,
    },
    // Temperature
    "Celsius": {
      "Kelvin": 1.0,
      "Fahrenheit": 33.8,
    },
    // Area
    "Square Meter": {
      "Square Kilometer": 1e-6,
      "Square Centimeter": 1e4,
      "Square Millimeter": 1e6,
      "Square Micrometer": 1e12,
      "Hectare": 1e-4,
      "Square Mile": 3.861e-7,
      "Square Yard": 1.19599,
      "Square Foot": 10.7639,
      "Square Inch": 1550,
      "Acre": 2.47105e-4,
    },
    // Volume
    "Cubic Meter": {
      "Cubic Centimeter": 1e6,
      "Cubic Millimeter": 1e9,
      "Liter": 1000,
      "Milliliter": 1e6,
      "US Gallon": 264.172,
      "US Quart": 1056.69,
      "US Cup": 4166.67,
      "US Fluid Ounce": 33814,
      "US Table Spoon": 67628,
      "US Tea Spoon": 202884,
      "Imperial Gallon": 219.969,
      "Imperial Quart": 879.877,
      "Imperial Pint": 1759.75,
      "Imperial Fluid Ounce": 35195.1,
      "Imperial Table Spoon": 56312.2,
      "Imperial Tea Spoon": 168936,
      "Cubic Mile": 2.39913e-16,
      "Cubic Yard": 1.30795,
      "Cubic Foot": 35.3147,
      "Cubic Inch": 61023.7,
    },
    // Weight
    "Kilogram": {
      "Gram": 1000,
      "Milligram": 1e6,
      "Metric Ton": 0.001,
      "Long Ton": 0.000984207,
      "Short Ton": 0.00110231,
      "Pound": 2.20462,
      "Ounce": 35.274,
      "Carrat": 5000,
      "Atomic Mass Unit": 6.022e+26,
    },
    // Time
    "Second": {
      "Millisecond": 1000,
      "Microsecond": 1e6,
      "Nanosecond": 1e9,
      "Picosecond": 1e12,
      "Minute": 0.0166667,
      "Hour": 0.000277778,
      "Day": 1.15741e-5,
      "Week": 1.65344e-6,
      "Month": 3.80517e-7,
      "Year": 3.171e-8,
    }
  };

  return conversionFactors[fromUnit] ? conversionFactors[fromUnit][toUnit] : null;
}
