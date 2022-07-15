export default function reducer(state, action) {
    switch (action.type) {
      case "remove-message":
        return {
          ...state,
          messages: state.messages.filter(
            (message) => message.id !== action.payload
          ),
        };
  
      case "add-message":
        return {
          ...state,
          messages: state.messages.concat(action.payload),
        };
  
      default:
        throw new Error("Unknown action type");
    }
  }