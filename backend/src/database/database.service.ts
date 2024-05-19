import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface DBEntity {
  id?: string;
}

@Injectable()
export class DatabaseService<T extends DBEntity> {
  private recordMap: { [id: string]: T } = {};

  create(record: Partial<T>) {
    const id = uuidv4();

    const newRecord = { id, ...record } as T;

    this.recordMap[id] = newRecord;

    return newRecord;
  }

  findAll(keys?: Array<keyof T>) {
    const allRecord = Object.values(this.recordMap);
    if (!keys) {
      return allRecord;
    }

    return allRecord.map((record) => {
      const obj = {} as Partial<T>;

      keys.forEach((key) => {
        obj[key] = record[key];
      });

      return obj;
    });
  }

  findOne(id: string) {
    return this.recordMap[id];
  }

  update(id: string, record: Partial<T>) {
    this.recordMap[id] = { ...this.recordMap[id], ...record };

    return this.recordMap[id];
  }

  remove(id: string) {
    delete this.recordMap[id];
  }
}
