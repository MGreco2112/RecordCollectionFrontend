import React, {useState, useEffect} from "react";

const AuthContext = React.createContext([{}, () => {}, () => {}, () => {}]);

const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: null,
        profile: null,
        roles: []
    });

    const saveAuth = (newAuth) => {
        
        if (localStorage['Token'] != undefined) {
                
            localStorage.removeItem('Token');
            localStorage.removeItem('Profile');
            localStorage.removeItem('Roles');
            
        }
        
        localStorage.setItem('Token', JSON.stringify(newAuth.token));
        localStorage.setItem('Profile', JSON.stringify({"id": newAuth.id,
            "username": newAuth.username}));
        localStorage.setItem('Roles', JSON.stringify(newAuth.roles));
    }

    const updateAuth = (update) => {
        localStorage.removeItem('Profile');
        localStorage.removeItem('Roles');

        localStorage.setItem('Profile', JSON.stringify({
            "id": update.id,
            "username": update.username
        }));
        localStorage.setItem('Roles', JSON.stringify(update.roles))
    }

    useEffect(() => {
        
        if (localStorage['Token'] != undefined){
            setAuth({
                token: JSON.parse(localStorage['Token']),
                profile: {
                    id: JSON.parse(localStorage['Profile']).id,
                    username: JSON.parse(localStorage['Profile']).username  
                },
                roles: JSON.parse(localStorage['Roles'])
            });
        }

    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth, saveAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}