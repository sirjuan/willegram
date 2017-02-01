import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryData {
  createDb() {
    let posts = [
      {id: 1, image: 'imagetest1', caption: 'Test1'},
      {id: 2, image: 'imagetest2', caption: 'Test2'},
      {id: 3, image: 'imagetest3', caption: 'Test3'}

    ];
    return {posts};
  }
}