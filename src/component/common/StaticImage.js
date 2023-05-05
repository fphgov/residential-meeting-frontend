import Image from 'next/image'

const imageSrcLoader = ({ src }) => {
  return `/image/${src}`
}

const StaticImage = ({ src, alt, ...rest }) => {
  return (
    <Image src={imageSrcLoader({ src })} alt={alt} {...rest} />
  )
}

export default StaticImage
