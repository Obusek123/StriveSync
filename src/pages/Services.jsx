import React from 'react';
import { useState } from 'react';

const Services = () => {
    const [name, setName] = useState(null);

    const handleeNameChange = (e) => {
        setName(e.target.value);
    };
    return (
        <div className='return'>
            <input type='text' value={name} onChange={handleeNameChange} />
            {name && <div className='print-name'>{name}</div>}
        </div>
    );
};

export default Services;
