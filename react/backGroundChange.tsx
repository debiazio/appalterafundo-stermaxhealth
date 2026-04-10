import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import GET_PRODUCT_ID from './graphql/getProductId.graphql'

function Bundle() {
  const productContext = useProduct()
  const slug = productContext?.product?.linkText

  const [productId, setProductId] = useState<string | undefined>()

  const { data, loading } = useQuery(GET_PRODUCT_ID, {
    variables: { slug },
    skip: !slug,
  })

  useEffect(() => {
    if (!loading && data?.product?.productId) {
      setProductId(data.product.productId)
    }
  }, [loading, data])

  useEffect(() => {
    const bgEl = document.querySelector(
      '.vtex-flex-layout-0-x-flexRowContent--conteiner-background-custom'
    ) as HTMLElement | null

    const validIdsSweetPink = ['2945', '2946', '2951']
    const validIdsSweetBlack = ['2947', '2948', '2962']
    const validIdsPerola = ['2797', '2887']
    const validIdsRoseGold = ['2796', '2886']
    const validIdsRosa = ['2795', '2885']
    const validIdsGlowin = ['2954', '2955', '2960']
    const validIdsMarcelo = ['2902', '2798']
    const validIdsSweetSilver = ['2974']

    if (bgEl) {
      if (validIdsSweetPink.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/sweet-pink-5litros-fundo-pdp.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      } else if (validIdsSweetBlack.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-sweet-black.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      } else if (validIdsPerola.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-perola.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'
      } else if (validIdsRoseGold.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-rose-gold.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      } else if (validIdsRosa.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-rosa.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      } else if (validIdsGlowin.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/glowin.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      } else if (validIdsMarcelo.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/fundo-marcelo-brito.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      }
      else if (validIdsSweetSilver.includes(productId || '')) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico/sweet-silver-fundo-pdp.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'

      }
       else {
        bgEl.style.backgroundImage = ''
        bgEl.style.backgroundSize = ''
        bgEl.style.backgroundRepeat = ''
        bgEl.style.backgroundPosition = ''
      }
    }

    // ====== EFEITO DA BORDA DO SELETOR DE CORES  ======
    // Mapa direto ID -> classe
    const idToClass: Record<string, string> = {
      // Rosa
      '2795': 'vtex-store-link-0-x-childrenContainer--link-bell-rosa',
      '2885': 'vtex-store-link-0-x-childrenContainer--link-bell-rosa',
      // Rose Gold
      '2796': 'vtex-store-link-0-x-childrenContainer--link-bell-rose-gold',
      '2886': 'vtex-store-link-0-x-childrenContainer--link-bell-rose-gold',
      // Pérola
      '2797': 'vtex-store-link-0-x-childrenContainer--link-bell-perola',
      '2887': 'vtex-store-link-0-x-childrenContainer--link-bell-perola',
      // Sweet Pink
      '2945': 'vtex-store-link-0-x-childrenContainer--link-sweet-pink',
      '2946': 'vtex-store-link-0-x-childrenContainer--link-sweet-pink',
      // Sweet Black
      '2947': 'vtex-store-link-0-x-childrenContainer--link-sweet-black',
      '2948': 'vtex-store-link-0-x-childrenContainer--link-sweet-black',
      // Glowin
      '2954': 'vtex-store-link-0-x-childrenContainer--link-glowin',
      '2955': 'vtex-store-link-0-x-childrenContainer--link-glowin',
      // Miniatura marcelo brito
      '2902': 'vtex-store-link-0-x-childrenContainer--link-marcelo-brito',
      '2798': 'vtex-store-link-0-x-childrenContainer--link-marcelo-brito',
      // Sweet Silver
      '2974': 'vtex-store-link-0-x-childrenContainer--link-sweet-silver',
    }

    const allTargetClasses = Array.from(new Set(Object.values(idToClass)))

    // Função utilitária para limpar as bordas de todas as classes alvo
    const clearAllBorders = () => {
      allTargetClasses.forEach(cls => {
        document.querySelectorAll(`.${cls}`).forEach(node => {
          ;(node as HTMLElement).style.border = ''
        })
      })
    }

    // Sempre limpa antes de aplicar (muda de produto, navegação de PDP, etc.)
    clearAllBorders()

    // Se não tiver productId, nada pra aplicar
    if (!productId) return

    const targetClass = idToClass[productId]
    let observer: MutationObserver | null = null

    // Aplica borda na(s) ocorrência(s) da classe
    const applyBorder = () => {
      if (!targetClass) return false
      const nodes = document.querySelectorAll(`.${targetClass}`)
      if (nodes.length === 0) return false
      nodes.forEach(node => {
        ;(node as HTMLElement).style.border = '2px solid #FEBBCE'
      })
      return true
    }

    // Tenta aplicar imediatamente; se não existir no DOM ainda, observa até aparecer
    if (!applyBorder() && targetClass) {
      observer = new MutationObserver(() => {
        if (applyBorder()) {
          observer?.disconnect()
          observer = null
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }


    return () => {
      if (observer) observer.disconnect()
      clearAllBorders()
    }
  }, [productId])

  return null
}

export default Bundle
