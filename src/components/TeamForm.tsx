import React, { useState } from "react";
import { useTeams } from "../context/TeamsContext";
import UserForm from "./UserForm";

const TeamForm: React.FC = () => {
    const [teamName, setTeamName] = useState("");
    const { addTeam, teams } = useTeams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (teamName.trim()) {
            addTeam(teamName);
            setTeamName("");
        }
    };

    return (
        <div>
            <h2>Create Team</h2>
            <form style={{ paddingLeft: "10px" }} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Team Name:"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <button type="submit">Create Team</button>
            </form>
            <hr />
            <div>
                {teams.map((team) => (
                    <div
                        key={team.id}
                        style={{
                            paddingLeft: "10px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                        }}
                    >
                        <h3>{team.name}</h3>
                        {/* İlgili ekibe kullanıcı eklemek için form */}
                        <UserForm teamId={team.id} />
                        <ul>
                            {team.users.map((user) => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamForm;
