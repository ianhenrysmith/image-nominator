'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchRandomFeaturedImages } from './utils/wikimedia'

interface WikimediaImage {
  title: string
  url: string
  thumbnailUrl: string
  description: string
}

export default function Home() {
  const [images, setImages] = useState<WikimediaImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<WikimediaImage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    fetchRandomImages()
  }, [retryCount])

  const fetchRandomImages = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedImages = await fetchRandomFeaturedImages(24)
      setImages(fetchedImages)
    } catch (error) {
      console.error('Error fetching images:', error)
      setError('Failed to load images. Please try again later.')
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
        }, 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = (image: WikimediaImage) => {
    setSelectedImage(image)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'relative', padding: '1rem' }}>
        <header style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Image Nominator
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4B5563' }}>
            Vote for your favorite image to inspire this week's AI art creations
          </p>
        </header>

        {error && (
          <div style={{ position: 'relative', textAlign: 'center', color: '#DC2626', backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: '0.5rem' }}>
            {error}
            {retryCount < 3 ? (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Retrying in a moment...</p>
            ) : (
              <button
                onClick={() => {
                  setRetryCount(0)
                  fetchRandomImages()
                }}
                style={{ marginLeft: '1rem', color: '#DC2626', textDecoration: 'underline' }}
              >
                Try Again
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite', border: '4px solid #3B82F6', borderTopColor: 'transparent', borderRadius: '50%', width: '2rem', height: '2rem' }}></div>
            <p style={{ marginTop: '0.5rem', color: '#4B5563' }}>Loading images...</p>
          </div>
        ) : (
          <div style={{ 
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
            gap: '0.5rem',
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '1rem'
          }}>
            {images.map((image) => (
              <div
                key={image.url}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.2s',
                  transform: selectedImage?.url === image.url ? 'scale(1.05)' : 'scale(1)',
                  border: selectedImage?.url === image.url ? '4px solid #3B82F6' : 'none'
                }}
                onClick={() => handleImageSelect(image)}
              >
                <div style={{ position: 'relative', width: '16rem', height: '16rem' }}>
                  <Image
                    src={image.thumbnailUrl}
                    alt={image.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="256px"
                    quality={60}
                    priority={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKCD/2wBDARUXFy4eHhsUHSQkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKCD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  opacity: 0,
                  transition: 'opacity 0.2s'
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.5rem', color: 'white' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{image.title}</h3>
                    <p style={{ fontSize: '0.625rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '1rem', boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '32rem', height: '32rem', flexShrink: 0 }}>
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                sizes="512px"
                quality={80}
                priority={true}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: '600', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{selectedImage.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1rem' }}>{selectedImage.description}</p>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>Image URL:</p>
                <a 
                  href={selectedImage.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '0.75rem', 
                    color: '#3B82F6', 
                    wordBreak: 'break-all',
                    textDecoration: 'underline'
                  }}
                >
                  {selectedImage.url}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  style={{ backgroundColor: '#E5E7EB', color: '#1F2937', padding: '0.5rem 1.5rem', borderRadius: '0.5rem' }}
                  onClick={() => setSelectedImage(null)}
                >
                  Cancel
                </button>
                <button
                  style={{ backgroundColor: '#3B82F6', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem' }}
                  onClick={() => {
                    // TODO: Implement vote submission
                    alert('Vote submitted!')
                  }}
                >
                  Vote for this image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 