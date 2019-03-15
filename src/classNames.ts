// This file is no longer needed for the project
// but contains otherwise useful code.
// TODO: Split this file into a separate repo.

export interface ClassNameObject {
  [className: string]: boolean | null | undefined;
}

export type ClassNamesInput = string | boolean | null | undefined | ClassNameObject | ClassNamesArray;

export interface ClassNamesArray extends Array<ClassNamesInput> {};

export default function classNames(
  ...args: ClassNamesInput[]
) {
  const classes: string[] = [];
  args
    .filter(element => !!element)
    .forEach(element => {
      if(Array.isArray(element) && element.length) {
        classes.push(classNames(...element));
      }
      else if(typeof element === "string") {
        classes.push(element);
      }
      else if(isClassNameObject(element)) {
        classes.push(
          ...Object.keys(element)
            .filter(key => !!element[key])
        )
      }
    });
  return classes.join(" ");
}

function isClassNameObject(
  obj: unknown,
): obj is ClassNameObject {
  return (
    typeof obj === "object"
    && !!obj
    && Object.keys(obj).every(key => typeof key !== "string")
  );
}
