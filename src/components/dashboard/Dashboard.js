import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteUser, clearProfile } from '../../actions/profileactions'

const Dashboard = ({ dispatch, auth, profile }) => {
    const admin = auth.user && auth.user.role;
    const url = admin !== "admin" ? '/api/profile/me' : '/api/profile';
    useEffect(() => {
        !isEmpty(admin) &&
            dispatch(getCurrentProfile(url));
        return () => dispatch(clearProfile());
    }, [admin]);
    const deleteHandler = (id) => {
        dispatch(deleteUser(id));
        dispatch(getCurrentProfile(url));
    };
    if (Array.isArray(profile)) {
        return (
            <div>
                {<p className="alert alert-info mt-3"><b>Admin can Only Delete Users</b></p>}
                {isEmpty(profile) && <p className="alert alert-danger mt-3">No Accounts</p>}
                {profile && profile.map(profiles =>
                    <div className="card mt-3">
                        <div className="card-header">
                            <b>NAME - </b>
                            {profiles.user && profiles.user.name}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><b>ACCOUNT NUMBER - </b>{profiles.accountNumber}</h5>
                            <p className="card-text"><b>BALANCE - </b>{profiles.balance}</p>
                            <p className="card-text"><b>ACCOUNT TYPE - </b>{profiles.accountType}</p>
                            <p className="card-text"><b>LAST TRANSACTION - </b>{profiles.lastTransactionDate}</p>
                            <Link to='/update' className="btn btn-primary">Update</Link>{'  '}
                            <Link onClick={() => { deleteHandler(profiles.user['_id']) }} className="btn btn-danger">Delete</Link>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                {!profile && <Link to='/update' className="btn btn-primary mt-3">Add Account</Link>}
                {profile &&
                    <div className="card mt-3">
                        <div className="card-header">
                            <b>NAME - </b>
                            {profile.user && profile.user.name}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><b>ACCOUNT NUMBER - </b>{profile.accountNumber}</h5>
                            <p className="card-text"><b>BALANCE - </b>{profile.balance}</p>
                            <p className="card-text"><b>ACCOUNT TYPE - </b>{profile.accountType}</p>
                            <p className="card-text"><b>LAST TRANSACTION - </b>{profile.lastTransactionDate}</p>
                            <Link to='/update' className="btn btn-primary">Update</Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    auth: state.auth
});
export default connect(mapStateToProps)(Dashboard);