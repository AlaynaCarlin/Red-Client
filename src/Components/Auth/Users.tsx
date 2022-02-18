import React from "react";
import { Button, Table } from "reactstrap";
import APIURL from "../../helpers/environment";

type Props = {
    token: string,
    usersOff: () => void
}

type State = {
    userArr: User[],
}

export interface User {
    id: string,
    username: string,
    admin: boolean
}

class Users extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            userArr: [],
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        console.log('fetch users', this.state.userArr);
        fetch(`${APIURL}/user/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((userData) => {
                this.setState({
                    userArr: userData.users
                })
                console.log(this.state.userArr);
            }).catch((error) => console.log(error));
    }

    usersMapper = () => {
        console.log('user mapper')
        return this.state.userArr.map((user: User, idx: number) => {
            return (
                <tr key={idx}>
                    <td>{user.username}</td>
                    <td><Button id="Btns" onClick={() => { this.deleteUsers(user) }}>Delete</Button></td>
                </tr>
            )
        })
    }

    deleteUsers = (user: User) => {
        console.log('delete user');
        fetch(`${APIURL}/user/delete/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchUsers())
    }

    render() {
        return (
            <div className="users">
                <hr />
                <h3>users</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersMapper()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Users;