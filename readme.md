# Data visualisation with Js 📈

This is a practice project to learn more about JavaScript and it's Third-party libraries for display data.

## Given Objectives

This consolidation challenge will help you assess your ability to solve a problem inspired from real-life situations using your new javascript muscles involving the following know-hows :

- DOM manipulation
- AJAX/FETCH request
- Using Third-party libraries (chart.js, ToastUi-Chart, D3.js - Data-Driven Documents)
- problem-solving : design a logical solution to implement the expected result
- Debugging using the console
- Understand the notion of "separation of concerns"

## Execution

- To display data i have used **chart.js** for this project.
- For the live chart i had to get live data form api i used Fetch Api in js.
- For the second and third chart i had to get data form html tables using DOM and store(in a object), sort them and then create chart with js and add data then display it in html with DOM.

## ScreenShot

| Live Chart                                                 | First Chart                                                  | Second Chart                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| [![LiveTable](images/livetable.png)](images/livetable.png) | [![LiveTable](images/firsttable.png)](images/firsttable.png) | [![LiveTable](images/secondtable.png)](images/secondtable.png) |

## Codes

Here is some code which create element in html with Js DOM and add it to the html

```
let mainChartContainer = document.createElement("div");

let chartDiv = document.createElement("div");
chartDiv.setAttribute("id", "chartDiv");
let chartDivId = document.getElementById("chartDiv");
chartDiv.style = "width:800px; height:700px;overflowX:scroll";

const chartTag = document.createElement("canvas");

chartTag.style.width = "2000px";

chartDiv.appendChild(chartTag);
mainChartContainer.appendChild(chartDiv);
table1.insertAdjacentElement("beforebegin", mainChartContainer);

const years = headers;

// Generate datasets for Chart.js
const datasets = years.map((year, index) => ({
  label: year,
  data: data.map((row) => row[year]),
  fill: false,
  backgroundColor: `hsl(${index * 30}, 70%, 50%)`, // Generate colors dynamically
  tension: 0.1,
  hidden: index !== years.length - 1, // Only the last dataset is not hidden
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
    scaleShowValues: true,
    scales: {
  x: {
    stepSize: 1,
    beginAtZero: true,
  ticks: {
    autoSkip: false,
     },
   },
    },
  },
});

```
