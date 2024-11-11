import React, {createContext, useState, useEffect} from 'react';
import supabase from '../supabaseClient';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {data: {session}} = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const {data: {subscription}} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
