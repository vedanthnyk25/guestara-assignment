export function checkActiveStatus(item) {

  if(!item || !item.item_active || !item.category_active){
    const err= new Error('Item is inactive or does not exist');
    err.status= 404;
    throw err;
  } 
}
