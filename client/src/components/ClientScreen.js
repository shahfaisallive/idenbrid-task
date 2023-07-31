import React, { useEffect, useState } from 'react';
import axios from './axios.js';

const ClientScreen = () => {
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    axios.get('/')
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch colors:', error);
      });
  }, []);

  const handleCheckboxToggle = (colorId, toneId) => {
    setColors((prevColors) => {
      const updatedColors = prevColors.map((color) => {
        if (color._id === colorId) {
          const updatedTones = color.tones.map((tone) => {
            if (tone._id === toneId) {
              return {
                ...tone,
                checked: !tone.checked,
              };
            }
            return tone;
          });
          return {
            ...color,
            tones: updatedTones,
          };
        }
        return color;
      });
      return updatedColors;
    });
  };

  const handleSelectColors = () => {
    const selectedColorTones = colors.flatMap((color) => {
      const selectedTones = color.tones.filter((tone) => tone.checked);
      if (selectedTones.length > 0) {
        return selectedTones.map((tone) => ({
          colorName: color.name,
          toneCode: tone.toneCode,
        }));
      }
      return [];
    });
    setSelectedColors(selectedColorTones);
  };

  return (
    <div>
      {colors.map((color) => (
        <div key={color._id} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex' }}>
            {color.tones.map((tone) => (
              <div key={tone._id} style={{ marginRight: '10px', position: 'relative' }}>
                <img
                  src={`http://localhost:3001/${tone.image}`}
                  alt={`Tone ${tone.toneCode}`}
                  style={{ width: '150px', height: '150px', border: '1px solid black' }}
                  onClick={() => handleCheckboxToggle(color._id, tone._id)}
                />
                <input
                  type="checkbox"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    margin: '5px',
                  }}
                  checked={tone.checked || false}
                  onChange={() => handleCheckboxToggle(color._id, tone._id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        {colors.length != 0 ? <button onClick={handleSelectColors} style={{ padding: '10px 30px' }}>Select Colors</button> : <p>No Colors available, ask the Admin to add colors</p>}
        {selectedColors.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <p>You have selected these colors:</p>
            <ul>
              {selectedColors.map(({ colorName, toneCode }, index) => (
                <li key={index}>{`${colorName} - ${toneCode}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientScreen;
