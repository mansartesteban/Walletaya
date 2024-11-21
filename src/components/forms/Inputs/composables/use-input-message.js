const useInputMessage = (messages) => {
  if (!messages) messages = [];
  if (typeof messages === "string") {
    return [
      {
        severity: "error",
        text: messages,
      },
    ];
  }

  if (typeof messages === "object" && !Array.isArray(messages)) {
    if (!messages.severity) {
      messages.severity = "error";
    }
    if (!messages.text) {
      messages.text = "Une erreur est survenue";
    }
    return [messages];
  }

  if (Array.isArray(messages)) {
    messages = messages.map((message) => {
      if (!message.severity) {
        message.severity = "error";
      }
      if (!message.text) {
        message.text = "Une erreur est survenue";
      }
      return message;
    });
    return messages;
  }

  return [
    {
      severity: "error",
      message: "Une erreur est survenue",
    },
  ];
};

export default useInputMessage;
