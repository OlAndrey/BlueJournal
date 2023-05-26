import React from 'react'
import { Carousel, Modal } from 'react-bootstrap'

const MediaViewer = ({
  setShow,
  title = '',
  show = false,
  selectMedia = 0,
  mediaFiles = []
}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="xl"
      centered
      contentClassName="modal-media-files"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel
          interval={null}
          indicators={false}
          defaultActiveIndex={selectMedia}
          fade
        >
          {mediaFiles.map((file, index) => (
            <Carousel.Item key={index}>
              {file.type.includes('video') ? (
                <video width="100%" height="100%" controls>
                  <source src={file.src} />
                </video>
              ) : (
                <div className="media-files-item">
                  <div
                    style={{
                      backgroundImage: `url('${file.src}')`
                    }}
                  ></div>
                </div>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  )
}

export default MediaViewer
