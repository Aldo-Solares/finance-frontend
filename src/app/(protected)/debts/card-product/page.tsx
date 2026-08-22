// @/app/(protected)/admin/card-product/page.tsx

import { CardProductPage } from '@/modules/debts/card-product/components/card-product-page';
import { findAllCardProducts } from '@/modules/debts/card-product/services/card-product.service';

export default async function CardProductRoutePage() {
  const products = await findAllCardProducts();

  return (
    <CardProductPage
      products={products}
    />
  );
}