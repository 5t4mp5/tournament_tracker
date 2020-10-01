import * as React from 'react';

//Components
import { UserBadge } from './user-badge';
import { Table } from './table';

export function App() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UserBadge />
      </div>
      <Table />
    </div>
  );
}
