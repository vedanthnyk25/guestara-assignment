export function resolveTax(itemRow) {
  
  if(itemRow.item_tax_applicable!== null) {
    
    return {
      tax_applicable: itemRow.item_tax_applicable,
      tax_percentage: itemRow.item_tax_percentage
    };

  } else {
    return {
      tax_applicable: itemRow.category_tax_applicable,
      tax_percentage: itemRow.category_tax_percentage
    };    
  }
} 
