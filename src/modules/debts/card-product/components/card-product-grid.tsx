// @/modules/debts/card-product/components/card-product-grid.tsx

'use client';

import { CardProductEmptyState } from '@/modules/debts/card-product/components/card-product-empty-state';
import { CardProductItem } from '@/modules/debts/card-product/components/card-product-item';
import type { CardProduct } from '@/modules/debts/card-product/schemas/card-product.schema';

type CardProductGridProps = {
  products: CardProduct[];
  onEdit: (product: CardProduct) => void;
  onDelete: (product: CardProduct) => void;
};

export function CardProductGrid({
  products,
  onEdit,
  onDelete,
}: CardProductGridProps) {
  if (products.length === 0) {
    return <CardProductEmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <CardProductItem
          key={product.productId}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}