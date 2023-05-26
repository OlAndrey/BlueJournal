import { React } from "react";

const ViewerAttachFiles = ({files, setFiles}) => {
    return (
        files.map((media, i) => {
            if (!media.type.includes('video')) {
              let reader = new FileReader()
              reader.readAsDataURL(media)
              reader.onload = function () {
                document.querySelector('#attach-img-' + i).src = reader.result
              }
            }
            return (
              <div key={i} className="progress prog-img">
                <img
                  id={'attach-img-' + i}
                  alt={media.name}
                  src={
                    media.type.includes('video')
                      ? 'https://firebasestorage.googleapis.com/v0/b/network-bd4d1.appspot.com/o/video-icon.svg?alt=media&token=6200ed4e-efa4-4316-b681-35358fda89b0'
                      : ''
                  }
                />
                <div className="progress-bar" role="progressbar" />
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() =>
                    setFiles(files.filter((item, ind) => ind !== i))
                  }
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )
          })
    )
}

export default ViewerAttachFiles