import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO: test show up, need to get list from backend
const animes = [
  { name: 'Sword Art Online' },
  { name: 'Sword Art Online II' },
  { name: 'Clannad' },
  { name: 'Clannad After Story' },
  { name: 'Azur Lane' },
  { name: 'test' },
  { name: 'test1' },
  { name: 'test2' },
  { name: 'test3' },
  { name: 'test4' },
  { name: 'test5' },
  { name: 'test6' },
  { name: 'test7' },
  { name: 'test8' },
  { name: 'test9' },
  { name: 'test0' },
];

export default function FreeSolo() {
  return (
    <div style={{ width: 220 }}>
      <Autocomplete
        freeSolo
        id="anime-search"
        options={animes.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label="Search..." margin="normal" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
}
