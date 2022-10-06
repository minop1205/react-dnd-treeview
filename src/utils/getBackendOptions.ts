import type { MultiBackendOptions } from "dnd-multi-backend";
import { PointerTransition, TouchTransition } from "dnd-multi-backend";
import type { HTML5BackendOptions } from "react-dnd-html5-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { TouchBackendOptions } from "react-dnd-touch-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export const getBackendOptions = (
  options: {
    html5?: Partial<HTML5BackendOptions>;
    touch?: Partial<TouchBackendOptions>;
  } = {}
): MultiBackendOptions => {
  return {
    backends: [
      {
        id: "html5",
        backend: HTML5Backend,
        options: options.html5,
        transition: PointerTransition,
      },
      {
        id: "touch",
        backend: TouchBackend,
        options: options.touch || { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };
};
