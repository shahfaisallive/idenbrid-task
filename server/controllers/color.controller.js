import Color from '../models/color.model.js'

// Add a new color
export const createColor = async (req, res) => {
    try {
        const { name } = req.body;

        const existingColor = await Color.findOne({ name });
        if (existingColor) {
            return res.status(400).json({ error: 'This color already exists' });
        }

        const color = await Color.create({ name });
        res.json(color);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create color' });
    }
};


// Get all available colors
export const getAllColors = async (req, res) => {
    try {
        const colors = await Color.find()
        res.json(colors);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch colors' })
    }
};

// Delete a color
export const deleteColor = async (req, res) => {
    try {
        const { id } = req.params
        const deletedColor = await Color.findByIdAndDelete(id)
        if (!deletedColor) {
            return res.status(404).json({ error: 'Color not found' })
        }
        res.json(deletedColor);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete color' })
    }
}

// Add a new tone to a color with image upload
export const addTone = async (req, res) => {
    try {
        const { code, colorId } = req.body;

        const color = await Color.findById(colorId);
        if (!color) {
            return res.status(404).json({ error: 'Color not found. Please provide a valid colorId.' });
        }

        let image = '';
        if (req.file) {
            image = req.file.path;
        }

        color.tones.push({ toneCode: code, image });
        await color.save();

        console.log("New tone added to color:", color.name);
        res.json(color);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add tone to the color' });
    }
};


// Update a tone
export const updateTone = async (req, res) => {
    try {
        const { id } = req.params;
        const { code } = req.body;

        const updatedColor = await Color.findOneAndUpdate(
            { 'tones._id': id },
            { $set: { 'tones.$.toneCode': code } },
            { new: true }
        );
        if (!updatedColor) {
            return res.status(404).json({ error: 'Tone not found' });
        }

        res.json(updatedColor);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update tone' });
    }
};

// Delete a tone
export const deleteTone = async (req, res) => {
    try {
        const { id } = req.params;

        const color = await Color.findOneAndUpdate(
            { 'tones._id': id },
            { $pull: { tones: { _id: id } } },
            { new: true }
        );

        if (!color) {
            return res.status(404).json({ error: 'Tone not found' });
        }

        res.json(color);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete tone' });
    }
};
