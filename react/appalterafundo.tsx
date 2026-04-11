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
        const mainImageEl = document.querySelector(
      '.vtex-store-components-3-x-productImageTag.vtex-store-components-3-x-productImageTag--main'
    ) as HTMLElement | null

    const hideMainImageForIds = ['2890']

    if (mainImageEl) {
      if (hideMainImageForIds.indexOf(productId || '') !== -1) {
        mainImageEl.style.opacity = '0'
        mainImageEl.style.pointerEvents = 'none'
      } else {
        mainImageEl.style.opacity = '1'
        mainImageEl.style.pointerEvents = ''
      }
    }

    // Fundo dinâmico do container PDP
    const bgEl = document.querySelector(
      '.vtex-flex-layout-0-x-flexRow--linha-dinamic-background-imagem-pdp'
    ) as HTMLElement | null

    const validIdsPlena42 = ['2890']

    if (bgEl) {
      if (validIdsPlena42.indexOf(productId || '') !== -1) {
        bgEl.style.backgroundImage =
          'url(https://stermax.com.br/images_idealine/fundo-dinamico-stermaxhealth/fundo-dinamic-plena-42-aumentado.webp)'
        bgEl.style.backgroundSize = 'cover'
        bgEl.style.backgroundRepeat = 'no-repeat'
        bgEl.style.backgroundPosition = 'center'
      } else {
        bgEl.style.backgroundImage = ''
        bgEl.style.backgroundSize = ''
        bgEl.style.backgroundRepeat = ''
        bgEl.style.backgroundPosition = ''
      }
    }

    // ====== EFEITO DA BORDA DO SELETOR DE CORES ======
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

    const allTargetClasses = Object.keys(idToClass).map(key => idToClass[key])

    const uniqueTargetClasses = allTargetClasses.filter((value, index, self) => {
      return self.indexOf(value) === index
    })

    const clearAllBorders = () => {
      uniqueTargetClasses.forEach(cls => {
        document.querySelectorAll(`.${cls}`).forEach(node => {
          ;(node as HTMLElement).style.border = ''
        })
      })
    }

    clearAllBorders()

    if (!productId) return

    const targetClass = idToClass[productId]
    let observer: MutationObserver | null = null

    const applyBorder = () => {
      if (!targetClass) return false

      const nodes = document.querySelectorAll(`.${targetClass}`)

      if (nodes.length === 0) return false

      nodes.forEach(node => {
        ;(node as HTMLElement).style.border = '2px solid #FEBBCE'
      })

      return true
    }

    if (!applyBorder() && targetClass) {
      observer = new MutationObserver(() => {
        if (applyBorder()) {
          observer?.disconnect()
          observer = null
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      if (observer) observer.disconnect()

      clearAllBorders()

      if (bgEl) {
        bgEl.style.backgroundImage = ''
        bgEl.style.backgroundSize = ''
        bgEl.style.backgroundRepeat = ''
        bgEl.style.backgroundPosition = ''
      }
    }
  }, [productId])

  return null
}

export default Bundle
