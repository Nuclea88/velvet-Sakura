import { describe, it, expect } from "vitest";
import {
  selectTarotCards,
  assignPositions,
  canReveal,
  parseTarotCard,
} from "./componentTarotLogic";

describe("Tarot card selection logic", () => {
  it("returns exactly 3 unique cards from the deck", () => {
    const deck = ["A", "B", "C", "D", "E"];

    const result = selectTarotCards(deck);

    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3);
  });

  it("throws an error if the deck has less than 3 cards", () => {
    const deck = ["A", "B"];

    expect(() => selectTarotCards(deck)).toThrow();
  });

  it("assigns cards to past, present and future positions", () => {
    const cards = ["The Fool", "The Magician", "The Empress"];

    const spread = assignPositions(cards);

    expect(spread).toEqual({
      past: "The Fool",
      present: "The Magician",
      future: "The Empress",
    });
  });

  it("does not allow reveal with less than 3 cards or more than 3 cards", () => {
    expect(canReveal([])).toBe(false);
    expect(canReveal(["A"])).toBe(false);
    expect(canReveal(["A", "B"])).toBe(false);
    expect(canReveal(["A", "B", "C", "D"])).toBe(false);
  });

  it("allows reveal only when exactly 3 cards are selected", () => {
    expect(canReveal(["A", "B", "C"])).toBe(true);
  });

  it("parses tarot card data coming from the API", () => {
    const apiCard = {
      name: "The Fool",
      meaning: "New beginnings, optimism, trust in life",
      image: "https://example.com/fool.jpg",
      id: 0,
      randomField: "should not be used",
    };

    const parsedCard = parseTarotCard(apiCard);

    expect(parsedCard).toEqual({
      name: "The Fool",
      meaning: "New beginnings, optimism, trust in life",
      image: "https://example.com/fool.jpg",
    });
  });

  it("throws an error if API card data is invalid", () => {
    const invalidApiCard = {
      name: "The Fool",
    };

    expect(() => parseTarotCard(invalidApiCard)).toThrow();
  });
});
