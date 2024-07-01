// getting data from html

// have to add data to a Object each country object inside it each year with value.
// let table1 = {
//   belgium: {
//     2002: "1012,8",
//     2003: "1007,8"
//     .
//     .
//     .
//   },
// };

// let tbodyData = table1.querySelectorAll("tbody tr");
// console.log(tbodyData[1].children[1].textContent);
// console.log(tbodyData.length);
// for (let row = 0; row < tbodyData.length; row++) {
//   for (let z = 0; z < tbodyData[row].children.length; z++) {
//     console.log(tbodyData[row].children[z].textContent);
//     let dataths = {
//         tbodyData[row].children[z].textContent,
//     };
//     data.push();
//   }
// }

// for (let i = 0; i < 13; i++) {
//   tbodyData.forEach((row) => {
//     // console.log(row.children[i].textContent);
//     let res = {
//       number: row.children[0].textContent,
//       country: row.children[1].textContent,
//       2002: row.children[2].textContent,
//     };
//     console.log(res);
//   });
// }
let table1 = document.querySelector("#table1");
const headers = Array.from(table1.querySelectorAll("tbody>tr:first-child>th"))
  .slice(1)
  .map((th) => th.innerText);
//   This selects all the <th> elements inside the <thead>, converts them to an array, and maps them to extract their text content. slice(1) is used to skip the first header which is "Year"

const data = Array.from(
  table1.querySelectorAll("tbody tr:not(:first-child)") // This selects all <tr> elements inside the <tbody>, converts them to an array, and maps them to extract cell data.
).map((row) => {
  const cells = Array.from(row.querySelectorAll("td")); // cells is an array of all <td> elements in the current row.
  let countryData = { country: cells[0].innerText }; // countryData is an object initialized with the country name from the first cell.
  headers.forEach((year, index) => {
    // The headers.forEach loop goes through each header year, and for each year, it adds a key-value pair to countryData
    countryData[year] = cells[index]
      ? parseFloat(cells[index].innerText.replace(",", ".")) // with the year as the key and the corresponding cell value (parsed as a float) as the value.
      : null;
  });
  return countryData;
});

// console.log(data);

const chartTag = document.createElement("canvas");
const chartTagId = chartTag.setAttribute("id", "chartTag");
chartTag.style.overflowX = "auto";
chartTag.style.border = "3px solid red";

table1.insertAdjacentElement("beforebegin", chartTag);
// const ctx = document.getElementById("myChart");

// console.log(data.map((row) => row.country));

const years = headers;
// Generate datasets for Chart.js
const datasets = years.map((year, index) => ({
  label: year,
  data: data.map((row) => row[year]),
  fill: false,
  backgroundColor: `hsl(${index * 30}, 70%, 50%)`, // Generate colors dynamically
  tension: 0.2,
}));
console.log(datasets);
// const dataset = {
//   labels: data.map((row) => row.country),
//   datasets: [
//     {
//       label: "2002",
//       data: data.map((row) => row["2002"]),
//       fill: false,
//       backgroundColor: "#9BD0F5",
//       tension: 0.1,
//     },
//   ],
// };

new Chart(chartTag, {
  type: "bar",
  data: {
    labels: data.map((row) => row.country),
    datasets: datasets,
  },
  options: {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  },
});
