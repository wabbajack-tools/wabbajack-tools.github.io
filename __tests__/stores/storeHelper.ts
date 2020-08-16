import { reaction, IReactionPublic } from 'mobx';

const storeHelper = <T>(
  expression: (r: IReactionPublic) => T,
  isValid: (data: T) => boolean,
  action?: () => void
) => {
  return new Promise<T>((resolve, reject) => {
    reaction(expression, (data, disposable) => {
      const valid = isValid(data);
      disposable.dispose();
      if (valid) {
        resolve(data);
      } else {
        reject(undefined);
      }
    });

    if (action) action();
  });
};

export default storeHelper;
