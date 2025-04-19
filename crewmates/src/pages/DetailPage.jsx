import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function DetailPage() {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        async function fetchCrewmate() {
            const { data } = await supabase.from('crewmates').select('*').eq('id', id).single();
            setCrewmate(data);
        }
        fetchCrewmate();
    }, [id]);

    if (!crewmate) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Crewmate: {crewmate.name}</h1>
            <h2>Stats:</h2>
            <p><strong>Color:</strong> {crewmate.color}</p>
            <p><strong>Speed:</strong> {crewmate.speed} mph</p>
            {parseFloat(crewmate.speed) < 2 && (
                <p>You may want to find a Crewmate with more speed, this one is kind of slow 😬</p>
            )}
            <Link to={`/edit/${crewmate.id}`}>
                <button>Wanna edit this Crewmate?</button>
            </Link>
            <img src="/assets/dead-body.png" className="crewmate-icon" alt="dead crewmate" />
        </div>
    );
}
