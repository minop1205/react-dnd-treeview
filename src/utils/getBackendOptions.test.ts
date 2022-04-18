import { PointerTransition, TouchTransition } from "dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { getBackendOptions } from "./getBackendOptions";

describe("getBackendOptions", () => {
  test("compare backend options without additional params", () => {
    const options = getBackendOptions();

    expect(options.backends[0].id).toBe("html5");
    expect(options.backends[0].backend).toBe(HTML5Backend);
    expect(options.backends[0].transition).toBe(PointerTransition);
    expect(options.backends[1].id).toBe("touch");
    expect(options.backends[1].backend).toBe(TouchBackend);
    expect(options.backends[1].options).toEqual({ enableMouseEvents: true });
    expect(options.backends[1].preview).toBe(true);
    expect(options.backends[1].transition).toBe(TouchTransition);
  });

  test("compare backend options with additional params", () => {
    const html5Options = { rootElement: document };
    const touchOptions = {
      rootElement: document,
      delay: 100,
      delayTouchStart: 100,
      delayMouseStart: 100,
      enableMouseEvents: true,
      enableTouchEvents: true,
      enableKeyboardEvents: true,
      enableHoverOutsideTarget: true,
      ignoreContextMenu: true,
      touchSlop: 100,
    };

    const options = getBackendOptions({
      html5: html5Options,
      touch: touchOptions,
    });

    expect(options.backends[0].id).toBe("html5");
    expect(options.backends[0].backend).toBe(HTML5Backend);
    expect(options.backends[0].options).toEqual(html5Options);
    expect(options.backends[0].transition).toBe(PointerTransition);
    expect(options.backends[1].id).toBe("touch");
    expect(options.backends[1].backend).toBe(TouchBackend);
    expect(options.backends[1].options).toEqual(touchOptions);
    expect(options.backends[1].preview).toBe(true);
    expect(options.backends[1].transition).toBe(TouchTransition);
  });
});
