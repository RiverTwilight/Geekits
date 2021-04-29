import React, { useState, useEffect, createContext } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = (props: any) => {
    const [user, setUser] = useState({
        'name': 'harry potter'
    });
    return (
        //@ts-expect-error
        <UserContext.Provider value={{
            user: user,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;