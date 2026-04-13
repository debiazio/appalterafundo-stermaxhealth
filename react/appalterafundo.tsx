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

    const hideMainImageForIds = ['2976']
    const isDesktop = window.innerWidth >= 1000

    if (mainImageEl) {
      if (
        hideMainImageForIds.indexOf(productId || '') !== -1 &&
        isDesktop
      ) {
        mainImageEl.style.opacity = '0'
        mainImageEl.style.pointerEvents = 'none'
      } else {
        mainImageEl.style.opacity = '1'
        mainImageEl.style.pointerEvents = ''
      }
    }

    const bgEl = document.querySelector(
      '.vtex-flex-layout-0-x-flexRow--linha-dinamic-background-imagem-pdp'
    ) as HTMLElement | null

    const validIdsPlena42 = ['2976']

    const desktopBackground =
      'url(https://stermax.com.br/images_idealine/fundo-dinamico-stermaxhealth/tamanho1.webp)'

    const mediumBackground =
      'url(https://stermax.com.br/images_idealine/fundo-dinamico-stermaxhealth/tamanho2.webp)'

    const smallBackground =
      'url(https://stermax.com.br/images_idealine/fundo-dinamico-stermaxhealth/tamanho3-alt.webp)'

    const moreSmallBackground =
      'url(https://stermax.com.br/images_idealine/fundo-dinamico-stermaxhealth/tamanho7.webp)'

    const getBackgroundByWidth = () => {
      if (window.innerWidth < 1295) return moreSmallBackground
      if (window.innerWidth < 1450) return smallBackground
      if (window.innerWidth < 1660) return mediumBackground
      return desktopBackground
    }

    if (bgEl) {
      if (validIdsPlena42.indexOf(productId || '') !== -1) {
        bgEl.style.backgroundImage = getBackgroundByWidth()
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

    const idToClass: Record<string, string> = {
      '2795': 'vtex-store-link-0-x-childrenContainer--link-bell-rosa',
      '2885': 'vtex-store-link-0-x-childrenContainer--link-bell-rosa',
      '2796': 'vtex-store-link-0-x-childrenContainer--link-bell-rose-gold',
      '2886': 'vtex-store-link-0-x-childrenContainer--link-bell-rose-gold',
      '2797': 'vtex-store-link-0-x-childrenContainer--link-bell-perola',
      '2887': 'vtex-store-link-0-x-childrenContainer--link-bell-perola',
      '2945': 'vtex-store-link-0-x-childrenContainer--link-sweet-pink',
      '2946': 'vtex-store-link-0-x-childrenContainer--link-sweet-pink',
      '2947': 'vtex-store-link-0-x-childrenContainer--link-sweet-black',
      '2948': 'vtex-store-link-0-x-childrenContainer--link-sweet-black',
      '2954': 'vtex-store-link-0-x-childrenContainer--link-glowin',
      '2955': 'vtex-store-link-0-x-childrenContainer--link-glowin',
      '2902': 'vtex-store-link-0-x-childrenContainer--link-marcelo-brito',
      '2798': 'vtex-store-link-0-x-childrenContainer--link-marcelo-brito',
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

    const handleResize = () => {
      if (mainImageEl) {
        const shouldHideMainImage =
          hideMainImageForIds.indexOf(productId || '') !== -1 &&
          window.innerWidth >= 1024

        if (shouldHideMainImage) {
          mainImageEl.style.opacity = '0'
          mainImageEl.style.pointerEvents = 'none'
        } else {
          mainImageEl.style.opacity = '1'
          mainImageEl.style.pointerEvents = ''
        }
      }

      if (!bgEl) return
      if (validIdsPlena42.indexOf(productId || '') === -1) return

      bgEl.style.backgroundImage = getBackgroundByWidth()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (observer) observer.disconnect()

      clearAllBorders()
      window.removeEventListener('resize', handleResize)

      if (mainImageEl) {
        mainImageEl.style.opacity = '1'
        mainImageEl.style.pointerEvents = ''
      }

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
