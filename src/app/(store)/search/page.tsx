import { api } from '@/app/data/api'
import { Product } from '@/app/data/types/types'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export async function generateMetadata({
  searchParams: { q }
}: SearchProps): Promise<Metadata> {
  return {
    title: `Busca por ${q}`
  }
}

async function searchProduct(search: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${search}`, {
    next: {
      revalidate: 60 * 60
    }
  })

  const product = await response.json()

  return product
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  const produts = await searchProduct(query)

  if (!query) {
    redirect('/')
  }

  return (
    <div className='flex flex-col gap-4'>
      <p>
        Resultado para: <span className='font-semibold'>{query}</span>
      </p>

      <div className='grid grid-cols-3 gap-6'>
        {produts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className=' group relative  rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end'
          >
            <Image
              src={product.image}
              width={480}
              height={480}
              alt=''
              quality={100}
              className='group-hover:scale-105 transition-transform duration-500'
            />

            <div className='absolute bottom-16 right-10 h-12 flex items-center gap-2 max-w-[320px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5'>
              <span className='text-sm truncate'>{product.title}</span>
              <span className='flex  h-full items-center justify-center rounded-full bg-violet-500 px-4  font-semibold'>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
