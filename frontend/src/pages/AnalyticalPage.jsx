import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { 
  Users, 
  Activity, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Award, 
  Target,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
);

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [expandedUsers, setExpandedUsers] = useState(new Set());

  // Mock data - replace with your API call
  const mockData = {
    "summary": {
        "totalUsers": 6,
        "activeUsersLast24h": 3,
        "completedAssessments": 6,
        "averageAssessmentScore": 70,
        "topSkillGaps": [
            {
                "skill": "Concurrency",
                "count": 3
            },
            {
                "skill": "Java",
                "count": 3
            },
            {
                "skill": "React.js",
                "count": 1
            },
            {
                "skill": "SCRUM",
                "count": 1
            },
            {
                "skill": "Agile",
                "count": 1
            }
        ]
    },
    "perUserAnalytics": [
        {
            "userId": "6890ad791d4869cd6b65c879",
            "name": "Janani",
            "email": "janani@hexapath.com",
            "department": "Software",
            "role": "employee",
            "status": "active",
            "cheatingFlagsCount": 5,
            "sorryRequestsPending": 0,
            "skillGaps": [
                {
                    "skillName": "Java",
                    "gapLevel": 1
                },
                {
                    "skillName": "Concurrency",
                    "gapLevel": 2
                }
            ],
            "assessmentHistory": [
                {
                    "assessmentId": "6895f8d28905b754d5f73876",
                    "courseId": "6894706e342b53c79b18f4c3",
                    "score": 70,
                    "date": "2025-08-08T13:17:06.237Z",
                    "isCheatingDetected": false,
                    "difficultyLevel": "Intermediate"
                },
                {
                    "assessmentId": "6895f4d48905b754d5f73406",
                    "courseId": "6894706e342b53c79b18f4c3",
                    "score": 70,
                    "date": "2025-08-08T13:00:04.799Z",
                    "isCheatingDetected": false,
                    "difficultyLevel": "Intermediate"
                }
            ],
            "learningPaths": [
                {
                    "pathTitle": "Elevate Your Cloud Architecture Expertise",
                    "pathDescription": "This learning path will equip you with foundational principles and practical skills to design robust software systems on leading cloud platforms.",
                    "recommendedCoursesCount": 2,
                    "lastGenerated": "2025-08-08T13:18:13.932Z"
                }
            ]
        },
        {
            "userId": "6890ad791d4869cd6b65c87a",
            "name": "Nimisha",
            "email": "nimisha@hexapath.com",
            "department": "Software",
            "role": "employee",
            "status": "active",
            "cheatingFlagsCount": 0,
            "sorryRequestsPending": 0,
            "skillGaps": [
                {
                    "skillName": "Java",
                    "gapLevel": 2
                },
                {
                    "skillName": "Concurrency",
                    "gapLevel": 3
                },
                {
                    "skillName": "React.js",
                    "gapLevel": 3
                }
            ],
            "assessmentHistory": [],
            "learningPaths": []
        },
        {
            "userId": "6890ad791d4869cd6b65c87c",
            "name": "Akshaya",
            "email": "akshayae@hexapath.com",
            "department": "Software",
            "role": "employee",
            "status": "active",
            "cheatingFlagsCount": 1,
            "sorryRequestsPending": 1,
            "skillGaps": [
                {
                    "skillName": "Java",
                    "gapLevel": 4
                },
                {
                    "skillName": "Concurrency",
                    "gapLevel": 4
                }
            ],
            "assessmentHistory": [],
            "learningPaths": [
                {
                    "pathTitle": "Your Accelerated Journey to Full-Stack Expertise",
                    "pathDescription": "This personalized learning path will systematically equip you with the foundational and advanced skills in Java and React.js required for modern development.",
                    "recommendedCoursesCount": 3,
                    "lastGenerated": "2025-08-12T13:52:31.571Z"
                }
            ]
        }
    ]
  };

  useEffect(() => {
    
    setTimeout(() => {
      setAnalytics(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const filteredUsers = analytics?.perUserAnalytics.filter(user => 
    filterDepartment === "all" || user.department === filterDepartment
  ) || [];

  const departments = [...new Set(analytics?.perUserAnalytics.map(user => user.department) || [])];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">No analytics data found</p>
        </div>
      </div>
    );
  }

  const { summary, perUserAnalytics } = analytics;

  // Chart configurations
  const skillGapData = {
    labels: summary.topSkillGaps?.map(item => item.skill) || [],
    datasets: [
      {
        label: "Skill Gap Count",
        data: summary.topSkillGaps?.map(item => item.count) || [],
        backgroundColor: [
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FECA57"
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const departmentData = {
    labels: departments,
    datasets: [
      {
        data: departments.map(dept => 
          perUserAnalytics.filter(user => user.department === dept).length
        ),
        backgroundColor: [
          "#667eea",
          "#764ba2",
          "#f093fb",
          "#4facfe"
        ],
        borderWidth: 3,
        borderColor: "#fff",
      },
    ],
  };

  const assessmentTrendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Average Score",
        data: [65, 68, 70, 72],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive overview of employee performance and engagement</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summary.totalUsers}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summary.activeUsersLast24h}</h3>
            <p className="text-gray-600 text-sm mt-1">Active Users (24h)</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summary.completedAssessments}</h3>
            <p className="text-gray-600 text-sm mt-1">Completed Assessments</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+3%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summary.averageAssessmentScore?.toFixed(1)}%</h3>
            <p className="text-gray-600 text-sm mt-1">Average Score</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Skill Gaps Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Top Skill Gaps</h2>
              <Target className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-80">
              {summary.topSkillGaps?.length > 0 ? (
                <Bar data={skillGapData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No skill gap data available
                </div>
              )}
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Department Distribution</h2>
              <Users className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-80">
              <Doughnut data={departmentData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Assessment Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Assessment Performance Trends</h2>
            <Award className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-80">
            <Line data={assessmentTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Employee Details Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Employee Analytics</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={filterDepartment} 
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No employees found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.userId} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => toggleUserExpansion(user.userId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email} • {user.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {user.cheatingFlagsCount > 0 && (
                              <span className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                {user.cheatingFlagsCount} flags
                              </span>
                            )}
                            {user.sorryRequestsPending > 0 && (
                              <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {user.sorryRequestsPending} pending
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {user.status}
                            </span>
                          </div>
                          {expandedUsers.has(user.userId) ? 
                            <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          }
                        </div>
                      </div>
                    </div>

                    {expandedUsers.has(user.userId) && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Skill Gaps */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Target className="w-4 h-4 mr-2" />
                              Skill Gaps ({user.skillGaps.length})
                            </h4>
                            {user.skillGaps.length > 0 ? (
                              <div className="space-y-2">
                                {user.skillGaps.map((gap, i) => (
                                  <div key={i} className="flex items-center justify-between bg-white p-2 rounded border">
                                    <span className="text-sm font-medium">{gap.skillName}</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      gap.gapLevel <= 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                      Level {gap.gapLevel}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">No skill gaps identified</p>
                            )}
                          </div>

                          {/* Assessment History */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Recent Assessments ({user.assessmentHistory.length})
                            </h4>
                            {user.assessmentHistory.length > 0 ? (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {user.assessmentHistory.slice(0, 3).map((assessment) => (
                                  <div key={assessment.assessmentId} className="bg-white p-3 rounded border">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-lg">{assessment.score}%</span>
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        assessment.isCheatingDetected ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                      }`}>
                                        {assessment.isCheatingDetected ? 'Flagged' : 'Clean'}
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(assessment.date).toLocaleDateString()} • {assessment.difficultyLevel}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">No assessments completed</p>
                            )}
                          </div>

                          {/* Learning Paths */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Award className="w-4 h-4 mr-2" />
                              Learning Paths ({user.learningPaths.length})
                            </h4>
                            {user.learningPaths.length > 0 ? (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {user.learningPaths.slice(0, 2).map((path, i) => (
                                  <div key={i} className="bg-white p-3 rounded border">
                                    <h5 className="font-medium text-sm mb-1">{path.pathTitle}</h5>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                      {path.pathDescription}
                                    </p>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                      <span>{path.recommendedCoursesCount} courses</span>
                                      <span>{new Date(path.lastGenerated).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">No learning paths assigned</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}