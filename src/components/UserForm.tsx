// src/components/UserForm.tsx
import React, { useState } from "react";
import { useTeams } from "../context/TeamsContext";

interface UserFormProps {
    teamId: string;
}

const UserForm: React.FC<UserFormProps> = ({ teamId }) => {
    const [userName, setUserName] = useState("");
    const { addUserToTeam } = useTeams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName.trim()) {
            addUserToTeam(teamId, userName);
            setUserName("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <input
                type="text"
                placeholder="User Name:"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
