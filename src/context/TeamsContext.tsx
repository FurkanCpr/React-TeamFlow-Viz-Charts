// src/context/TeamsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface User {
    id: string;
    name: string;
}

export interface Team {
    id: string;
    name: string;
    users: User[];
    expanded?: boolean;
}

interface TeamsContextType {
    teams: Team[];
    addTeam: (teamName: string) => void;
    addUserToTeam: (teamId: string, userName: string) => void;
    removeUserFromTeam: (teamId: string, userId: string) => void;
    toggleTeamExpansion: (teamId: string) => void;
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const useTeams = () => {
    const context = useContext(TeamsContext);
    if (!context) {
        throw new Error("useTeams must be used within a TeamsProvider");
    }
    return context;
};

interface TeamsProviderProps {
    children: ReactNode;
}

export const TeamsProvider: React.FC<TeamsProviderProps> = ({ children }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    const addTeam = (teamName: string) => {
        const newTeam: Team = { id: uuidv4(), name: teamName, users: [], expanded: true };
        setTeams((prev) => [...prev, newTeam]);
    };

    const addUserToTeam = (teamId: string, userName: string) => {
        const newUser: User = { id: uuidv4(), name: userName };
        setTeams((prev) =>
            prev.map((team) =>
                team.id === teamId ? { ...team, users: [...team.users, newUser] } : team
            )
        );
    };

    const removeUserFromTeam = (teamId: string, userId: string) => {
        setTeams((prev) =>
            prev.map((team) =>
                team.id === teamId
                    ? { ...team, users: team.users.filter((user) => user.id !== userId) }
                    : team
            )
        );
    };

    const toggleTeamExpansion = (teamId: string) => {
        setTeams((prev) =>
            prev.map((team) =>
                team.id === teamId ? { ...team, expanded: !team.expanded } : team
            )
        );
    };

    return (
        <TeamsContext.Provider value={{ teams, addTeam, addUserToTeam, removeUserFromTeam, toggleTeamExpansion }}>
            {children}
        </TeamsContext.Provider>
    );
};
