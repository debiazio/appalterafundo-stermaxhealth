import React, { useLayoutEffect } from 'react'
import { useProduct } from 'vtex.product-context'

const TARGET_PRODUCT_ID = '2976'

const FOOTER_SELECTOR = '.vtex-store-footer-2-x-footerLayout'

const FOOTER_ROW_SELECTOR =
  '.vtex-flex-layout-0-x-flexRow.vtex-flex-layout-0-x-flexRow--container-footer-digitando'

const FOOTER_FINAL_ROW_SELECTOR =
  '.vtex-flex-layout-0-x-flexRow.vtex-flex-layout-0-x-flexRow--linha-final-footer'

const FOOTER_TEXT_SELECTOR =
  '.lh-copy.vtex-rich-text-0-x-paragraph.vtex-rich-text-0-x-paragraph--texto-digitando'

const HEADER_TOP_SELECTOR =
  '.vtex-flex-layout-0-x-flexRowContent.vtex-flex-layout-0-x-flexRowContent--topo-1-header'

const HEADER_MENU_LINK_SELECTOR =
  '.vtex-menu-2-x-styledLinkContent.flex.justify-between.nowrap'

const LOGO_SELECTOR =
  '.vtex-store-components-3-x-logoImage.vtex-store-components-3-x-logoImage--logo'

const FOOTER_REDES_IMAGE_SELECTOR =
  '.vtex-store-components-3-x-imageElement.vtex-store-components-3-x-imageElement--img-footer-redes'

const BUTTON_SELECTOR =
  '.vtex-button.bw1.ba.fw5.v-mid.relative.pa0.lh-solid.br2.min-h-regular.t-action.bg-action-primary.b--action-primary.c-on-action-primary.hover-bg-action-primary.hover-b--action-primary.hover-c-on-action-primary.pointer'

const PRODUCT_BRAND_QUICKVIEW_SELECTOR =
  '.vtex-store-components-3-x-productBrand.vtex-store-components-3-x-productBrand--quickview'

const FOOTER_CLASS_ACTIVE = 'footer-plena'
const FOOTER_ROW_CLASS_ACTIVE = 'footer-digitando-plena'
const FOOTER_FINAL_ROW_CLASS_ACTIVE = 'footer-linha-final-plena'
const FOOTER_TEXT_CLASS_ACTIVE = 'footer-texto-digitando-plena'
const HEADER_TOP_CLASS_ACTIVE = 'header-topo-plena'
const HEADER_MENU_LINK_CLASS_ACTIVE = 'header-menu-link-plena'
const LOGO_CLASS_ACTIVE = 'logo-plena'
const FOOTER_REDES_IMAGE_CLASS_ACTIVE = 'img-footer-redes-plena'
const BUTTON_CLASS_ACTIVE = 'button-plena'
const PRODUCT_BRAND_QUICKVIEW_CLASS_ACTIVE = 'product-brand-quickview-plena'

const GRADIENT_REVERSED = 'linear-gradient(to right, #8435DE, #A30D87)'
const FOOTER_ROW_COLOR = '#FF7500'
const FOOTER_TEXT_COLOR = '#FFFFFF'
const HEADER_MENU_LINK_COLOR = '#FF7500'
const BUTTON_COLOR = '#8435DE'
const PRODUCT_BRAND_QUICKVIEW_COLOR = '#FF7500'

const NEW_LOGO_URL =
  'https://stermaxhealth.vtexassets.com/assets/vtex.file-manager-graphql/images/9d18bee6-a0dd-4942-8efe-d13a81399cb2___b27344b9507a5abda5a1a9b631911d51.png'

const NEW_FOOTER_REDES_IMAGE_URL =
  'https://stermaxhealth.vtexassets.com/assets/vtex.file-manager-graphql/images/b77e251c-13fe-4cdb-8c4c-55b8fad87392___ffcceff5d97635961f0a4daeb4ee5867.png'

const ORIGINAL_LOGO_SRC_ATTR = 'data-original-logo-src'
const ORIGINAL_LOGO_SRCSET_ATTR = 'data-original-logo-srcset'
const ORIGINAL_FOOTER_REDES_SRC_ATTR = 'data-original-footer-redes-src'
const ORIGINAL_FOOTER_REDES_SRCSET_ATTR = 'data-original-footer-redes-srcset'

const ProductThemeController: React.FC = () => {
  const productContext = useProduct()
  const product = productContext?.product

  useLayoutEffect(() => {
    const productId = String(product?.productId ?? '')
    const isTargetProduct = productId === TARGET_PRODUCT_ID

    let rafId = 0
    let retryTimeoutId = 0
    let observer: MutationObserver | null = null
    let attempts = 0

    const applyHeaderTheme = () => {
      const headerTop = document.querySelector(
        HEADER_TOP_SELECTOR
      ) as HTMLElement | null
      const headerMenuLinks = document.querySelectorAll(HEADER_MENU_LINK_SELECTOR)
      const logo = document.querySelector(LOGO_SELECTOR) as HTMLImageElement | null
      const buttons = document.querySelectorAll(BUTTON_SELECTOR)
      const productBrandsQuickview = document.querySelectorAll(
        PRODUCT_BRAND_QUICKVIEW_SELECTOR
      )

      if (headerTop) {
        headerTop.classList.remove(HEADER_TOP_CLASS_ACTIVE)
        headerTop.style.backgroundColor = ''
        headerTop.style.backgroundImage = ''

        if (isTargetProduct) {
          headerTop.classList.add(HEADER_TOP_CLASS_ACTIVE)
          headerTop.style.backgroundImage = GRADIENT_REVERSED
        }
      }

      headerMenuLinks.forEach(linkNode => {
        const link = linkNode as HTMLElement
        link.classList.remove(HEADER_MENU_LINK_CLASS_ACTIVE)
        link.style.color = ''

        if (isTargetProduct) {
          link.classList.add(HEADER_MENU_LINK_CLASS_ACTIVE)
          link.style.color = HEADER_MENU_LINK_COLOR
        }
      })

      buttons.forEach(buttonNode => {
        const button = buttonNode as HTMLElement
        button.classList.remove(BUTTON_CLASS_ACTIVE)
        button.style.backgroundColor = ''
        button.style.borderColor = ''
        button.style.backgroundImage = ''

        if (isTargetProduct) {
          button.classList.add(BUTTON_CLASS_ACTIVE)
          button.style.backgroundColor = BUTTON_COLOR
          button.style.borderColor = BUTTON_COLOR
        }
      })

      productBrandsQuickview.forEach(brandNode => {
        const brand = brandNode as HTMLElement
        brand.classList.remove(PRODUCT_BRAND_QUICKVIEW_CLASS_ACTIVE)
        brand.style.color = ''

        if (isTargetProduct) {
          brand.classList.add(PRODUCT_BRAND_QUICKVIEW_CLASS_ACTIVE)
          brand.style.color = PRODUCT_BRAND_QUICKVIEW_COLOR
        }
      })

      if (logo) {
        logo.classList.remove(LOGO_CLASS_ACTIVE)

        if (!logo.getAttribute(ORIGINAL_LOGO_SRC_ATTR)) {
          logo.setAttribute(
            ORIGINAL_LOGO_SRC_ATTR,
            logo.currentSrc || logo.src || ''
          )
        }

        if (!logo.getAttribute(ORIGINAL_LOGO_SRCSET_ATTR)) {
          logo.setAttribute(
            ORIGINAL_LOGO_SRCSET_ATTR,
            logo.getAttribute('srcset') || ''
          )
        }

        const originalSrc = logo.getAttribute(ORIGINAL_LOGO_SRC_ATTR) || ''
        const originalSrcSet = logo.getAttribute(ORIGINAL_LOGO_SRCSET_ATTR) || ''

        if (isTargetProduct) {
          if (logo.src !== NEW_LOGO_URL) {
            logo.classList.add(LOGO_CLASS_ACTIVE)
            logo.src = NEW_LOGO_URL
            logo.setAttribute('srcset', NEW_LOGO_URL)
          }
        } else {
          if (originalSrc && logo.src !== originalSrc) {
            logo.src = originalSrc
          }

          if (originalSrcSet) {
            logo.setAttribute('srcset', originalSrcSet)
          } else {
            logo.removeAttribute('srcset')
          }
        }
      }
    }

    const applyFooterTheme = () => {
      const footer = document.querySelector(FOOTER_SELECTOR) as HTMLElement | null
      const footerRow = document.querySelector(
        FOOTER_ROW_SELECTOR
      ) as HTMLElement | null
      const footerFinalRow = document.querySelector(
        FOOTER_FINAL_ROW_SELECTOR
      ) as HTMLElement | null
      const footerTexts = document.querySelectorAll(FOOTER_TEXT_SELECTOR)
      const footerRedesImages = document.querySelectorAll(
        FOOTER_REDES_IMAGE_SELECTOR
      ) as NodeListOf<HTMLImageElement>

      if (footer) {
        footer.classList.remove(FOOTER_CLASS_ACTIVE)
        footer.style.backgroundColor = ''
        footer.style.backgroundImage = ''
        footer.style.color = ''

        if (isTargetProduct) {
          footer.classList.add(FOOTER_CLASS_ACTIVE)
          footer.style.backgroundImage = GRADIENT_REVERSED
        }
      }

      if (footerRow) {
        footerRow.classList.remove(FOOTER_ROW_CLASS_ACTIVE)
        footerRow.style.backgroundColor = ''
        footerRow.style.backgroundImage = ''

        if (isTargetProduct) {
          footerRow.classList.add(FOOTER_ROW_CLASS_ACTIVE)
          footerRow.style.backgroundColor = FOOTER_ROW_COLOR
        }
      }

      if (footerFinalRow) {
        footerFinalRow.classList.remove(FOOTER_FINAL_ROW_CLASS_ACTIVE)
        footerFinalRow.style.backgroundColor = ''
        footerFinalRow.style.backgroundImage = ''

        if (isTargetProduct) {
          footerFinalRow.classList.add(FOOTER_FINAL_ROW_CLASS_ACTIVE)
          footerFinalRow.style.backgroundImage = GRADIENT_REVERSED
        }
      }

      footerTexts.forEach(textNode => {
        const text = textNode as HTMLElement
        text.classList.remove(FOOTER_TEXT_CLASS_ACTIVE)
        text.style.color = ''

        if (isTargetProduct) {
          text.classList.add(FOOTER_TEXT_CLASS_ACTIVE)
          text.style.color = FOOTER_TEXT_COLOR
        }
      })

      footerRedesImages.forEach(image => {
        image.classList.remove(FOOTER_REDES_IMAGE_CLASS_ACTIVE)

        if (!image.getAttribute(ORIGINAL_FOOTER_REDES_SRC_ATTR)) {
          image.setAttribute(
            ORIGINAL_FOOTER_REDES_SRC_ATTR,
            image.currentSrc || image.src || ''
          )
        }

        if (!image.getAttribute(ORIGINAL_FOOTER_REDES_SRCSET_ATTR)) {
          image.setAttribute(
            ORIGINAL_FOOTER_REDES_SRCSET_ATTR,
            image.getAttribute('srcset') || ''
          )
        }

        const originalSrc =
          image.getAttribute(ORIGINAL_FOOTER_REDES_SRC_ATTR) || ''
        const originalSrcSet =
          image.getAttribute(ORIGINAL_FOOTER_REDES_SRCSET_ATTR) || ''

        if (isTargetProduct) {
          if (image.src !== NEW_FOOTER_REDES_IMAGE_URL) {
            image.classList.add(FOOTER_REDES_IMAGE_CLASS_ACTIVE)
            image.src = NEW_FOOTER_REDES_IMAGE_URL
            image.setAttribute('srcset', NEW_FOOTER_REDES_IMAGE_URL)
          }
        } else {
          if (originalSrc && image.src !== originalSrc) {
            image.src = originalSrc
          }

          if (originalSrcSet) {
            image.setAttribute('srcset', originalSrcSet)
          } else {
            image.removeAttribute('srcset')
          }
        }
      })
    }

    const applyTheme = () => {
      applyHeaderTheme()
      applyFooterTheme()
    }

    const scheduleApply = () => {
      cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(() => {
        applyTheme()
      })
    }

    const hasTargets = () => {
      return Boolean(
        document.querySelector(HEADER_TOP_SELECTOR) ||
          document.querySelector(LOGO_SELECTOR) ||
          document.querySelector(HEADER_MENU_LINK_SELECTOR) ||
          document.querySelector(BUTTON_SELECTOR) ||
          document.querySelector(PRODUCT_BRAND_QUICKVIEW_SELECTOR) ||
          document.querySelector(FOOTER_SELECTOR) ||
          document.querySelector(FOOTER_ROW_SELECTOR) ||
          document.querySelector(FOOTER_FINAL_ROW_SELECTOR) ||
          document.querySelector(FOOTER_TEXT_SELECTOR) ||
          document.querySelector(FOOTER_REDES_IMAGE_SELECTOR)
      )
    }

    const tryApply = () => {
      scheduleApply()

      if (hasTargets()) {
        return
      }

      if (attempts >= 12) {
        return
      }

      attempts += 1
      retryTimeoutId = window.setTimeout(tryApply, 80)
    }

    tryApply()

    observer = new MutationObserver(() => {
      scheduleApply()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      if (observer) {
        observer.disconnect()
      }

      if (retryTimeoutId) {
        window.clearTimeout(retryTimeoutId)
      }

      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      const footer = document.querySelector(FOOTER_SELECTOR) as HTMLElement | null
      const footerRow = document.querySelector(
        FOOTER_ROW_SELECTOR
      ) as HTMLElement | null
      const footerFinalRow = document.querySelector(
        FOOTER_FINAL_ROW_SELECTOR
      ) as HTMLElement | null
      const footerTexts = document.querySelectorAll(FOOTER_TEXT_SELECTOR)
      const headerTop = document.querySelector(
        HEADER_TOP_SELECTOR
      ) as HTMLElement | null
      const headerMenuLinks = document.querySelectorAll(HEADER_MENU_LINK_SELECTOR)
      const buttons = document.querySelectorAll(BUTTON_SELECTOR)
      const productBrandsQuickview = document.querySelectorAll(
        PRODUCT_BRAND_QUICKVIEW_SELECTOR
      )
      const logo = document.querySelector(LOGO_SELECTOR) as HTMLImageElement | null
      const footerRedesImages = document.querySelectorAll(
        FOOTER_REDES_IMAGE_SELECTOR
      ) as NodeListOf<HTMLImageElement>

      if (footer) {
        footer.classList.remove(FOOTER_CLASS_ACTIVE)
        footer.style.backgroundColor = ''
        footer.style.backgroundImage = ''
        footer.style.color = ''
      }

      if (footerRow) {
        footerRow.classList.remove(FOOTER_ROW_CLASS_ACTIVE)
        footerRow.style.backgroundColor = ''
        footerRow.style.backgroundImage = ''
      }

      if (footerFinalRow) {
        footerFinalRow.classList.remove(FOOTER_FINAL_ROW_CLASS_ACTIVE)
        footerFinalRow.style.backgroundColor = ''
        footerFinalRow.style.backgroundImage = ''
      }

      if (headerTop) {
        headerTop.classList.remove(HEADER_TOP_CLASS_ACTIVE)
        headerTop.style.backgroundColor = ''
        headerTop.style.backgroundImage = ''
      }

      footerTexts.forEach(textNode => {
        const text = textNode as HTMLElement
        text.classList.remove(FOOTER_TEXT_CLASS_ACTIVE)
        text.style.color = ''
      })

      headerMenuLinks.forEach(linkNode => {
        const link = linkNode as HTMLElement
        link.classList.remove(HEADER_MENU_LINK_CLASS_ACTIVE)
        link.style.color = ''
      })

      buttons.forEach(buttonNode => {
        const button = buttonNode as HTMLElement
        button.classList.remove(BUTTON_CLASS_ACTIVE)
        button.style.backgroundColor = ''
        button.style.borderColor = ''
        button.style.backgroundImage = ''
      })

      productBrandsQuickview.forEach(brandNode => {
        const brand = brandNode as HTMLElement
        brand.classList.remove(PRODUCT_BRAND_QUICKVIEW_CLASS_ACTIVE)
        brand.style.color = ''
      })

      if (logo) {
        logo.classList.remove(LOGO_CLASS_ACTIVE)

        const originalSrc = logo.getAttribute(ORIGINAL_LOGO_SRC_ATTR) || ''
        const originalSrcSet = logo.getAttribute(ORIGINAL_LOGO_SRCSET_ATTR) || ''

        if (originalSrc) {
          logo.src = originalSrc
        }

        if (originalSrcSet) {
          logo.setAttribute('srcset', originalSrcSet)
        } else {
          logo.removeAttribute('srcset')
        }
      }

      footerRedesImages.forEach(image => {
        image.classList.remove(FOOTER_REDES_IMAGE_CLASS_ACTIVE)

        const originalSrc =
          image.getAttribute(ORIGINAL_FOOTER_REDES_SRC_ATTR) || ''
        const originalSrcSet =
          image.getAttribute(ORIGINAL_FOOTER_REDES_SRCSET_ATTR) || ''

        if (originalSrc) {
          image.src = originalSrc
        }

        if (originalSrcSet) {
          image.setAttribute('srcset', originalSrcSet)
        } else {
          image.removeAttribute('srcset')
        }
      })
    }
  }, [product])

  return null
}

export default ProductThemeController
