import React from 'react';
import BmiCalc from '../components/bmi-calc/BmiCalc';
import CalorieCalc from '../components/calorie-calc/CalorieCalc';
import MacroNutrient from '../components/macro-nutrient/MacroNutrient';

const FitnessCalc = () => {
    return (
        <>
            <BmiCalc />
            <CalorieCalc />
            <MacroNutrient />
        </>
    );
};

export default FitnessCalc;
