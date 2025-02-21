import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Node,
    Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useTeams } from "../context/TeamsContext";

const DiagramPage = () => {
    const { teams, removeUserFromTeam, toggleTeamExpansion } = useTeams();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    // Takım ve kullanıcı verilerine göre node ve edge oluşturma
    useEffect(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        teams.forEach((team, teamIndex) => {
            // Takım node'u
            newNodes.push({
                id: team.id,
                data: { label: team.name },
                position: { x: 50, y: teamIndex * 150 },
                // Tip veya stil vererek özel davranışlar ekleyebilirsiniz
            });

            // Eğer takımın kullanıcıları görünür durumdaysa, kullanıcı node'larını ekle
            if (team.expanded) {
                team.users.forEach((user, userIndex) => {
                    newNodes.push({
                        id: user.id,
                        data: { label: user.name },
                        position: { x: 300, y: teamIndex * 150 + userIndex * 50 },
                    });
                    newEdges.push({
                        id: `${team.id}-${user.id}`,
                        source: team.id,
                        target: user.id,
                    });
                });
            }
        });
        setNodes(newNodes);
        setEdges(newEdges);
    }, [teams]);

    // Sağ tıklama işlemleri
    const onNodeContextMenu = useCallback(
        (event: React.MouseEvent, node: Node) => {
            event.preventDefault();
            // Takım mı, kullanıcı mı kontrolü yaparak işlemleri gerçekleştirin
            const team = teams.find((t) => t.id === node.id);
            if (team) {
                toggleTeamExpansion(team.id);
            } else {
                teams.forEach((team) => {
                    const user = team.users.find((u) => u.id === node.id);
                    if (user) {
                        removeUserFromTeam(team.id, user.id);
                    }
                });
            }
        },
        [teams, removeUserFromTeam, toggleTeamExpansion]
    );

    return (
        <div style={{ width: "100%", height: "80vh" }}>
            <ReactFlow nodes={nodes} edges={edges} onNodeContextMenu={onNodeContextMenu}>
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default DiagramPage;
