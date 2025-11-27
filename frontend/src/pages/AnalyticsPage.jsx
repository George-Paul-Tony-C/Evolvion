import React, { useState, useEffect } from 'react';
import { getSystemMetrics } from '../api/authApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Loading skeleton component
const AnalyticsLoadingSkeleton = () => (
  <div className="space-y-8 animate-slideUp">
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-64 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4 mb-2 animate-pulse"></div>
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="h-96 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getSystemMetrics();
        if (response.data.success) {
          setMetrics(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Process metrics data
  const processedData = metrics
    .map(item => ({
      ...item,
      time: new Date(item.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      fullTime: new Date(item.timestamp),
    }))
    .sort((a, b) => a.fullTime - b.fullTime);

  // Calculate statistics
  const avgLatency = metrics.length > 0 
    ? Math.round(metrics.reduce((sum, m) => sum + m.latency, 0) / metrics.length)
    : 0;
  const avgErrorRate = metrics.length > 0 
    ? Math.round((metrics.reduce((sum, m) => sum + m.errorRate, 0) / metrics.length) * 100) / 100
    : 0;
  const maxLatency = metrics.length > 0 
    ? Math.max(...metrics.map(m => m.latency))
    : 0;
  const systemHealth = avgErrorRate < 1 && avgLatency < 500 ? 'Excellent' : 
                      avgErrorRate < 3 && avgLatency < 1000 ? 'Good' : 'Needs Attention';

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <AnalyticsLoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-8 text-center animate-fadeInUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Analytics</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                System Analytics
              </h1>
              <p className="text-slate-600 mt-2">Real-time performance monitoring and insights</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <div className={`px-4 py-2 rounded-xl text-sm font-medium ${
              systemHealth === 'Excellent' ? 'bg-green-100 text-green-800' :
              systemHealth === 'Good' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              System Health: {systemHealth}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        {[
          { 
            label: 'Average Latency', 
            value: `${avgLatency}ms`,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
            ),
            gradient: 'from-blue-500 to-indigo-600',
            trend: avgLatency < 300 ? 'up' : 'down'
          },
          { 
            label: 'Error Rate', 
            value: `${avgErrorRate}%`,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            ),
            gradient: avgErrorRate < 1 ? 'from-emerald-500 to-green-600' : 'from-red-500 to-rose-600',
            trend: avgErrorRate < 1 ? 'up' : 'down'
          },
          { 
            label: 'Peak Latency', 
            value: `${maxLatency}ms`,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            ),
            gradient: 'from-amber-500 to-orange-600',
            trend: maxLatency < 800 ? 'up' : 'down'
          },
          { 
            label: 'Data Points', 
            value: metrics.length,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            ),
            gradient: 'from-purple-500 to-violet-600',
            trend: 'up'
          }
        ].map((metric, index) => (
          <div key={metric.label} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center text-white shadow-lg`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <svg className={`w-3 h-3 ${metric.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z"/>
                </svg>
                <span>{metric.trend === 'up' ? 'Good' : 'Alert'}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{metric.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {/* Latency Chart */}
        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Response Latency</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Milliseconds</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={processedData}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fill="url(#colorLatency)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Error Rate Chart */}
        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Error Rate</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Percentage</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="errorRate" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Combined Performance Chart */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">AI Agent Performance Overview</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600">Latency (ms)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-600">Error Rate (%)</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={processedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="latency" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              name="Latency (ms)" 
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="errorRate" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Error Rate (%)" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
