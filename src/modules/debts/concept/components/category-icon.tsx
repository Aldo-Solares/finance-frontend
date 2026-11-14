// @/modules/debts/concept/components/category-icon.tsx
import { createElement } from 'react'

import {
  BookOpen,
  BusFront,
  CarFront,
  Clapperboard,
  FileText,
  Gift,
  HeartPulse,
  House,
  Laptop,
  PawPrint,
  Percent,
  Plane,
  Repeat2,
  Shirt,
  ShoppingBasket,
  Tag,
  Utensils,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const CATEGORY_ICONS: [string[], LucideIcon][] = [
  [['regalo'], Gift],
  [['supermercado', 'despensa'], ShoppingBasket],
  [['restaurante', 'comida', 'alimento'], Utensils],
  [['ropa', 'vestuario'], Shirt],
  [['hogar', 'casa'], House],
  [['auto', 'automovil', 'coche'], CarFront],
  [['transporte', 'gasolina'], BusFront],
  [['entretenimiento', 'cine'], Clapperboard],
  [['suscrip'], Repeat2],
  [['educacion', 'escuela'], BookOpen],
  [['salud', 'medico', 'farmacia'], HeartPulse],
  [['mascota'], PawPrint],
  [['viaje', 'hotel'], Plane],
  [['servicio', 'mantenimiento'], Wrench],
  [['tramite', 'impuesto'], FileText],
  [['comision', 'interes'], Percent],
  [['tecnologia', 'electronica'], Laptop],
]

export function getCategoryIcon(categoryName: string): LucideIcon {
  const normalizedName = categoryName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX')

  return (
    CATEGORY_ICONS.find(([keywords]) =>
      keywords.some((keyword) => normalizedName.includes(keyword)),
    )?.[1] ?? Tag
  )
}

export function CategoryIconView({
  categoryName,
  className,
}: {
  categoryName: string
  className?: string
}) {
  return createElement(getCategoryIcon(categoryName), {
    className,
    'aria-hidden': true,
  })
}
