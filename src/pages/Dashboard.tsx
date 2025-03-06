
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Award, Flag, Clock, BarChart3, LogOut } from "lucide-react";
import StatCard from "@/components/StatCard";

// Mock data for the chart
const progressData = [
  { day: 'Day 1', points: 100 },
  { day: 'Day 2', points: 250 },
  { day: 'Day 3', points: 320 },
  { day: 'Day 4', points: 450 },
  { day: 'Day 5', points: 580 },
  { day: 'Day 6', points: 780 },
  { day: 'Day 7', points: 1250 },
];

// Mock recent activity data
const recentActivities = [
  { id: 1, challenge: 'Binary Search', points: 100, time: '2 hours ago', solved: true },
  { id: 2, challenge: 'SQL Injection Basics', points: 300, time: '6 hours ago', solved: true },
  { id: 3, challenge: 'XSS Adventure', points: 250, time: '1 day ago', solved: true },
  { id: 4, challenge: 'Cryptographic Puzzle', points: 400, time: '2 days ago', solved: false },
];

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {user?.username}!</p>
            </div>
            
            <button 
              onClick={logout}
              className="mt-4 md:mt-0 bg-ctf-card hover:bg-ctf-card/70 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Points" 
              value={user?.points || 0} 
              description="Your current score" 
              icon={<Trophy className="w-6 h-6 text-ctf-blue" />}
            />
            <StatCard 
              title="Solved Challenges" 
              value={user?.solvedChallenges || 0} 
              description="Completed tasks" 
              icon={<Flag className="w-6 h-6 text-ctf-blue" />}
            />
            <StatCard 
              title="Current Rank" 
              value={user?.rank || "Beginner"} 
              description="Your experience level" 
              icon={<Award className="w-6 h-6 text-ctf-blue" />}
            />
            <StatCard 
              title="Next Goal" 
              value="5000 pts" 
              description="Expert level" 
              icon={<Target className="w-6 h-6 text-ctf-blue" />}
            />
          </div>
          
          {/* Progress Chart */}
          <div className="glass-card rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Points Progress</h2>
              <div className="text-sm text-gray-400 flex items-center">
                <BarChart3 className="w-4 h-4 mr-1" /> Last 7 days
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progressData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: 'white' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="points" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="glass-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <div className="text-sm text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" /> Last 7 days
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Challenge</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Points</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-700/50 hover:bg-ctf-card/30">
                      <td className="px-4 py-3 text-white">{activity.challenge}</td>
                      <td className="px-4 py-3 text-white">{activity.points}</td>
                      <td className="px-4 py-3 text-gray-400">{activity.time}</td>
                      <td className="px-4 py-3">
                        {activity.solved ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            Solved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
