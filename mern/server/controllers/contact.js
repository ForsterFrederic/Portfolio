const Contact = require('../models/Contact');

exports.getContact = async (req, res) => {
    const language = req.params.language;
    try {
        const contact = await Contact.findOne({ language: language });
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

exports.createContact = async (req, res) => {
    const body = req.body;
    try {
        const existingContact = await Contact.findOne({ language: body.language });
        if (existingContact) {
            return res.status(400).json({ error: 'Contact with this language already exists' });
        }
        const contact = new Contact(body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        console.error('Error during contact creation:', err);
        res.status(500).json({ error: err.message });
    }
};