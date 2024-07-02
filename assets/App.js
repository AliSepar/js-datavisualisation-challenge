//live table

// getting data from html
let table1 = document.querySelector("#table1");
const headers = Array.from(
  table1.querySelectorAll(
    "tbody>tr:first-child>th:not(:nth-child(0)):not(:nth-child(1))" // will not count 2 first ths
  )
)
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
    countryData[year] = cells[index++]
      ? parseFloat(cells[index].innerText.replace(",", ".")) // with the year as the key and the corresponding cell value (parsed as a float) as the value.
      : null;
  });
  return countryData;
});

// adding chart data to the html
let chartDiv = document.createElement("div");
chartDiv.style = "width:800px; height:500px";

const chartTag = document.createElement("canvas");
// const chartTagId = chartTag.setAttribute("id", "chartTag");
// chartTag.style.overflowY = "scroll";

chartDiv.appendChild(chartTag);
table1.insertAdjacentElement("beforebegin", chartDiv);

const years = headers;
console.log(years);
// Generate datasets for Chart.js
const datasets = years.map((year, index) => ({
  label: year,
  data: data.map((row) => row[year]),
  fill: false,
  backgroundColor: `hsl(${index * 30}, 70%, 50%)`, // Generate colors dynamically
  tension: 0.1,
}));

new Chart(chartTag, {
  type: "bar",
  data: {
    labels: data.map((row) => row.country),
    datasets: datasets,
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  },
});

// second table
const table2 = document.getElementById("table2");
//header2 is the table thead th inner texts
const headers2 = Array.from(table2.querySelectorAll("thead>tr>th"))
  .slice(1)
  .map((th) => th.innerText);

console.log(headers2);

const table2Data = Array.from(table2.querySelectorAll("tbody>tr")).map(
  (row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    let countryData2 = { country: cells[0].innerText };

    headers2.forEach((year, index) => {
      countryData2[year] = cells[index]
        ? parseFloat(cells[index].innerText.replace(",", "."))
        : null;
    });
    return countryData2;
  }
);

// displaying data to html
let chart2Div = document.createElement("div");
chart2Div.style = "width:800px; height:500px";

let chartTag2 = document.createElement("canvas");
chart2Div.appendChild(chartTag2);

// add the div before the table in html
table2.insertAdjacentElement("beforebegin", chart2Div);

const table2years = headers2;

const table2datasets = table2years.map((year, index) => ({
  label: year,
  data: table2Data.map((row) => row[year]),
  fill: false,
  backgroundColor: `hsl(${index * 30}, 70%, 50%)`, // Generate colors dynamically
  tension: 0.1,
}));

new Chart(chartTag2, {
  type: "bar",
  data: {
    labels: table2Data.map((row) => row.country),
    datasets: table2datasets,
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  },
});
