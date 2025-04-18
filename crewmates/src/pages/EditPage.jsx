import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function EditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching crewmate:', error.message);
                return;
            }

            setCrewmate(data);
        }

        fetchData();
    }, [id]);

    async function handleUpdate(e) {
        e.preventDefault();

        if (!crewmate.name || !crewmate.speed || !crewmate.color) {
            alert('Please fill out all fields!');
            return;
        }

        const { error } = await supabase
            .from('crewmates')
            .update({
                name: crewmate.name.trim(),
                color: crewmate.color,
                speed: parseFloat(crewmate.speed),
            })
            .eq('id', id);

        if (error) {
            console.error('Update error:', error.message);
            alert('Failed to update crewmate.');
            return;
        }

        navigate('/');
    }

    async function handleDelete() {
        const { error } = await supabase.from('crewmates').delete().eq('id', id);

        if (error) {
            console.error('Delete error:', error.message);
            alert('Failed to delete crewmate.');
            return;
        }

        navigate('/');
    }

    if (!crewmate) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Update Your Crewmate :)</h1>
            <p><strong>Current Crewmate Info:</strong></p>
            <p>Name: {crewmate.name}, Speed: {crewmate.speed}, Color: {crewmate.color}</p>

            <form onSubmit={handleUpdate}>
                <div className="panel">
                    <label><strong>Name:</strong></label>
                    <input
                        value={crewmate.name || ''}
                        onChange={(e) => setCrewmate({ ...crewmate, name: e.target.value })}
                    />
                </div>

                <div className="panel">
                    <label><strong>Speed (mph):</strong></label>
                    <input
                        type="number"
                        value={crewmate.speed || ''}
                        onChange={(e) => setCrewmate({ ...crewmate, speed: e.target.value })}
                    />
                </div>

                <div className="panel">
                    <label><strong>Color:</strong></label>
                    {["Red", "Green", "Blue", "Purple", "Yellow", "Orange", "Pink"].map((c) => (
                        <div key={c}>
                            <input
                                type="radio"
                                name="color"
                                value={c}
                                checked={crewmate.color === c}
                                onChange={(e) => setCrewmate({ ...crewmate, color: e.target.value })}
                            /> {c}
                        </div>
                    ))}
                </div>

                <button type="submit">Update Crewmate</button>
                <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
                    Delete Crewmate
                </button>
            </form>
        </div>
    );
}
