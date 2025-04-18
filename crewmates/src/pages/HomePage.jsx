import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        async function fetchCrewmates() {
            const { data } = await supabase
                .from('crewmates')
                .select('*')
                .order('created_at', { ascending: false });
            setCrewmates(data);
        }
        fetchCrewmates();
    }, []);

    return (
        <div className="container">
            <h1>Your Crewmate Gallery!</h1>
            {crewmates.length === 0 ? (
                <>
                    <p>You haven't made a crewmate yet!</p>
                    <Link to="/create"><button>Create one here!</button></Link>
                </>
            ) : (
                <div className="gallery">
                    {crewmates.map(crewmate => (
                        <div key={crewmate.id} className={`card ${crewmate.color}`}>
                        <p><strong>Name of Crewmate:</strong> {crewmate.name}</p>
                            <p><strong>Speed of Crewmate:</strong> {crewmate.speed} mph</p>
                            <p><strong>Color of Crewmate:</strong> {crewmate.color}</p>
                            <p><strong>Role of Crewmate:</strong> {crewmate.role}</p>
                            <Link to={`/edit/${crewmate.id}`}>
                                <button>Edit Crewmate</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
