import React, { useContext, useState } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import { AuthContext } from '../../auth/auth.context'
import { logout } from '../../auth/services/auth.api'

const Home = () => {

    const { handleGetSong, loading, song } = useSong()
    const { user, setUser } = useContext(AuthContext)
    const [ detectedMood, setDetectedMood ] = useState(null)
    const [ errorMessage, setErrorMessage ] = useState("")

    async function handleLogoutClick() {
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    async function handleDetectClick(expression) {
        setErrorMessage("")
        setDetectedMood(expression)

        if (!expression) {
            setErrorMessage("Face not detected! Please ensure your face is clearly visible to the camera and try again.")
            return
        }

        const validMoods = ["happy", "sad", "surprised"]
        const moodLower = expression.toLowerCase()
        
        if (!validMoods.includes(moodLower)) {
            setErrorMessage(`Neutral expression detected. Try making a clear face: Smile (Happy), Frown (Sad), or Open Mouth (Surprised)!`)
            return
        }

        await handleGetSong({ mood: moodLower })
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
                onClick={handleDetectClick}
            />

            {/* Status and Error messages */}
            <div style={{ marginTop: "20px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
                {loading && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        color: "#1DB954",
                        fontWeight: "500",
                        fontSize: "1.1rem",
                        padding: "10px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(29, 185, 84, 0.1)",
                        marginBottom: "15px"
                    }}>
                        <div className="spinner" style={{
                            width: "20px",
                            height: "20px",
                            border: "3px solid rgba(29, 185, 84, 0.3)",
                            borderTop: "3px solid #1DB954",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                        }}></div>
                        Searching for the perfect song...
                    </div>
                )}

                {errorMessage && !loading && (
                    <div style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(231, 76, 60, 0.15)",
                        border: "1px solid #e74c3c",
                        color: "#ff6b6b",
                        fontSize: "0.95rem",
                        lineHeight: "1.4",
                        marginBottom: "15px"
                    }}>
                        ⚠️ {errorMessage}
                    </div>
                )}

                {!loading && !errorMessage && detectedMood && !song && (
                    <div style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(241, 196, 15, 0.15)",
                        border: "1px solid #f1c40f",
                        color: "#f39c12",
                        fontSize: "0.95rem",
                        lineHeight: "1.4",
                        marginBottom: "15px"
                    }}>
                        🎵 Detected Mood: <strong>{detectedMood}</strong>.
                        <br />
                        <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                            No song found in the database for this mood yet. Try uploading one!
                        </span>
                    </div>
                )}
            </div>

            <Player />
        </div>
    )
}

export default Home