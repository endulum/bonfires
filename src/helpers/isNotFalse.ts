export default function isNotFalse<T> (argument: T | false): argument is T {
  return argument !== false
}
