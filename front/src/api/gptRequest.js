const URL = "https://api.openai.com/v1/chat/completions";

export async function sendMessageToOpenAI(message) {
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${message}` }],
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return response.choices[0].message.content;
}
