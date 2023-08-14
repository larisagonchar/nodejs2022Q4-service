import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class DataService {
  abstract data: any[];

  getAll<T>(): T[] {
    return this.data;
  }

  getById<T>(id: string): T {
    return this.data.find((item) => item.id === id);
  }

  updateAll<T>(data: T[]): void {
    this.data = data;
  }
}
