type QueueItem = {
  content: any;
  next: QueueItem | typeof EMPTY_ITEM;
};

// Using this const to signal a pointer to nothing
// this allows returning null and undefined from dequeue.
// This prevents having to have a wrapper object but also
// requires the consumer to check equality against the
// exported symbol since they may have enqueued a `null`
// or `undefined` and those would be returned from `dequeue`
// accordingly.
export const EMPTY_ITEM = Symbol('empty-item');

// The primary responsibility of the Queue is to allow items
// to enter the queue (via `queue`) and for the first item
// to leave the queue (via `dequeue`)
// In the case of this implementation it uses a linked-list
// approach since it's mainly focused on entering and leaving
// the queue, not traversing. There are no publicly accessible
// ways of traversing through all the items. An array would
// have been easier but this is more fun.
export class Queue {
  private first: QueueItem | typeof EMPTY_ITEM = EMPTY_ITEM;
  private last: QueueItem | typeof EMPTY_ITEM = EMPTY_ITEM;
  private _length = 0;

  get length() {
    return this._length;
  }

  dequeue(): any {
    const { first } = this;

    if (first === EMPTY_ITEM) {
      return EMPTY_ITEM;
    }

    this.first = first.next;
    this.adjustLength(-1);
    return first?.content;
  }

  enqueue(content: any): void {
    const item: QueueItem = { content, next: EMPTY_ITEM };

    if (this.first === EMPTY_ITEM) {
      this.first = item;
    }

    if (this.last !== EMPTY_ITEM) {
      this.last.next = item;
    }

    this.last = item;
    this.adjustLength(+1);
  }

  private adjustLength(number: number) {
    this._length = this._length + number;
  }
}
