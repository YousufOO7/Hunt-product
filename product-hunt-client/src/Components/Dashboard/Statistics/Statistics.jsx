import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Cell,  PieChart, Pie, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: AllUsers = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    const { data: AllReviews = [] } = useQuery({
        queryKey: ['all-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-reviews')
            return res.data
        }
    })
    const { data: AllProducts = [] } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-products')
            console.log(res.data)
            return res.data
        }
    })


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = [
        { name: "Total Users", value: AllUsers.length },
        { name: "Total Reviews", value: AllReviews.length },
        { name: "Total Products", value: AllProducts.total || 0 },
    ];

    const pieData = pieChartData.map(data => {
        return { name: data.name, value: data.value }
    })

 


    return (
        <div>
            <section className="flex justify-center">
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </section>
        </div>
    );
};

export default Statistics;