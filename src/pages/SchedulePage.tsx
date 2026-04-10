
import { useEffect, useState } from 'react';

export default function SchedulePage() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('/api/boostapp')
            .then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    setTrainings(data.data);
                }
            });
    }, []);
    console.log('trainings', trainings);
    return (
        <div>
            <h3>Расписание</h3>
            {trainings.map((training: any) => (
                <div key={training.id}>
                    <h4>{training.name}</h4>
                    <p>{training.description ?? ''}</p>
                </div>
            ))}
        </div>
    );
}