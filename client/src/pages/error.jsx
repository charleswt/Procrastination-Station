import { useRouteError } from 'react-router-dom';

export default function Error(){
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1> Page Not Found!</h1> <br></br>
            <p> There was an issue loading your page! </p>
        </div>
    );
}