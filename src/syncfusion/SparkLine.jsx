import React from 'react';
import {
    SparklineComponent,
    Inject,
    SparklineTooltip,
} from '@syncfusion/ej2-react-charts';

const SparkLine = () => {
    return (
        <div>
            <SparklineComponent
                id='sparkline-graph'
                height='100px'
                width='250px'
                lineWidth={1}
                valueType='Numeric'
                border={{ color: 'blue', width: 2 }} // Corrected border color
                dataSource={[
                    { x: 0, xval: '1', yval: 21.09 },
                    { x: 1, xval: '2', yval: 22.09 },
                    { x: 2, xval: '3', yval: 21.09 },
                    { x: 3, xval: '4', yval: 24.09 },
                    { x: 4, xval: '5', yval: 21.59 },
                    { x: 5, xval: '6', yval: 26.09 },
                    { x: 6, xval: '7', yval: 23.53 },
                    { x: 8, xval: '8', yval: 23.29 },
                    { x: 9, xval: '9', yval: 21.69 },
                ]}
                xName='xval'
                yName='yval'
                type='Line'
                tooltipSettings={{
                    visible: true,
                    format: 'BMI(Day${xval}) : ${yval}',
                }}
            >
                <Inject services={[SparklineTooltip]} />
            </SparklineComponent>
        </div>
    );
};

export default SparkLine;
