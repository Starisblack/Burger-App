import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog"
import { logout } from "../../../store/actions/Auth";

const Logout = (props) => {

    const navigate = useNavigate()
   
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate("/")
        
      };

      const yesHandler = (action)=> {
          props.logout()
    }

    return <ConfirmationDialog 
    title="Do you want to sign out?"
    open={open}
    handleClose={handleClose}
    yesHandler={yesHandler}
    />

}

const mapDispatchToProps = dispatch => {
    return {
        logout: ()=> dispatch(logout())
    }
}



export default connect(null, mapDispatchToProps)(Logout);


