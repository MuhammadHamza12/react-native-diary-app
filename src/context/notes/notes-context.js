import { NotesContext } from 'context';
import React, { useState } from 'react';

export default function GlobalAuthContext(props) {
    const [notes, setNotesData] = useState({
        selectedDate:new Date().toISOString().split('T')[0],
        selectedNote: {},
        filteredResults: [],
        notesData: []
    });

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotesData,
            }}
        >
            {props.children}
        </NotesContext.Provider>
    )
}