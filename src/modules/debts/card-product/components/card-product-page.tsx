// @/modules/debts/card-product/components/card-product-page.tsx

'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { CardProductDeleteModal } from '@/modules/debts/card-product/components/card-product-delete-modal';
import { CardProductFormModal } from '@/modules/debts/card-product/components/card-product-form-modal';
import { CardProductGrid } from '@/modules/debts/card-product/components/card-product-grid';
import type { CardProduct } from '@/modules/debts/card-product/schemas/card-product.schema';
import { PageHeader } from '@/shared/components/page/page-header';

type CardProductPageProps = {
  products: CardProduct[];
};

export function CardProductPage({
  products,
}: CardProductPageProps) {
  const [formOpen, setFormOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<CardProduct | null>(null);

  const [deleteProduct, setDeleteProduct] =
    useState<CardProduct | null>(null);

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (
    product: CardProduct,
  ) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Administración"
          title="Productos de tarjeta"
          description="Administra el catálogo de productos que los usuarios pueden asociar a sus tarjetas."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />

              Nuevo producto
            </button>
          }
        />

        <CardProductGrid
          products={products}
          onEdit={handleEdit}
          onDelete={setDeleteProduct}
        />
      </section>

      <CardProductFormModal
        open={formOpen}
        product={selectedProduct}
        onClose={handleCloseForm}
      />

      <CardProductDeleteModal
        product={deleteProduct}
        onClose={() =>
          setDeleteProduct(null)
        }
      />
    </>
  );
}