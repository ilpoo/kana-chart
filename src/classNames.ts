export interface ClassNameObject {
  [className: string]: boolean | null | undefined;
}

export type ClassNamesInput = string | boolean | null | undefined | ClassNameObject | Array<any>;

export default function classNames(
  ...args: ClassNamesInput[]
) {
  const classes: string[] = [];
  args
    .filter(element => !!element)
    .forEach(element => {
      if(Array.isArray(element) && element.length) {
        classes.push(classNames.apply(null, element));
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
  obj: any,
): obj is ClassNameObject {
  return (
    typeof obj === "object"
    && !Object.keys(obj).some(key => typeof key !== "string")
  );
}
