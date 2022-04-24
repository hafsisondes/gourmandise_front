import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Result } from 'antd'
import axios from '../../services/axios';

const PieCharts = ({ type, question = 1 }) => {
    const [data, setData] = useState(null);
    const [chartData, setchartData] = useState({
        series: [],
        options: {
            colors: ['#5b3c11', '#a96303', '#d8ac69', '#e7a854f5 ', '#dfd1b8f7'],
            chart: {
                width: '100%',
                type: 'pie',
            },
            labels: [],

            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5
                    }
                }
            },
            title: {
                text: ''
            },
            dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [val.toFixed(1) + '%']
                }
            },
            legend: {
                show: true
            }
        },
    });
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (data !== null) {
            let newSeries = [];
            let newlabels = [];

            data.forEach(element => {
                newSeries.push(parseInt(element.nbr) / question)
                newlabels.push(element.label)
            });
            console.log(question)
            console.log(newSeries)
            setchartData({
                ...chartData,
                series: newSeries,
                options: {
                    ...chartData.options,
                    labels: newlabels
                }
            })
        }
    }, [data])


    const getData = async () => {
        try {
            const response = await axios.get('/statistique/getStatistique.php?type=' + type)
            response.data.body && setData(response.data.body)

            console.log(response.data.body)
        } catch (error) {

        }
    }
    return (
        <div id="chart">
            {data === null ?
                <Result
                    status="error"
                    title="Pas de données"
                //    subTitle=""

                />
                :
                <ReactApexChart height={250} options={chartData.options} series={chartData.series} type="pie" />}
        </div>
    )
}
export default PieCharts