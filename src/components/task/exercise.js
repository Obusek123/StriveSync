import jumping from '../../assets/images/jumping.png';
import plank from '../../assets/images/plank.png';
import pushup from '../../assets/images/pushup.png';
import squat from '../../assets/images/squat.png';
import highknees from '../../assets/images/high-knees.png';
import burpees from '../../assets/images/burpees.png';
import mountainClimbers from '../../assets/images/mountain-climbers.png';
import lunges from '../../assets/images/lunges.png';

const exercises = [
    {
        name: 'Jumping Jacks',
        caloriesBurnedPer10Mins: 100,
        instructions:
            'Start with feet together and hands at your side, jump with feet apart while raising arms overhead. Return to start and repeat.',
        difficulty: 'easy',
        type: 'cardio',
        image: jumping,
        goals: [
            'Weight loss 🏃🏻‍♀️',
            'General fitness 🏃',
            'Endurance improvement ❚█══█❚',
        ],
        outcome:
            'Improves cardiovascular fitness, increases endurance, and helps tone the legs and arms.',
    },
    {
        name: 'Push-ups',
        caloriesBurnedPer10Mins: 70,
        instructions:
            'Start in a plank position, lower your body to the floor, then push back up to starting position.',
        difficulty: 'moderate',
        type: 'strength',
        image: pushup,
        goals: ['Muscle gain 💪', 'General fitness 🏃'],
        outcome: 'Strengthens the chest, shoulders, triceps, and core muscles.',
    },
    {
        name: 'Squats',
        caloriesBurnedPer10Mins: 80,
        instructions:
            'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then stand back up.',
        difficulty: 'moderate',
        type: 'strength',
        image: squat,
        goals: ['Muscle gain 💪', 'Weight loss 🏃🏻‍♀️', 'General fitness 🏃'],
        outcome:
            'Builds strength in the legs, glutes, and core, and improves balance.',
    },
    {
        name: 'Burpees',
        caloriesBurnedPer10Mins: 120,
        instructions:
            'From a standing position, drop into a squat, kick your legs back into a plank, return to squat, and jump up.',
        difficulty: 'hard',
        type: 'full-body',
        image: burpees,
        goals: ['Weight loss 🏃🏻‍♀️', 'Endurance improvement ❚█══█❚'],
        outcome:
            'Enhances overall body strength and conditioning, boosting cardiovascular endurance.',
    },
    {
        name: 'Mountain Climbers',
        caloriesBurnedPer10Mins: 110,
        instructions:
            'Start in a plank position, bring one knee to the chest, alternate between legs quickly as if running.',
        difficulty: 'hard',
        type: 'cardio',
        image: mountainClimbers,
        goals: ['Endurance improvement ❚█══█❚', 'Weight loss 🏃🏻‍♀️'],
        outcome: 'Improves core strength, agility, and cardiovascular fitness.',
    },
    {
        name: 'Plank',
        caloriesBurnedPer10Mins: 30,
        instructions:
            'Hold a plank position with elbows and toes on the ground, keeping your body straight.',
        difficulty: 'easy',
        type: 'core',
        image: plank,
        goals: ['Core strength', 'General fitness 🏃'],
        outcome:
            'Strengthens the core, shoulders, and back, improving stability and posture.',
    },
    {
        name: 'Lunges',
        caloriesBurnedPer10Mins: 60,
        instructions:
            'Step forward with one leg, lower your hips until both knees are at 90 degrees, then return to standing.',
        difficulty: 'moderate',
        type: 'strength',
        image: lunges,
        goals: [
            'Muscle gain 💪',
            'General fitness 🏃',
            'Endurance improvement ❚█══█❚',
        ],
        outcome:
            'Targets the quadriceps, hamstrings, and glutes, enhancing lower body strength and balance.',
    },
    {
        name: 'High Knees',
        caloriesBurnedPer10Mins: 90,
        instructions:
            'Run in place, lifting your knees as high as possible with each step.',
        difficulty: 'moderate',
        type: 'cardio',
        image: highknees,
        goals: [
            'Weight loss 🏃🏻‍♀️',
            'Endurance improvement ❚█══█❚',
            'General fitness 🏃',
        ],
        outcome:
            'Boosts cardiovascular fitness and strengthens the legs and core.',
    },
    {
        name: 'Jump Rope',
        caloriesBurnedPer10Mins: 130,
        instructions:
            'Hold the handles of a jump rope, jump as the rope swings under your feet and over your head.',
        difficulty: 'moderate',
        type: 'cardio',
        image: 'path/to/jumprope.png',
        goals: [
            'Weight loss 🏃🏻‍♀️',
            'Endurance improvement ❚█══█❚',
            'General fitness 🏃',
        ],
        outcome:
            'Improves cardiovascular health and coordination while toning the legs.',
    },
    {
        name: 'Bicycle Crunches',
        caloriesBurnedPer10Mins: 50,
        instructions:
            'Lie on your back, lift your legs into the air, alternate bringing each knee to your opposite elbow in a twisting motion.',
        difficulty: 'moderate',
        type: 'core',
        image: 'path/to/bicycle_crunches.png',
        goals: ['Core strength', 'General fitness 🏃'],
        outcome:
            'Strengthens the abdominal muscles, particularly the obliques.',
    },
    {
        name: 'Side Plank',
        caloriesBurnedPer10Mins: 40,
        instructions:
            'Lie on your side with legs straight, prop yourself up on your forearm, lift your hips off the ground to form a straight line.',
        difficulty: 'moderate',
        type: 'core',
        image: 'path/to/side_plank.png',
        goals: ['Core strength', 'General fitness 🏃'],
        outcome: 'Targets the obliques, improves balance and core stability.',
    },
    {
        name: 'Tricep Dips',
        caloriesBurnedPer10Mins: 60,
        instructions:
            'Sit on a bench, place hands behind you, lower your body down using your arms, and press back up.',
        difficulty: 'moderate',
        type: 'strength',
        image: 'path/to/tricep_dips.png',
        goals: ['Muscle gain 💪', 'General fitness 🏃'],
        outcome: 'Strengthens the triceps, shoulders, and chest.',
    },
    {
        name: 'Russian Twists',
        caloriesBurnedPer10Mins: 45,
        instructions:
            'Sit on the floor with legs bent, lean back slightly, twist your torso from side to side, tapping the floor with your hands.',
        difficulty: 'easy',
        type: 'core',
        image: 'path/to/russian_twists.png',
        goals: ['Core strength', 'General fitness 🏃'],
        outcome: 'Enhances core strength and improves rotational stability.',
    },
    {
        name: 'Pull-ups',
        caloriesBurnedPer10Mins: 70,
        instructions:
            'Hang from a bar with palms facing away, pull yourself up until your chin is above the bar.',
        difficulty: 'hard',
        type: 'strength',
        image: 'path/to/pullups.png',
        goals: ['Muscle gain 💪', 'General fitness 🏃'],
        outcome:
            'Builds upper body strength, focusing on the back, shoulders, and arms.',
    },
    {
        name: 'Deadlifts',
        caloriesBurnedPer10Mins: 90,
        instructions:
            'Stand with feet hip-width apart, hold a barbell, hinge at your hips to lower the bar, then stand back up.',
        difficulty: 'hard',
        type: 'strength',
        image: 'path/to/deadlifts.png',
        goals: ['Muscle gain 💪', 'General fitness 🏃'],
        outcome:
            'Targets the lower back, glutes, hamstrings, and core, promoting overall strength.',
    },
    {
        name: 'Side Lunges',
        caloriesBurnedPer10Mins: 60,
        instructions:
            'Step one leg out to the side, bend the knee and lower yourself into a squat, then return to standing.',
        difficulty: 'moderate',
        type: 'strength',
        image: 'path/to/sidelunges.png',
        goals: ['Muscle gain 💪', 'General fitness 🏃'],
        outcome:
            'Strengthens the inner thighs, glutes, and improves flexibility.',
    },
    {
        name: 'Box Jumps',
        caloriesBurnedPer10Mins: 120,
        instructions:
            'Jump onto a sturdy box or platform, land with both feet, and step or jump down.',
        difficulty: 'hard',
        type: 'cardio',
        image: 'path/to/boxjumps.png',
        goals: ['Weight loss 🏃🏻‍♀️', 'Endurance improvement ❚█══█❚'],
        outcome: 'Enhances power, explosiveness, and overall leg strength.',
    },
    {
        name: 'Step-Ups',
        caloriesBurnedPer10Mins: 80,
        instructions:
            'Step onto a platform with one foot, press down to lift your body, then step back down and switch legs.',
        difficulty: 'moderate',
        type: 'strength',
        image: 'path/to/stepups.png',
        goals: ['Muscle gain 💪', 'General fitness 🏃'],
        outcome:
            'Works the legs, glutes, and improves balance and coordination.',
    },
];

export default exercises;
