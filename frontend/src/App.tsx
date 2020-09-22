import * as React from 'react';
import axios from 'axios';

export function App() {
  axios
    .get('/api/user/0b9c18f1-21f7-427a-ab59-e3416f20a7ca')
    .then((res) => console.log('DATA', res.data));
  return <h1>PLACEHOLDER</h1>;
}
