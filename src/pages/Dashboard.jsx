
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Award, Flag, Clock, BarChart3, LogOut } from "lucide-react";
import StatCard from "@/components/StatCard";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [activities, setActivities] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch user's recent activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from("activities")
          .select(`
            id,
            description,
            points,
            created_at,
            activity_type,
            challenges(title)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(4);

        if (!activitiesError && activitiesData) {
          const formattedActivities = activitiesData.map(activity => {
            const challengeTitle = activity.challenges?.title || "Challenge";
            const timeAgo = formatTimeAgo(new Date(activity.created_at));
            
            return {
              id: activity.id,
              challenge: challengeTitle,
              points: activity.points,
              time: timeAgo,
              solved: activity.activity_type === 'solve',
            };
          });
          
          setActivities(formattedActivities);
        }

        // Generate progress data (for demo purposes - in a real app, you'd fetch this)
        generateProgressData();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const generateProgressData = () => {
    // This is a placeholder - in a real app, you'd fetch actual progress data
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = `Day ${7-i}`;
      
      // Generate some random progress that increases over time
      // In a real app, this would be actual user progress data
      const basePoints = user?.points || 0;
      const dailyProgress = Math.floor((basePoints / 7) * (7-i) + Math.random() * 100);
      
      data.push({
        day,
        points: dailyProgress > basePoints ? basePoints : dailyProgress
      });
    }
    
    setProgressData(data);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // For the case where user data is still loading
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-white">Loading dashboard data...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // If there are no activities yet, provide some default ones
  const recentActivities = activities.length > 0 ? activities : [
    { id: '1', challenge: 'No activities yet', points: 0, time: 'Join a challenge to get started', solved: false }
  ];

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
