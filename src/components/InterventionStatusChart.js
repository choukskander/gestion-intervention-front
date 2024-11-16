
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
 XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const InterventionStatusChart = () => {
  // const [interventionStats, setInterventionStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [topClients, setTopClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/interventions')
      .then((res) => {
        const data = res.data;

        // Statut des interventions
        // const statusCount = data.reduce((acc, intervention) => {
        //   acc[intervention.status] = (acc[intervention.status] || 0) + 1;
        //   return acc;
        // }, {});
        // const formattedStatusData = Object.keys(statusCount).map((status) => ({
        //   status,
        //   count: statusCount[status]
        // }));
        // setInterventionStats(formattedStatusData);

        // Nombre d'interventions par mois
        const monthlyCount = data.reduce((acc, intervention) => {
          const month = new Date(intervention.date).toLocaleString('default', { month: 'short', year: 'numeric' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});
        const formattedMonthlyData = Object.keys(monthlyCount).map((month) => ({
          month,
          count: monthlyCount[month]
        }));
        setMonthlyStats(formattedMonthlyData);

        // Clients avec le plus d'interventions
        const clientCount = data.reduce((acc, intervention) => {
          acc[intervention.client.name] = (acc[intervention.client.name] || 0) + 1;
          return acc;
        }, {});
        const formattedClientData = Object.keys(clientCount).map((client) => ({
          client,
          count: clientCount[client]
        }));
        setTopClients(formattedClientData);
      })
      .catch(err => console.error('Erreur lors de la récupération des statistiques:', err));
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div style={{ width: '100%' }}>
      <h3>Statistiques des Interventions</h3>

      {/* Statut des Interventions */}
      {/* <div style={{ width: '100%', height: 300 }}>
        <h4>Statut des Interventions</h4>
        <ResponsiveContainer>
          <BarChart data={interventionStats}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

      {/* Nombre d'Interventions par Mois */}
      <div style={{ width: '100%', height: 300, marginTop: 30 }}>
        <h4>Nombre d'Interventions par Mois</h4>
        <ResponsiveContainer>
          <LineChart data={monthlyStats}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Clients avec le Plus d'Interventions */}
      <div style={{ width: '100%', height: 300, marginTop: 30 }}>
        <h4>Clients avec le Plus d'Interventions</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={topClients}
              dataKey="count"
              nameKey="client"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {topClients.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InterventionStatusChart;
