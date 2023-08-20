import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'
import SlickListView from '../SlickList'

const ReactSlick = props => {
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  const settingsMobile = {
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
  }
  const {Books} = props
  return (
    <>
      <li className="slicker-container">
        <Slider {...settings}>
          {Books.map(each => (
            <SlickListView key={each.id} data={each} />
          ))}
        </Slider>
      </li>
      <li className="slicker-container-mobile">
        <Slider {...settingsMobile}>
          {Books.map(each => (
            <SlickListView key={each.id} data={each} />
          ))}
        </Slider>
      </li>
    </>
  )
}

export default ReactSlick
