export default function (obj: any) {
    const result = `?${new URLSearchParams(obj).toString()}`;
    return result;
  }