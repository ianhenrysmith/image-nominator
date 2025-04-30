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
      const fetchedImages = await fetchRandomFeaturedImages(6)
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
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Image Nominator</h1>
        <p className="text-xl text-gray-600">Vote for your favorite image to inspire this week's AI art creations</p>
      </header>

      {error && (
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
          {error}
          {retryCount < 3 ? (
            <p className="mt-2 text-sm">Retrying in a moment...</p>
          ) : (
            <button
              onClick={() => {
                setRetryCount(0)
                fetchRandomImages()
              }}
              className="ml-4 text-red-600 underline hover:text-red-700"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading images...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-4xl mx-auto">
          {images.map((image) => (
            <div
              key={image.url}
              className={`relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                selectedImage?.url === image.url ? 'ring-4 ring-primary' : ''
              }`}
              onClick={() => handleImageSelect(image)}
            >
              <div className="w-32 h-32 relative">
                <Image
                  src={image.thumbnailUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="128px"
                  quality={60}
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKCD/2wBDARUXFy4eHhsUHSQkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKSAkKCD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                  <h3 className="font-semibold text-xs line-clamp-1">{image.title}</h3>
                  <p className="text-[10px] line-clamp-2">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{selectedImage.title}</h3>
              <p className="text-sm text-gray-600">{selectedImage.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
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
      )}
    </div>
  )
} 