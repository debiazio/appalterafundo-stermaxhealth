import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './PlenaHotspots.css'

type Hotspot = {
  id: string
  title: string
  description: string
  left: number
  top: number
  cardLeft?: number
  cardTop?: number
}

const IMAGE_URL = 'https://stermax.com.br/images_idealine/frente-verso.webp'

const HOTSPOTS: Hotspot[] = [
  {
    id: 'manual',
    title: 'Acesse o Manual',
    description:
      'Escaneie o QR Code para acessar o manual completo de forma rápida e prática. Tenha sempre à mão todas as instruções de uso, orientações técnicas e recomendações diretamente no seu celular.',
    left: 19.2,
    top: 49.0,
    cardLeft: 7.2,
    cardTop: 26,
  },
  {
    id: 'visor-digital',
    title: 'Visor Digital',
    description:
      'Acompanhe em tempo real todas as informações do ciclo de esterilização. Permite também o ajuste de temperaturas antes do início do processo, garantindo mais controle e precisão na operação.',
    left: 31.2,
    top: 48.2,
    cardLeft: 21,
    cardTop: 26,
  },
  {
    id: 'manipulo',
    title: 'Manípulo de Fechamento',
    description:
      'Sistema desenvolvido para proporcionar vedação segura durante os ciclos de esterilização. Garante o fechamento adequado do equipamento, evitando vazamentos e aumentando a segurança no uso.',
    left: 45.4,
    top: 48.3,
    cardLeft: 35,
    cardTop: 23,
  },
  {
    id: 'disjuntor',
    title: 'Disjuntor Liga/Desliga',
    description:
      'Permite ligar e desligar o equipamento com praticidade. Também pode ser utilizado como um recurso de segurança, interrompendo o funcionamento em situações necessárias.',
    left: 86.5,
    top: 28.2,
    cardLeft: 74.5,
    cardTop: 31.5,
  },
  {
    id: 'despressurizacao',
    title: 'Botão de Despressurização',
    description:
      'Responsável por liberar toda a pressão interna ao final do ciclo de esterilização, proporcionando mais segurança na abertura do equipamento.',
    left: 43.1,
    top: 70.2,
    cardLeft: 30,
    cardTop: 47,
  },
  {
    id: 'bocal-vapor',
    title: 'Bocal de Saída de Vapor',
    description:
      'Local por onde ocorre a liberação do vapor durante o ciclo. Acompanha mangueira para direcionamento adequado até um recipiente de descarte, mantendo o ambiente mais seguro e organizado.',
    left: 56.4,
    top: 60.1,
    cardLeft: 45.5,
    cardTop: 34.5,
  },
  {
    id: 'cabo-forca',
    title: 'Cabo de Força Bivolt',
    description:
      'Responsável pela conexão do equipamento à rede elétrica. Compatível com diferentes tensões, oferecendo mais praticidade na instalação.',
    left: 93,
    top: 81,
    cardLeft: 74.5,
    cardTop: 56.5,
  },
]

const PlenaHotspots: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const activeHotspot = useMemo(() => {
    return HOTSPOTS.find(item => item.id === activeId) ?? null
  }, [activeId])

  useEffect(() => {
    if (!activeId) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement | null

      if (!target) return

      const clickedInsideCard =
        !!cardRef.current && cardRef.current.contains(target)

      const clickedOnAnyPin = !!target.closest(`.${styles.plenaHotspots__pin}`)

      if (!clickedInsideCard && !clickedOnAnyPin) {
        setActiveId(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [activeId])

  const handleToggleHotspot = (id: string) => {
    setActiveId(current => (current === id ? null : id))
  }

  const handleClose = () => {
    setActiveId(null)
  }

  return (
    <section className={styles.plenaHotspots}>
      <div className={styles.plenaHotspots__stage}>
        <img
          src={IMAGE_URL}
          alt="Vista frontal e traseira do equipamento Plena com pontos interativos"
          className={styles.plenaHotspots__image}
        />

        {HOTSPOTS.map(hotspot => {
          const isActive = hotspot.id === activeId

          return (
            <button
              key={hotspot.id}
              type="button"
              className={`${styles.plenaHotspots__pin} ${
                isActive ? styles['plenaHotspots__pin--active'] : ''
              }`}
              style={{
                left: `${hotspot.left}%`,
                top: `${hotspot.top}%`,
              }}
              onClick={() => handleToggleHotspot(hotspot.id)}
              aria-label={isActive ? `Fechar ${hotspot.title}` : hotspot.title}
              aria-pressed={isActive}
            >
              <span
                className={`${styles.plenaHotspots__pinInner} ${
                  isActive ? styles['plenaHotspots__pinInner--active'] : ''
                }`}
              >
                {isActive ? '×' : '+'}
              </span>
            </button>
          )
        })}

        {activeHotspot && (
          <div
            ref={cardRef}
            className={styles.plenaHotspots__card}
            style={{
              left: `${activeHotspot.cardLeft ?? activeHotspot.left}%`,
              top: `${activeHotspot.cardTop ?? activeHotspot.top}%`,
            }}
          >
            <button
              type="button"
              className={styles.plenaHotspots__close}
              onClick={handleClose}
              aria-label="Fechar"
            >
              ×
            </button>

            <h3 className={styles.plenaHotspots__cardTitle}>
              {activeHotspot.title}
            </h3>
            <p className={styles.plenaHotspots__cardText}>
              {activeHotspot.description}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PlenaHotspots
