import {Li, Heading, Para, Img} from './style'

const PackgaeList = props => {
  const {data} = props
  const {imageUrl, description, name} = data
  return (
    <Li>
      <Img src={imageUrl} alt={name} />
      <div
        style={{
          padding: '1% 4%',
        }}
      >
        <Heading>{name}</Heading>
        <Para>{description}</Para>
      </div>
    </Li>
  )
}

export default PackgaeList
