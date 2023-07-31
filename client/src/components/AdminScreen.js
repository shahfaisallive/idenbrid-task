import React, { useEffect, useState } from 'react';
import axios from './axios.js';

const AdminScreen = () => {
    const [colors, setColors] = useState([]);
    const [newTonesData, setNewTonesData] = useState({});
    const [submitStatus, setSubmitStatus] = useState('');
    const [newColorName, setNewColorName] = useState('');

    useEffect(() => {
        axios.get('/')
            .then((response) => {
                setColors(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch colors:', error);
            });
    }, []);

    const handleToneCodeChange = (colorId, e) => {
        const toneCode = e.target.value;
        setNewTonesData((prevData) => ({
            ...prevData,
            [colorId]: { code: toneCode, file: prevData[colorId]?.file },
        }));
    };

    const handleFileChange = (colorId, e) => {
        const file = e.target.files[0];
        setNewTonesData((prevData) => ({
            ...prevData,
            [colorId]: { code: prevData[colorId]?.code, file },
        }));
    };

    const handleAddTone = async () => {
        try {
            const newTones = [];
            for (const [colorId, { code, file }] of Object.entries(newTonesData)) {
                if (code && file) {
                    const formData = new FormData();
                    formData.append('code', code);
                    formData.append('colorId', colorId);
                    formData.append('image', file);
                    newTones.push(formData);
                }
            }

            if (newTones.length === 0) {
                setSubmitStatus('No new tones to add.');
                return;
            }

            await Promise.all(newTones.map((formData) => axios.post('/tone', formData)));

            setNewTonesData({});
            setSubmitStatus('New tones added successfully.');

            const response = await axios.get('/');
            setColors(response.data);
        } catch (error) {
            console.error('Failed to add new tones:', error);
            setSubmitStatus('Failed to add new tones.');
        }
    };

    const handleColorNameChange = (e) => {
        setNewColorName(e.target.value);
    };

    const handleAddColor = async () => {
        try {
            if (!newColorName) {
                return;
            }

            const response = await axios.post('/', { name: newColorName });
            setColors((prevColors) => [...prevColors, response.data]);
            setNewColorName('');
            setSubmitStatus(`Color "${newColorName}" added successfully.`);
        } catch (error) {
            console.error('Failed to add color:', error);
            setSubmitStatus('Failed to add color.');
        }
    };

    const handleDeleteTone = async (toneId) => {
        try {
            await axios.delete(`/tone/${toneId}`);
            setColors((prevColors) => {
                const updatedColors = prevColors.map((color) => ({
                    ...color,
                    tones: color.tones.filter((tone) => tone._id !== toneId),
                }));
                return updatedColors;
            });
            setSubmitStatus('Tone deleted successfully.');
        } catch (error) {
            console.error('Failed to delete tone:', error);
            setSubmitStatus('Failed to delete tone.');
        }
    };

    const handleDeleteColor = async (colorId) => {
        try {
            await axios.delete(`/${colorId}`);
            setColors((prevColors) => prevColors.filter((color) => color._id !== colorId));
            setSubmitStatus('Color deleted successfully.');
        } catch (error) {
            console.error('Failed to delete color:', error);
            setSubmitStatus('Failed to delete color.');
        }
    };

    return (
        <div>
            <h2>Admin Screen</h2>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newColorName}
                    onChange={handleColorNameChange}
                    placeholder="Enter Color Name"
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button onClick={handleAddColor} style={{ padding: '10px 20px' }}>Add Color</button>
            </div>

            <div style={{ overflowX: 'auto', display: 'flex' }}>
                {colors.map((color) => (
                    <div key={color._id} style={{ border: '1px solid black', margin: '10px', padding: '20px', paddingBottom: '80px', minWidth: '200px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3>{color.name}</h3>
                            <button onClick={() => handleDeleteColor(color._id)}>Delete Color</button>
                        </div>
                        {color.tones.map((tone) => (
                            <div key={tone._id} style={{ margin: '10px' }}>
                                <div>{tone.toneCode}</div>
                                <img
                                    src={`http://localhost:3001/${tone.image}`}
                                    alt={`Tone ${tone.toneCode}`}
                                    style={{ width: '50px', height: '50px', border: '1px solid black' }}
                                />
                                <button onClick={() => handleDeleteTone(tone._id)} style={{ marginLeft: '10px' }}>Delete Tone</button>
                            </div>
                        ))}
                        <div style={{ position: 'absolute', bottom: '10px' }}>
                            <input type="text" value={newTonesData[color._id]?.code || ''} onChange={(e) => handleToneCodeChange(color._id, e)} style={{ padding: '10px 20px' }} />
                            <input type="file" onChange={(e) => handleFileChange(color._id, e)} />
                        </div>
                    </div>
                ))}
            </div>
            {colors.length != 0 ? <button onClick={handleAddTone} style={{ padding: '10px 20px' }}>Add Tones</button> : <p>No colors available, add some colors</p>}
            {submitStatus && <div>{submitStatus}</div>}
        </div>
    );
};

export default AdminScreen;
