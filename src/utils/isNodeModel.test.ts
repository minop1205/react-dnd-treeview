import { isNodeModel } from "./isNodeModel";

describe("isNodeModel", () => {
  test("returns true if the object has id, parent, and text properties", () => {
    expect(isNodeModel({ id: 1, parent: 0, text: "foo" })).toBe(true);
    expect(
      isNodeModel({
        id: 1,
        parent: 0,
        text: "foo",
        droppable: true,
        data: {},
      })
    ).toBe(true);
  });

  test("returns false if the object does not have id, parent, and text properties", () => {
    expect(isNodeModel({ parent: 0, text: "foo" })).toBe(false);
    expect(isNodeModel({})).toBe(false);
  });
});
