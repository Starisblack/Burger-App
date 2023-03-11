
import "./Order.css"

const Order = (props) => {

     const ingredients = [];

     for (let ingreName in props.ingredients){
          
          ingredients.push({
            name: ingreName,
            amount: props.ingredients[ingreName]
          })
     }

     const ingredientOutput = ingredients.map(ig => {
        
        return <span style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px"
            }} 
            key={ig.name}>
            {ig.name}  ({ig.amount})
            
            </span>
     })
 

 return (
    <div className="Order">
        <p>Ingredients: {ingredientOutput} </p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>
 )

}


export default Order;

