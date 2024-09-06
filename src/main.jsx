import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Import registerLicense from Syncfusion
import { registerLicense } from '@syncfusion/ej2-base';

// Enter your Syncfusion license key here
registerLicense(
    'Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVJ3WmFZfVpgdVVMZFtbQHBPIiBoS35RckVqWXtccnBSQmZaVEd1'
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
