import dayjs from 'dayjs'

export const normalizeDialog = (dialog, userId) => {
  try {
    let wasTitleStatus = false
    let wasStatusSended = false
    const newDialog = []

    if (!dialog) return newDialog

    dialog.forEach((item, i) => {
      if (i === 0 || dialog[i - 1]) {
        const first = dayjs((i === 0 ? item : dialog[i - 1]).date)
        const second = dayjs(item.date)
        const diff = second.$W - first.$W

        if (i === 0 || diff) {
          newDialog.push({
            type: 'title',
            id: `item-title-${item.id}`,
            date: item.date
          })
        }
        if (
          item.status === 'sended' &&
          !wasTitleStatus &&
          item.is !== userId &&
          !wasStatusSended
        ) {
          wasTitleStatus = true
          wasStatusSended = true
          newDialog.push({
            type: 'status',
            id: `title-status-${item.id}`,
            date: item.date
          })
        }
      }

      if (
        i === 0 ||
        item.is !== dialog[i - 1].is ||
        wasStatusSended ||
        newDialog[newDialog.length - 1].type !== 'message'
      ) {
        wasStatusSended = false
        newDialog.push({
          type: 'message',
          id: `item-message-${item.id}`,
          isReverse: item.is === userId,
          isRemovable: item.is === userId,
          messages: [
            {
              text: item.message,
              id: item.id,
              audioSrc: item.audioSrc,
              src: item.src,
              date: item.date,
              status: item.status,
              path: item.path,
              isDeleted: item.isDeleted
            }
          ]
        })
      } else {
        const position = newDialog.length - 1

        newDialog[position] = {
          ...newDialog[position],
          messages: newDialog[position].messages.concat({
            text: item.message,
            status: item.status,
            id: item.id,
            audioSrc: item.audioSrc,
            src: item.src,
            date: item.date,
            path: item.path,
            isDeleted: item.isDeleted
          })
        }
      }
    })

    return newDialog
  } catch (error) {
    console.error(error);
    return {error: "Something went wrong!"}
  }
}
