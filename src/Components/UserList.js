import User from "./User";

function UserList(props){

    return (
        <div className={'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'}>
            {props.users.map(user => <User userData={user}/>)}
        </div>
        )
}

export default UserList;