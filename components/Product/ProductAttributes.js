import {Header,Button, Modal} from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import {useRouter} from 'next/router';
import React from 'react';
function ProductAttributes({description,_id,user}) {
      const isAdminOrRoot=user && (user.role==='root' || user.role==='admin');
  const [modal,setModal]=React.useState(false);
  const router=useRouter();
  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/");
  }
  return (<>
     <Header as="h3">About this product</Header>
     <p>{description}</p>
     {isAdminOrRoot &&
     <>
     <Button 
        icon="trash alternate outline" 
        color="red"
        content="Delete product"
        onClick={()=>setModal(true)}

     />
     <Modal open={modal} dimmer="blurring">
       <Modal.Header>Confirm Delete</Modal.Header>
       <Modal.Content>
         <p>
           Are you sure you want to delete this item?
         </p>
       </Modal.Content>
       <Modal.Actions>
         <Button onClick={()=>setModal(false)} content="Cancel"/>
         <Button 
          negative
          icon="trash"
          content="Delete"
          labelPosition="right"
          onClick={handleDelete}
          />
       </Modal.Actions>

     </Modal>
     
     </>}

  </>);
}

export default ProductAttributes;
