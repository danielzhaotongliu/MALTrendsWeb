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
import moment from 'moment';

class TimeSeries extends React.PureComponent {
  render() {
    const { scores, selectedId } = this.props;
    return (
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={scores[selectedId]}>
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis
            dataKey="date_time"
            tickFormatter={(timeStr) => moment.utc(timeStr).format('YYYY-MM-DD')}
            // NOTE: later if switching to timestamp implementation, uncomment code below
            // domain={['auto', 'auto']}
            // scale="time"
            // type="number"
          />
          <YAxis domain={['auto', 'auto']} type="number" yAxisId="left" />
          <YAxis domain={['auto', 'auto']} orientation="right" type="number" yAxisId="right" />
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
