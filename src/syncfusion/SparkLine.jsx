import React, { useState, useEffect } from 'react';
import {
    SparklineComponent,
    Inject,
    SparklineTooltip,
} from '@syncfusion/ej2-react-charts';

const SparkLine = () => {
    const [bmiData, setBmiData] = useState([]); // State to hold BMI data
    const [message, setMessage] = useState(''); // For messages to the user

    useEffect(() => {
        // Fetch existing user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData && userData.bmiHistory) {
            const historyData = userData.bmiHistory.map((entry) => {
                const entryDate = new Date(entry.date).toLocaleDateString(); // Format date as MM/DD/YYYY
                return {
                    x: entryDate, // Use formatted date as x value
                    xval: entryDate, // xval for SparklineComponent
                    yval: entry.bmi, // y value (BMI)
                };
            });
            setBmiData(historyData);
        }
    }, []);

    return (
        <div>
            <h3>BMI Tracker</h3>
            {message && <p>{message}</p>}

            <SparklineComponent
                id='sparkline-graph'
                height='200px'
                width='400px'
                lineWidth={2}
                valueType='Category' // X-axis type as Category for date labels
                dataSource={bmiData}
                xName='xval' // Using 'xval' as x value for date
                yName='yval' // Using 'yval' as BMI value
                type='Line'
                tooltipSettings={{
                    visible: true,
                    format: 'BMI on ${xval}: ${yval}', // Tooltip format
                }}
            >
                <Inject services={[SparklineTooltip]} />
            </SparklineComponent>
        </div>
    );
};

export default SparkLine;
