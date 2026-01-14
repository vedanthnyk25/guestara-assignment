import { pool } from "../../config/db.js";

export async function getItemWithTax(itemId) {
  const { rows } = await pool.query(
    `
    SELECT
      i.id,
      i.pricing_type,
      i.pricing_config,
      i.is_active AS item_active,

      c.tax_applicable AS category_tax_applicable,
      c.tax_percentage AS category_tax_percentage,
      c.is_active AS category_active,

      ito.tax_applicable AS item_tax_applicable,
      ito.tax_percentage AS item_tax_percentage
    FROM items i
    JOIN categories c ON c.id = i.category_id
    LEFT JOIN item_tax_override ito ON ito.item_id = i.id
    WHERE i.id = $1
    `,
    [itemId]
  );

  return rows[0];
}
