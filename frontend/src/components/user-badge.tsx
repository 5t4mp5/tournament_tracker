import * as React from 'react';
const { useEffect } = React;
import { connect } from 'react-redux';
import { User, fetchUser } from '../store/user';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../store';

interface PropsUserBadge {
  avatar?: string;
  username?: string;
  fetchUser: (id: string) => Promise<void>;
}

const _UserBadge = (props: PropsUserBadge) => {
  const { avatar, username, fetchUser } = props;
  useEffect(() => {
    fetchUser('7b5485f9-1f69-4f5a-871a-c56e6b43ab20').catch((e) =>
      console.error(e)
    );
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '120px',
        height: '120px',
      }}
    >
      <img
        src={avatar}
        style={{ height: '80%', width: '80%', borderRadius: '50%' }}
      />
      <span>{username}</span>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  avatar: state.user.avatar,
  username: state.user.username,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<User, undefined, Action>
) => ({
  fetchUser: (id: string) => dispatch(fetchUser(id)),
});

export const UserBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserBadge);
