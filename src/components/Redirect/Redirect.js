import { useNavigate } from "react-router";
import { useEffect } from "react";


function Redirect({ to }) {

    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

export default Redirect;