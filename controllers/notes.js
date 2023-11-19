import Note from "../models/Notes.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id })
        res.status(200).json(notes)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
};

export const createNote = async (req, res) => {
    // console.log(req.body, req.user);
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content,
            user: req.user._id,
        })
        await newNote.save()
        res.status(200).json({ msg: "Created a Note" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Note.findOneAndUpdate({ _id: req.params.id }, {
            title,
            content,
        })
        res.status(200).json({ msg: "Updated a Note" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const deleteNote = async (req, res) => {
    try {
        console.log(req.params);
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Deleted a Note" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getNote = async (req, res) => {
    try {
        console.log(req.params);
        const note = await Note.findById(req.params.id)
        res.json(note)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}