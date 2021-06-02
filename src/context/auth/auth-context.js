import { AuthContext } from 'context';
import React, { useState } from 'react';

export default function GlobalAuthContext(props) {
    const [userData, setUserData] = useState({
        isAuth: false,
        user:{},
        isTourCompleted:false,
    });

    return (
        <AuthContext.Provider
            value={{
                userData,
                setUserData,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}