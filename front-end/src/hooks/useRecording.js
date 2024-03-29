import { useState, useEffect } from 'react'
export async function startRecording(setRecorderState) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export function saveRecording(recorder) {
  if (recorder.state !== 'inactive') recorder.stop()
}

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null
}

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState)

  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recordingInterval = null

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval)
            return prevState
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1
            }

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0
            }
        })
      }, 1000)
    else clearInterval(recordingInterval)

    return () => clearInterval(recordingInterval)
  })

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream)
        }
      })
  }, [recorderState.mediaStream])

  useEffect(() => {
    const recorder = recorderState.mediaRecorder
    let chunks = []

    if (recorder && recorder.state === 'inactive') {
      recorder.start()

      recorder.ondataavailable = (e) => {
        chunks.push(e.data)
      }

      recorder.onstop = () => {
        const chunk = chunks
        chunks = []

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: chunk
            }
          else return initialState
        })
      }
    }

    return () => {
      if (recorder)
        recorder.stream.getAudioTracks().forEach((track) => track.stop())
    }
  }, [recorderState.mediaRecorder])

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder)
  }
}
