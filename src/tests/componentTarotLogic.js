export function selectTarotCards(deck) {
  if (!Array.isArray(deck) || deck.length < 3) {
    throw new Error("Invalid tarot deck");
  }

  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export function assignPositions(cards) {
  if (!Array.isArray(cards) || cards.length !== 3) {
    throw new Error("Exactly 3 cards are required");
  }

  return {
    past: cards[0],
    present: cards[1],
    future: cards[2],
  };
}

export function canReveal(cards) {
  return Array.isArray(cards) && cards.length === 3;
}

export function parseTarotCard(apiCard) {
  if (
    !apiCard ||
    typeof apiCard.name !== "string" ||
    typeof apiCard.meaning !== "string" ||
    typeof apiCard.image !== "string"
  ) {
    throw new Error("Invalid tarot card data");
  }

  return {
    name: apiCard.name,
    meaning: apiCard.meaning,
    image: apiCard.image,
  };
}
