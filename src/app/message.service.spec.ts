import { MessageService } from './message.service';

describe('Message Service', () => {
  let ms: MessageService;

  it('should add no messages to start', () => {
    // arrange
    ms = new MessageService();

    // assert
    expect(ms.messages.length).toBe(0);
  });

  it('should add a message', () => {
    // arrange
    ms = new MessageService();

    // act
    ms.add('hello world');

    // assert
    expect(ms.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
     // arrange
     ms = new MessageService();
     ms.add('hello world');

     // act
     ms.clear();

     // assert
     expect(ms.messages.length).toBe(0);
  });
});
