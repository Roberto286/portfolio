import { ImageResponse } from '@vercel/og';

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Blog Post';
    const description = searchParams.get('description') || '';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#1a1a2e',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#16213e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '28px',
                color: '#e94560',
                fontWeight: 'bold',
              }}
            >
              R
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#eaeaea',
                fontWeight: '500',
              }}
            >
              Roberto Saliola
            </div>
          </div>
          
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: '1.2',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          
          {description && (
            <div
              style={{
                fontSize: '28px',
                color: '#a0a0a0',
                maxWidth: '900px',
                lineHeight: '1.4',
              }}
            >
              {description.length > 120 ? description.substring(0, 120) + '...' : description}
            </div>
          )}
          
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '20px',
              color: '#e94560',
              fontWeight: '600',
            }}
          >
            robertosaliola.dev
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}

export const config = {
  runtime: 'edge',
};
