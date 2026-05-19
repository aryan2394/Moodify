import React, { useContext } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import { AuthContext } from '../../auth/auth.context'
import { logout } from '../../auth/services/auth.api'

const Home = () => {

    const { handleGetSong } = useSong()
    const { user, setUser } = useContext(AuthContext)

    async function handleLogoutClick() {
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
            {/* Header with user info and Logout Button */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: "600px",
                marginBottom: "35px",
                paddingBottom: "15px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>
                    Welcome, <span style={{ color: "#1DB954" }}>{user?.username}</span>! 🎵
                </span>
                <button
                    onClick={handleLogoutClick}
                    style={{
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        padding: "8px 18px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
                >
                    Logout
                </button>
            </div>

            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
            />
            <Player />
        </div>
    )
}

export default Home