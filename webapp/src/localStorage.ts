import { STORAGE_PREFIX } from "./config";

enum ValueType {
  string = "string",
  number = "number",
}

class StoredItem<T> {
  private key: string;
  private type: string;
  constructor(key: string, type: ValueType) {
    this.key = key;
    this.type = type;
  }

  public exists(): boolean {
    const rawValue = window.localStorage.getItem(this.key);
    return !!rawValue;
  }

  public read(): T {
    if (!this.exists) {
      throw new Error(`Could not find ${this.key} in local storage`);
    }

    const rawValue = window.localStorage.getItem(this.key) as string;

    switch (this.type) {
      case ValueType.string:
        return rawValue as unknown as T;

      case ValueType.number:
        return Number(rawValue) as unknown as T;

      default:
        throw new Error(`Type ${this.type} is not supported yet`);
    }
  }

  public set(value: T) {
    this.assertType(value);

    let serializedValue = "";

    switch (this.type) {
      case ValueType.string:
        serializedValue = value as unknown as string;
        break;

      case ValueType.number:
        serializedValue = (value as unknown as number).toString();
        break;

      default:
        throw new Error(`Type ${this.type} is not supported yet`);
    }

    window.localStorage.setItem(this.key, serializedValue);
  }

  public delete() {
    if (!this.exists()) return;
    window.localStorage.removeItem(this.key);
  }

  private assertType(value: T): void {
    const actualType = typeof value;
    const expectedType = this.type;
    if (actualType !== expectedType) {
      throw new Error(`Expected ${expectedType}, got ${actualType} instead`);
    }
  }
}

class Storage {
  people: StoredItem<string | undefined>;
  history: StoredItem<string | undefined>;

  constructor() {
    const prefix = STORAGE_PREFIX;
    this.people = new StoredItem(`${prefix}__people`, ValueType.string);
    this.history = new StoredItem(`${prefix}__history`, ValueType.string);
  }
}

const storage = new Storage();

export default storage;
