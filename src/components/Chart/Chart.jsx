import React, {useState, useEffect} from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';

const Chart = ({ data : {confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchAPI();
    },[]);

    const lineChart = (
        dailyData.length ? (<Line 
            data={{
                labels: dailyData.map((val) => val.date),
                datasets: [{
                    data: dailyData.map( (val)=> val.confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                },{
                    data: dailyData.map( (val)=> val.deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }],
            }}
        />) : null
    ) ;

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgb(0, 0, 255, 0.5)', 'rgb(0, 255, 0, 0.5)', 'rgb(255, 0, 0, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false},
                    title: { dissplay: true, text: `current state in ${country}`}
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Chart;