export default async function getAIMoveFromOpenRouter(
  board: (string | null)[],
  isEasyMode: boolean
) {
  const systemPrompt = `
    You are a smart Tic Tac Toe AI playing as "O".

    Your goal:
    1. Win if possible
    2. Block the opponent if they are about to win
    3. Otherwise: choose center > corner > side

    Only return ONE number (0-8). Do not explain
    `;

  const userPrompt = `
    Current board: ${JSON.stringify(board)}

    Each cell is indexed like this:
    [0][1][2]
    [3][4][5]
    [6][7][8]

    "O" = you (AI)
    "X" = human
    null = empty

    What is your move?
    `;

  const getMove = async () => {
    const apiKey: string = import.meta.env.VITE_OPENROUTER_API_KEY;
    const preferredModel: string = isEasyMode
      ? "anthropic/claude-3-haiku"
      : "deepseek/deepseek-r1";
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: preferredModel,
          temperature: 0.2, // enough for logical thinking
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok)
      throw new Error(
        `OpenRouter Error: ${response.status} ${response.statusText}`
      );
    const data = await response?.json();

    const text = data.choices?.[0]?.message?.content?.trim();

    const match = text?.match(/\d+/);

    return match ? parseInt(match[0], 10) : null;
  };

  try {
    let move = await getMove();
    return move;
  } catch (error) {
    console.log("AI Error: ", error);

    const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];

    return preferredOrder.find((i) => board[i] === null) ?? null;
  }
}
