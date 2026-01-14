import asyncHandler from "../../utils/asyncHandler.js";
import { checkActiveStatus } from "../../utils/guards.js";
import { getItemWithTax } from "./item.repository.js";
import { resolvePricing } from "../pricing/pricing.service.js";
import { resolveTax } from "../../services/tax.service.js";

export const getItemPrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const at= req.query.at;//time in HH:MM format

  const item= await getItemWithTax(id);
  console.log(item);

  checkActiveStatus(item);

  const pricing = resolvePricing(item, at);
  
  if(!pricing.available){
    return res.status(200).json({
      available: false,

    });
  }

  const tax= resolveTax(item);

  const taxAmount= tax.tax_applicable ? (pricing.base_price * tax.tax_percentage) / 100 : 0;

  const finalPrice= pricing.base_price + taxAmount;

  return res.status(200).json({
    available: true,
    pricing_type: pricing.pricing_type,
    base_price: pricing.base_price,
    tax_percentage: tax.tax_percentage,
    tax_amount: taxAmount,
    final_price: finalPrice
  });
});
