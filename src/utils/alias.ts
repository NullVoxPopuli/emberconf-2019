import { get, set } from "@ember/object";

// https://tc39.github.io/proposal-decorators/#sec-elementdescriptor-specification-type
interface ElementDescriptor {
  descriptor: PropertyDescriptor;
  initializer?: () => any; // unknown
  key: string;
  kind: 'method' | 'field' | 'initializer';
  placement: 'own' | 'prototype' | 'static';
  finisher?: (klass: any) => any;
}

interface MethodDecorator {
  descriptor: PropertyDescriptor;
  key: string;
  kind: 'method' | 'field' | 'initializer';
  placement: 'own' | 'prototype' | 'static';
}

export function alias<T>(propertyPath: string) {
  return (desc: MethodDecorator): ElementDescriptor => {
    const result: ElementDescriptor = {
      ...desc,
      kind: 'method',
      descriptor: {
        enumerable: false,
        configurable: false,
      },
    };

    result.descriptor.get = function (): T {
      return get(this, propertyPath);
    };
    result.descriptor.set = function (value: any) {
      set(this, propertyPath, value);
    };

    return result;
  }
}
