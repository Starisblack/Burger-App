
import "./Input.css";


const Input = (props) => {

        let  inputElement = null;

        const inputClasses = ["InputElement"];

        if(props.invalid && props.shouldValidate && props.touched) {
            inputClasses.push("inValid");
        }
      

         switch (props.elementType) {

            case ("input") : 
                inputElement = <input   className={inputClasses.join(" ")}  {...props.elementConfig}  {...props.registerForm}  />
                break;

            case ("textarea") :    
                inputElement = <textarea className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
                break;

            case ("select") :    
                inputElement = <select {...props.registerForm}  className={inputClasses.join(" ")}  value={props.value}>

                            {props.elementConfig.options.map( option => {
                                return <option key={option.value} value={option.value} >{option.displayValue}</option>
                            })}
                    
                </select>
                break;
             
            default:
                
                inputElement = <input  onChange={props.changed} className="InputElement"  {...props}  />
            
            break;

         }



    
    
    return (
        <div className="Input">

            <label className="Label">{props.label}</label>
            {inputElement}

        </div>
    )
}


export default Input