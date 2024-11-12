import { formatNumber, NUMBER_FORMAT } from "../src/utils/String";

describe("Function 'formatNumber'", () => {
  test("Plain numbers", () => {
    expect(formatNumber(1)).toBe("1");
    expect(formatNumber(9)).toBe("9");
    expect(formatNumber(10)).toBe("10");
    expect(formatNumber(99)).toBe("99");
    expect(formatNumber(1000000)).toBe("1 000 000");
    expect(formatNumber(9999999)).toBe("9 999 999");
    expect(formatNumber("1")).toBe("1");
    expect(formatNumber("9")).toBe("9");
    expect(formatNumber("10")).toBe("10");
    expect(formatNumber("99")).toBe("99");
    expect(formatNumber("1000000")).toBe("1 000 000");
    expect(formatNumber("9999999")).toBe("9 999 999");
  });
  test("Floating part", () => {
    expect(formatNumber(0.0)).toBe("0");
    expect(formatNumber(0.1)).toBe("0,1");
    expect(formatNumber(0.1)).toBe("0,1");
    expect(formatNumber(9.9999)).toBe("9,9999");
    expect(formatNumber("0.0")).toBe("0");
    expect(formatNumber("0.1")).toBe("0,1");
    expect(formatNumber("0.1000")).toBe("0,1");
    expect(formatNumber("9.9999")).toBe("9,9999");
    expect(formatNumber(9.9999, null, 2)).toBe("9,99");
    expect(formatNumber("9.9999", null, 2)).toBe("9,99");
    expect(formatNumber(9.9999, null, 0)).toBe("9");
    expect(formatNumber("9.9999", null, 0)).toBe("9");
  });
  test("Separators", () => {
    expect(formatNumber(9999999.9999, NUMBER_FORMAT.COMA_DOT)).toBe(
      "9,999,999.9999",
    );
    expect(formatNumber("9999999.9999", NUMBER_FORMAT.COMA_DOT)).toBe(
      "9,999,999.9999",
    );
    expect(formatNumber(9999999.9999, NUMBER_FORMAT.DOT_COMA)).toBe(
      "9.999.999,9999",
    );
    expect(formatNumber("9999999.9999", NUMBER_FORMAT.DOT_COMA)).toBe(
      "9.999.999,9999",
    );
    expect(formatNumber(9999999.9999, NUMBER_FORMAT.SPACE_COMA)).toBe(
      "9 999 999,9999",
    );
    expect(formatNumber("9999999.9999", NUMBER_FORMAT.SPACE_COMA)).toBe(
      "9 999 999,9999",
    );
    expect(formatNumber(9999999.9999, NUMBER_FORMAT.SPACE_DOT)).toBe(
      "9 999 999.9999",
    );
    expect(formatNumber("9999999.9999", NUMBER_FORMAT.SPACE_DOT)).toBe(
      "9 999 999.9999",
    );
  });
});
