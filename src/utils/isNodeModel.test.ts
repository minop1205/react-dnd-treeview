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
			}),
		).toBe(true);
	});

	test("returns false if the object does not have id, parent, and text properties", () => {
		expect(isNodeModel({ parent: 0, text: "foo" })).toBe(false);
		expect(isNodeModel({})).toBe(false);
	});

	test("returns false for null", () => {
		expect(isNodeModel(null)).toBe(false);
	});

	test("returns false for non-object values", () => {
		expect(isNodeModel(undefined)).toBe(false);
		expect(isNodeModel(42)).toBe(false);
		expect(isNodeModel("foo")).toBe(false);
	});

	test("returns false when any required property is missing", () => {
		expect(isNodeModel({ id: 1, text: "foo" })).toBe(false);
		expect(isNodeModel({ id: 1, parent: 0 })).toBe(false);
	});
});
