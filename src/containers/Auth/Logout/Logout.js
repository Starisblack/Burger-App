import { useEffect } from "react"
import { connect } from "react-redux"
import {logout} from "../../../store/actions/Auth"
import Redirect from "../../../components/Redirect/Redirect"

const Logout = (props) => {
   

    useEffect( ()=>{
        props.logOut()
    })

    return <Redirect to="/"/>

}

const mapDispatchToProps = dispatch => {
    return {
        logOut: ()=> {dispatch(logout())}
    }
}

export default connect(null, mapDispatchToProps)(Logout)