'use client'

import { useCallback, useMemo } from 'react'
import { useCart } from '../contexts/cart-context'
import { Product } from '../data/types/types'

interface ButtonAddCartProps {
  product: Product
}

export function ButtonAddCart({ product }: ButtonAddCartProps) {
  const { items, addToCart } = useCart()

  const itemAdded = useMemo(
    () => items.some((item) => item.productId === product.id),
    [items, product]
  )

  const handleAddToCart = useCallback(() => {
    addToCart(product.id)
  }, [addToCart, product.id])

  return (
    <button
      onClick={handleAddToCart}
      type='button'
      className='mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white'
    >
      {itemAdded ? 'Item adicionado' : 'Adicionar ao carrinho'}
    </button>
  )
}
