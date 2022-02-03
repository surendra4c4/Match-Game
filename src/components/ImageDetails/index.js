import './index.css'

const ImageDetails = props => {
  const {images, imageIsClicked} = props
  const {imageUrl, thumbnailUrl} = images

  const checkImageId = () => {
    imageIsClicked(imageUrl)
  }

  return (
    <li className="image-list-item">
      <button type="button" className="image-btn" onClick={checkImageId}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default ImageDetails
