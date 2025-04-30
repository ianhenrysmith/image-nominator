import axios from 'axios'

interface WikimediaImage {
  title: string
  url: string
  thumbnailUrl: string
  description: string
}

export async function fetchRandomFeaturedImages(count: number = 6): Promise<WikimediaImage[]> {
  try {
    // First, get random images from Wikimedia Commons
    const response = await axios.get('https://commons.wikimedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        generator: 'random',
        grnnamespace: '6', // File namespace
        grnlimit: count,
        prop: 'imageinfo',
        iiprop: 'url|extmetadata|thumbmime',
        iiurlwidth: 200,
        iiurlheight: 200,
        origin: '*'
      }
    })

    console.log('Raw API Response:', response.data)

    if (!response.data?.query?.pages) {
      console.error('Unexpected API response structure:', response.data)
      throw new Error('Invalid API response format')
    }

    const pages = response.data.query.pages
    const images = Object.values(pages).map((page: any) => {
      const imageInfo = page.imageinfo?.[0]
      return {
        title: page.title.replace('File:', ''),
        url: imageInfo?.url || '',
        thumbnailUrl: imageInfo?.thumburl || imageInfo?.url || '',
        description: imageInfo?.extmetadata?.ImageDescription?.value || 'No description available'
      }
    }).filter((img: WikimediaImage) => img.url && img.thumbnailUrl)

    console.log('Processed images:', images)

    if (images.length === 0) {
      throw new Error('No valid images could be loaded')
    }

    return images
  } catch (error) {
    console.error('Error in fetchRandomFeaturedImages:', error)
    throw error
  }
} 