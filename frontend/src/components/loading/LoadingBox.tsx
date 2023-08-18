import './loading.scss'

export default function LoadingBox() {
  return (
    <div className='loading'>
      <div className='loadingContainer'>
          <div className="ring"></div>
          <span>Loading...</span>
        </div>
    </div>
  )
}