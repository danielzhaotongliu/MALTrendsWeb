import React from 'react';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

class TimeSeries extends React.PureComponent {
  render() {
    const { scores, selectedId } = this.props;
    return (
      <ResponsiveContainer height="80%" width={700}>
        <LineChart data={scores[selectedId]} height={400} width={700}>
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="date_time" />
          <YAxis yAxisId="left" />
          <YAxis orientation="right" yAxisId="right" />
          <Tooltip />
          <Legend />
          <Line dataKey="score" stroke="#8884d8" type="monotone" yAxisId="left" />
          <Line dataKey="members" stroke="#82ca9d" type="monotone" yAxisId="right" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scores: state.anime.scores,
    selectedId: state.anime.selectedId,
  };
};

export default connect(mapStateToProps)(TimeSeries);
