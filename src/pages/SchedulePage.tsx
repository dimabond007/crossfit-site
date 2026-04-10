
import { useEffect, useState } from 'react';

export default function SchedulePage() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('/api/boostapp')
            .then(res => {
                console.log('res', res);
                return res.json();
            })
            .then(data => {
                console.log('data', data);

                if (data && data.data) {
                    setTrainings(data.data);
                }
            })
            .catch(err => console.error('Error fetching schedule:', err));
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