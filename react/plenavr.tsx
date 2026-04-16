import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IMAGE_BASES } from './config/imageBases'

const BASE_URL = IMAGE_BASES.plenaVr

const MAX_SUFFIX = 18
const HORIZONTAL_STEP = 18
const VERTICAL_STEP = 42

const VERTICAL_ORDER = [4, 3, 2, 1, 0, 5, 6, 7, 8]

// Inicia em 6_3
const INITIAL_VERTICAL_INDEX = 6
const INITIAL_SUFFIX = 3

const plenavr: React.FC = () => {
  const [verticalIndex, setVerticalIndex] = useState(INITIAL_VERTICAL_INDEX)
  const [suffix, setSuffix] = useState(INITIAL_SUFFIX)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const accXRef = useRef(0)
  const accYRef = useRef(0)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const prefix = VERTICAL_ORDER[verticalIndex]

  const imageUrl = useMemo(() => {
    return `${BASE_URL}/${prefix}_${suffix}.webp`
  }, [prefix, suffix])

  const getPointerPosition = (
    event: React.MouseEvent | React.TouchEvent
  ): { clientX: number; clientY: number } => {
    if ('touches' in event) {
      const touch = event.touches[0]

      return {
        clientX: touch.clientX,
        clientY: touch.clientY,
      }
    }

    return {
      clientX: event.clientX,
      clientY: event.clientY,
    }
  }

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = getPointerPosition(event)

    setIsDragging(true)
    startXRef.current = clientX
    startYRef.current = clientY
    accXRef.current = 0
    accYRef.current = 0
  }

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const { clientX, clientY } = getPointerPosition(event)

    const deltaX = clientX - startXRef.current
    const deltaY = clientY - startYRef.current

    startXRef.current = clientX
    startYRef.current = clientY

    accXRef.current += deltaX
    accYRef.current += deltaY

    while (Math.abs(accXRef.current) >= HORIZONTAL_STEP) {
      if (accXRef.current > 0) {
        setSuffix(prev => (prev + 1) % (MAX_SUFFIX + 1))
        accXRef.current -= HORIZONTAL_STEP
      } else {
        setSuffix(prev => (prev === 0 ? MAX_SUFFIX : prev - 1))
        accXRef.current += HORIZONTAL_STEP
      }
    }

    while (Math.abs(accYRef.current) >= VERTICAL_STEP) {
      if (accYRef.current < 0) {
        setVerticalIndex(prev =>
          Math.min(prev + 1, VERTICAL_ORDER.length - 1)
        )
        accYRef.current += VERTICAL_STEP
      } else {
        setVerticalIndex(prev => Math.max(prev - 1, 0))
        accYRef.current -= VERTICAL_STEP
      }
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
    accXRef.current = 0
    accYRef.current = 0
  }

  return (
    <div
      style={{
        width: '100%',
        userSelect: 'none',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {!isDragging && (
          <>
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '15px' : '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                textAlign: 'center',
                pointerEvents: 'none',
                color: 'rgb(31, 31, 31)',
                padding: '0px 16px',
                width: isMobile ? 'max-content' : undefined,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 400,
                }}
              >
                Clique e arraste:
              </span>

              <strong
                style={{
                  display: 'block',
                  fontSize: '20px',
                  lineHeight: '26px',
                  fontWeight: 700,
                }}
              >
                Explore a plenitude em cada ângulo
              </strong>
            </div>

            <img
              src="https://stermaxhealth.vtexassets.com/assets/vtex.file-manager-graphql/images/985c1059-565b-44b7-b879-98584bc5461f___8665119b974beeab48b9a8a1cc644a67.webp"
              alt="Ícone de interação"
              draggable={false}
              style={{
                position: 'absolute',
                bottom: isMobile ? '10px' : '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                width: isMobile ? '36px' : '56px',
                height: isMobile ? '36px' : '56px',
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
          </>
        )}

        <img
          src={imageUrl}
          alt={`Imagem 360 ${prefix}_${suffix}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          draggable={false}
          style={{
            width: '100%',
            display: 'block',
            cursor: isDragging ? 'grabbing' : 'grab',
            margin: '0px',
            boxShadow: 'white 1px 1px 74px',
            borderRadius: '25px',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  )
}

export default plenavr
