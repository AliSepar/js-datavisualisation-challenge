//live table
let firstValu = [];
let secondValu = [];

function fetchDataAndProcess() {
  fetch("https://canvasjs.com/services/data/datapoints.php", {
    cache: "no-store", // to get new data every time
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      getingData(response); // will set the new data to the function
      // console.log("data form link :" + response);
    })
    .catch(function (err) {
      console.log("error: " + err); // will show ig there is a error
    });
}

function getingData(liveData) {
  // will reset the value (clear the array) to add new data
  firstValu = [];
  secondValu = [];

  // will get the data come from api and set the first element of the array and add it to the new array
  // need to seperat the data for the chart (the first value of nested array is the label and the second is the value for dataset )
  for (let x = 0; x < liveData.length; x++) {
    firstValu.push(liveData[x][0]);
  }

  for (let x = 0; x < liveData.length; x++) {
    secondValu.push(liveData[x][1]);
  }
  // console.log("First values:", firstValu);
  // console.log("Second values:", secondValu);

  // will add the the array to the label  and the data set
  liveChart.data.labels = firstValu;
  liveChart.data.datasets[0].data = secondValu;
  liveChart.update();
}

setInterval(fetchDataAndProcess, 3000); // this will refresh the function and by that the data will be change every time
fetchDataAndProcess(); // show the data for the first time

let mainDiv = document.getElementById("bodyContent");
let liveChartCanva = document.createElement("canvas");
// mainDiv.appendChild(liveChart);
mainDiv.insertAdjacentElement("beforebegin", liveChartCanva);

let liveChart = new Chart(liveChartCanva, {
  type: "line",
  data: {
    labels: firstValu,
    datasets: [
      {
        label: "Live Data",
        data: secondValu,
        borderWidth: 7,
        borderColor: "#36A2EB",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

//
//
//table1
// getting data from html
let table1 = document.querySelector("#table1");
// this will get the first row of the table and get the innerText of each th  which will give you the year of table
const headers = Array.from(
  table1.querySelectorAll(
    "tbody>tr:first-child>th:not(:nth-child(0)):not(:nth-child(1))" // will not count 2 first ths
  )
)
  .slice(1)
  .map((th) => th.innerText);
//   This selects all the <th> elements inside the <thead>, converts them to an array, and maps them to extract their text content. slice(1) is used to skip the first header which is "Year"

const data = Array.from(
  table1.querySelectorAll("tbody tr:not(:first-child)") // This selects all <tr> elements inside the <tbody>, converts them to an array, and maps them to extract td data.
).map((row) => {
  const cells = Array.from(row.querySelectorAll("td")); // cells is an array of all <td> elements in the each row(tr).
  let countryData = { country: cells[0].innerText }; // countryData is an object initialized with the country name from the first cell(td).
  headers.forEach((year, index) => {
    // The headers.forEach loop goes through each header year, and for each year,
    countryData[year] = cells[index++] //it adds a key(year)-value(data) pair to countryData
      ? parseFloat(cells[index].innerText.replace(",", ".")) // with the year as the key and the corresponding cell value (parsed as a float) as the value.
      : null;
  });
  // console.log(countryData);
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
// console.log(years);
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

// console.log(headers2);

const table2Data = Array.from(table2.querySelectorAll("tbody>tr")).map(
  (row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    let countryData2 = {};

    headers2.forEach((data, index) => {
      countryData2[data] = cells[index] ? cells[index].innerText : null;
    });
    return countryData2;
  }
);
console.log(table2Data);

// displaying data to html
let chart2Div = document.createElement("div");
chart2Div.style = "width:800px; height:500px";

let chartTag2 = document.createElement("canvas");
chart2Div.appendChild(chartTag2);

// add the div before the table in html
table2.insertAdjacentElement("beforebegin", chart2Div);

const table2years = headers2;
console.log(table2years);

const table2datasets = table2years.slice(1).map((year, index) => ({
  label: year,
  data: table2Data.map((row) => row[year]),
  fill: false,
  backgroundColor: `hsl(${index * 30}, 70%, 50%)`, // Generate colors dynamically
  tension: 0.1,
}));

new Chart(chartTag2, {
  type: "bar",
  data: {
    labels: table2Data.map((row) => row.Country),
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
