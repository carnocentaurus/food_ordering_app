import { createContext, PropsWithChildren, useEffect, useContext, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { Profile } from "../types";

type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: Profile | null;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
});

export default function AuthProvider({children}: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const {data: {session}, } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                // fetch profile
                const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                setProfile(data || null);
            }

            setLoading(false);
        }

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session) {
                // fetch profile
                const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                setProfile(data || null);
            } else {
                setProfile(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    const value = useMemo(() => ({
        session,
        loading,
        profile,
        isAdmin: profile?.group === 'ADMIN'
    }), [session, loading, profile]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);