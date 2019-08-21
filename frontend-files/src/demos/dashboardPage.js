

export const chartjs = {
  
  bar: {
    data: {
      labels: [],
      datasets: [
        {
          label: 'Price',
          backgroundColor: '#6a82fb',
          data: [],
        }
      ],

    },
  },
  
  line: {
    data: {
      labels: [],
      datasets: [
        {
          label: 'Revenue for this year',
          borderColor: '#6a82fb',
          backgroundColor: '#6a82fb',
          data: [],
        }
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart - Stacked Area',
      },
      tooltips: {
        intersect: false,
        mode: 'nearest',
      },
      hover: {
        mode: 'index',
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: false,
              labelString: 'Month',
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: 'Value',
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  },
};

function parseData(data,i,j) {

  let newData = chartjs.bar.data.labels.slice() //copy the array
  newData[j] = data.cryptocurrenciesList[i].name //execute the manipulations
  chartjs.bar.data.labels = newData //set the new state

  newData = chartjs.bar.data.datasets[0].data.slice() //copy the array
  newData[j] = parseFloat(data.cryptocurrenciesList[i].price) //execute the manipulations
  chartjs.bar.data.datasets[0].data = newData //set the new state
}

export function getData(top_stock) {
  
  fetch('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+top_stock+'&apikey=HWD38M52HGVY67RN').then(results => {
      return results.json();
    }).then(data => {
      let info = data["Monthly Time Series"]
      
      for (let i=0;i<12;i++){
        let date = Object.keys(info)[i]
        chartjs.line.data.datasets[0].data[i] = parseFloat(info[date]["4. close"])
      }
      chartjs.line.data.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December']
    })

    fetch('https://financialmodelingprep.com/api/v3/cryptocurrencies').then(results => {
      return results.json();
    }).then(data => {
      parseData(data,0,0);
      parseData(data,1,1);
      parseData(data,3,2);
      parseData(data,5,3);
      parseData(data,11,4);
      
    })
}

