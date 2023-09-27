import { expect, it } from "@jest/globals";
import { abbreviate_number } from "../../helpers/utils";

it("should abbreviate numbers correctly", () => {
  // Test cases for numbers less than 1000
  expect(abbreviate_number(1)).toBe("1");
  expect(abbreviate_number(99)).toBe("99");
  expect(abbreviate_number(999)).toBe("999");
  expect(abbreviate_number(1245)).toBe("1.2K");

  // Test cases for numbers between 1000 and 9999
  expect(abbreviate_number(4353)).toBe("4.4K");
  expect(abbreviate_number(9999)).toBe("10K");

  // Test cases for numbers between 10000 and 99999
  expect(abbreviate_number(12345)).toBe("12.3K");
  expect(abbreviate_number(99239)).toBe("99.2K");

  // Test cases for numbers between 100000 and 999999
  expect(abbreviate_number(123281)).toBe("123.3K");

  // Test cases for numbers above 1000000
  expect(abbreviate_number(1500000)).toBe("1.5M");
  expect(abbreviate_number(9999999)).toBe("10M");
});
