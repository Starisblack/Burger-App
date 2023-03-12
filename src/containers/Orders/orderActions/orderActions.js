
import { doc, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";


const orderActions = () => {

    const updateOrder = async (id)=>{

        const orderDocRef = doc(db, "orders", id)
          try{
            await updateDoc(orderDocRef, {
                orderStatus: "cancelled",
                created: Timestamp.now()
            })
            
          } catch (err) {
            alert(err)
          }
      }

      const deleteOrder = async (id)=>{

        const orderDocRef = doc(db, 'orders', id)
          try{
            await deleteDoc(orderDocRef)
             
          } catch (err) {
            alert(err)
          }
      }
      
  return {updateOrder, deleteOrder};
 
}


export default orderActions;