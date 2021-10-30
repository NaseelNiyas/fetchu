export const createId = (length: number): string => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const parseEnvVarsFromString = (str: string) => {
  let splitStr = str.split(/[{{}}]/);
  let validVars: string[] = [];
  for (var i = 0; i < splitStr.length; i++) {
    if (splitStr[i] !== '' && !/^\s*$/.test(splitStr[i])) {
      if (splitStr[i].startsWith('__')) {
        validVars.push(splitStr[i]);
      }
    }
  };
  return validVars;
};
