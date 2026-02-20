import { Toaster } from "react-hot-toast";
import { useGameLogic } from "./hooks/useGameLogic";
import Loader from "./components/Loader";
import LoginCard from "./components/LoginCard";
import UserStats from "./components/UserStats";
import TaskBoard from "./components/TaskBoard";
import LevelUpModal from "./components/LevelUpModal";

// Root component: decides what to render based on auth state.
const App = () => {

  const {
    user,
    userData,
    loading,
    levelUpData,
    closeLevelUpModal,
    handleTaskComplete,
    handleTaskFail,
    handleLogin,
    handleLogout,
  } = useGameLogic();

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Toast notifications — always mounted, shown globally */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#f9fafb",
            border: "1px solid #374151",
            borderRadius: "12px",
          },
        }}
      />

      {/* Level-up modal — controlled by levelUpData (null = closed) */}
      <LevelUpModal
        isOpen={!!levelUpData}
        level={levelUpData?.level}
        newMaxXP={levelUpData?.newMaxXP}
        onClose={closeLevelUpModal}
      />

      {!user ? (
        <LoginCard onLogin={handleLogin} />
      ) : (
        <>
          <UserStats userData={userData} user={user} onLogout={handleLogout} />
          <TaskBoard
            user={user}
            handleTaskComplete={handleTaskComplete}
            handleTaskFail={handleTaskFail}
          />
        </>
      )}
    </div>
  );
}

export default App;