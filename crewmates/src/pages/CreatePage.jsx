import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [color, setColor] = useState('Red');
    const [role, setRole] = useState('Engineer');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !speed || !color) {
            alert('Please fill out all fields!');
            return;
        }

        const { error } = await supabase.from('crewmates').insert([
            {
                name: name.trim(),
                color,
                speed: parseFloat(speed),
                role,
                created_at: new Date().toISOString(),
            },
        ]);


        if (error) {
            console.error('Supabase insert error:', error.message);
            alert('Failed to create crewmate.');
            return;
        }

        navigate('/');
    }

    return (
        <div className="container">
            <h1>Create a New Crewmate</h1>
            <img src="/assets/crew-group.png" className="crewmate-icon" alt="crewmate group" />
            <form onSubmit={handleSubmit}>
                <div className="panel">
                    <label><strong>Name:</strong></label>
                    <input
                        placeholder="Enter crewmate's name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="panel">
                    <label><strong>Speed (mph):</strong></label>
                    <input
                        type="number"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
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
                                checked={color === c}
                                onChange={(e) => setColor(e.target.value)}
                            /> {c}
                        </div>
                    ))}
                </div>

                <div className="panel">
                    <label><strong>Role:</strong></label>
                    {["Engineer", "Medic", "Scout", "Captain"].map((r) => (
                        <div key={r}>
                            <input
                                type="radio"
                                name="role"
                                value={r}
                                checked={role === r}
                                onChange={(e) => setRole(e.target.value)}
                            /> {r}
                        </div>
                    ))}
                </div>


                <button type="submit">Create Crewmate</button>
            </form>
        </div>
    );
}
