import React, { Component } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'
import './iphone.min.css'

class Screen extends Component {

  // Speed up calls to hasOwnProperty
  hasOwnProperty = Object.prototype.hasOwnProperty;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {}

  isEmpty = (obj) => {
    // null and undefined are "empty"
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  render() {
    const screenStyles = {
      background: '#fff',
      height: '100%',
      display: 'block',
      overflowY: 'auto',
      overflowX: 'hidden',
      width: '100%',
      zIndex: '99',
    }
    let appMockup = classNames('qcontainer', { showMockup: !this.isEmpty(this.props.appData) })
    let defaultView = classNames('qcontainer', { defaultView: this.isEmpty(this.props.appData) })
    let settings = {
    	dots: false,
      nextArrow: false,
      prevArrow:false,
      autoplay: false,
      arrows: false,
    }
    let imgs = this.props.screenshots.map((screenshot, index) => {
      return (
        <div key={index}>
          <img className="ui image" src={ screenshot } width="90%" alt="sceenshot" />
        </div>
      )
    })
    return (
      <div style={screenStyles}>
        <div className={defaultView}>
          <h3 className="defaultView__text">Нет данных</h3>
        </div>
        <div className={appMockup}>
          <div className="qrow">
            <div className="app-logo">
              <img className="app-logo__img wireframe image" src={this.props.appData.artworkUrl512} alt={this.props.appData.trackCensoredName} />
            </div>
            <div className="app-desc">
              <div className="qrow">
                <div className="app-name-block">
                  <h3 className="app-name">
                    {this.props.appData.trackCensoredName}
                  </h3>
                </div>
                <div className="app-rating-block">
                  <p className="app-rating">{this.props.appData.contentAdvisoryRating}</p>
                </div>
              </div>
              <h4 className="app-dev">
                {this.props.appData.sellerName}
              </h4>
              <p className="app-alert">
                Включает встроенные покупки
              </p>
              <button className="app-download">{ parseInt(this.props.appData.price) === 0 ? 'загрузить' : this.props.appData.price + ' ' + this.props.appData.currency }</button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="qrow">
            <div className="ui buttons three-btns">
              <div className="ui button qbtn active">Подробнее</div>
              <div className="ui button qbtn">Отзывы</div>
              <div className="ui button qbtn">Похожие</div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="qrow">
            {
              imgs.length > 0 ?
                <Slider {...settings}>{ imgs }</Slider> :
                null
            }
            
          </div>
          <div className="divider"></div>
          <div className="qrow">
            <h2 className="description-header">Описание</h2>
            <p className="description-text">{ this.props.appData.description }</p>
          </div>
        </div>
      </div>
    );
  }
}

Screen.propTypes = {
  screenshots: React.PropTypes.array.isRequired,
};

Screen.defaultProps = {
  screenshots: [],
}

export default Screen;