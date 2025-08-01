import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { resolveENS } from "../utils/ethers";
import { getTokenBalances } from "../utils/covalent";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#06b6d4", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];



const CustomYAxisTick = ({ x, y, payload, tokens }) => {
    const token = tokens.find((t) => t.symbol === payload.value);
    return (
        <g transform={`translate(${x},${y})`}>
            {/* {token?.logo && (
                <image
                    href={token.logo}
                    x={-35}
                    y={-12}
                    height={20}
                    width={20}
                    style={{ borderRadius: "50%" }}
                />
            )} */}
            <text 
                x={-10} 
                y={4} 
                fill="white" 
                fontSize={12}
                textAnchor="end"
                className="font-medium"
            >
                {payload.value}
            </text>
        </g>
    );
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, symbol }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.03) return null;

    return (
        <text 
            x={x} 
            y={y} 
            fill="white" 
            textAnchor={x > cx ? 'start' : 'end'} 
            dominantBaseline="central"
            fontSize={11}
            fontWeight="bold"
        >
            {`${symbol}`}
        </text>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
                <p className="text-white font-medium">{`${label}`}</p>
                <p className="text-cyan-300">
                    {`Value: $${payload[0].value.toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                    })}`}
                </p>
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
                <p className="text-white font-medium">{`${data.name}`}</p>
                <p className="text-cyan-300">
                    {`Value: $${data.value.toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                    })}`}
                </p>
                <p className="text-gray-300">
                    {`${(data.payload.percent * 100).toFixed(1)}%`}
                </p>
            </div>
        );
    }
    return null;
};

export default function Lookup() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [tokens, setTokens] = useState([]);

    const handleLookup = async () => {
        setLoading(true);
        setProfile(null);
        setTokens([]);

        try {
            const result = await resolveENS(query);
            setProfile(result);

            const address = result.address;
            const tokenData = await getTokenBalances(address);
            setTokens(tokenData);

            const entry = { query, ...result };
            const existing = JSON.parse(localStorage.getItem("lookupHistory")) || [];
            const updated = [entry, ...existing.filter((e) => e.query !== query)];
            localStorage.setItem("lookupHistory", JSON.stringify(updated));
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">🔍 ENS & Token Lookup</h1>

            <div className="flex gap-2 max-w-2xl mx-auto mb-8">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter ENS name or wallet address"
                    className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-400 px-4 py-2 rounded-lg outline-none"
                />
                <button
                    onClick={handleLookup}
                    disabled={!query || loading}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                    {loading ? "Looking..." : "Lookup"}
                </button>
            </div>

            {profile && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur shadow"
                >
                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <img
                            src={profile.avatar || "/avatar-placeholder.png"}
                            alt="avatar"
                            className="w-16 h-16 rounded-full object-cover border border-white/10"
                        />
                        <div>
                            <h2 className="text-xl font-bold">{profile.name || "Unknown ENS"}</h2>
                            <p className="text-slate-400 text-sm font-mono">{profile.address}</p>
                        </div>
                    </div>

                    {/* Profile Metadata */}
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300">
                        {profile.twitter && (
                            <div>
                                <p className="font-medium text-white">Twitter</p>
                                <p>@{profile.twitter}</p>
                            </div>
                        )}
                        {profile.website && (
                            <div>
                                <p className="font-medium text-white">Website</p>
                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                                    {profile.website}
                                </a>
                            </div>
                        )}
                        {profile.bio && (
                            <div className="sm:col-span-2">
                                <p className="font-medium text-white">Bio</p>
                                <p>{profile.bio}</p>
                            </div>
                        )}
                    </div>

                    {/* Token Charts */}
                    {tokens.length > 0 && (
                        <div className="space-y-12">
                            {/* Bar Chart */}
                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-center">Top Tokens by USD Value</h3>
                                <div className="h-[600px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart 
                                            data={tokens.slice(0, 6)} 
                                            layout="vertical" 
                                            margin={{ 
                                                top: 20, 
                                                right: 100, 
                                                bottom: 20, 
                                                left: 120 
                                            }}
                                        >
                                            <XAxis 
                                                type="number" 
                                                tick={{ fill: "white", fontSize: 12 }}
                                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                                stroke="white"
                                            />
                                            <YAxis
                                                type="category"
                                                dataKey="symbol"
                                                width={120}
                                                tick={(props) => <CustomYAxisTick {...props} tokens={tokens} />}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar 
                                                dataKey="value" 
                                                fill="#06b6d4"
                                                radius={[0, 4, 4, 0]}
                                                maxBarSize={40}
                                            >
                                                <LabelList 
                                                    dataKey="value" 
                                                    position="right" 
                                                    fill="white"
                                                    fontSize={11}
                                                    formatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                                                />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Pie Chart */}
                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-center">Token Distribution</h3>
                                <div className="h-[500px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={tokens.slice(0, 7)}
                                                dataKey="value"
                                                nameKey="symbol"
                                                cx="50%"
                                                cy="45%"
                                                outerRadius={120}
                                                innerRadius={0}
                                                labelLine={false}
                                                label={renderCustomLabel}
                                                stroke="#374151"
                                                strokeWidth={2}
                                            >
                                                {tokens.slice(0, 7).map((_, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={COLORS[index % COLORS.length]} 
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomPieTooltip />} />
                                            <Legend 
                                                verticalAlign="bottom" 
                                                height={60}
                                                wrapperStyle={{
                                                    paddingTop: '20px',
                                                    fontSize: '12px'
                                                }}
                                                iconType="circle"
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}