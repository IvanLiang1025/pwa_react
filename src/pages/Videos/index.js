
import React from 'react';
import {
  Row,
  Col,
} from 'antd';


export default class Video extends React.PureComponent {

  render() {

    const responsiveController = {
      xs: 24,
      md: 16,
      lg: 8
    }

    return (
      <div>
        <div>
          test cache image/video resource located at aws s3
             {/*  test fetch server image*/}
          <img width={100} height={100} src={"https://res.trustiics.com/res-localdev/B1ON19980686ROKxZcvAt20210110212148.jpg"}></img>
        </div>
        <Row>
          <Col>
            <video crossOrigin='anonymous' id="video" controls width='100%' height='100%' controlslist='nodownload' disablePictureInPicture>
              <source src={'https://res.trustiics.com/Webinar_Video_without_Captions.mp4'}  type="video/mp4" />
            </video>
          </Col>
          <Col>
            <video crossOrigin='anonymous' id="video" controls width='100%' height='100%' controlslist='nodownload' disablePictureInPicture>
              <source src={'https://res.trustiics.com/Webinar_Video_without_Captions.mp4'} type="video/mp4" />
            </video>
          </Col>
        </Row>
      </div>
    )
  }
}