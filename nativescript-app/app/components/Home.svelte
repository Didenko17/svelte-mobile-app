<script lang="ts">
  import { initialMessages } from '../../../src/lib/constants'
  import { Message, Image } from '../../../src/lib/types';

  let messages: Message[] = initialMessages;

  let images: Image[] = [];

  let inputValue = '';

  const onSendMessage = () => {
    if (inputValue === '' && !images.length) return;

    messages = [...messages, {
      text: inputValue,
      isMine: true,
      images,
    }];
    images = [];
    inputValue = '';
  }
  
  const detachImage = (index: number) => {
    images = images.toSpliced(index, 1);
  }

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  }
  
  const handlePaste = () => {
    navigator.clipboard.read().then((items) => {
      const imageType = items[0].types.find((itemType) => itemType.startsWith('image/'));
      if (imageType) {
        items[0].getType(imageType).then((imageBlob) => {
          images = [...images, {
            alt: `Прикрепленное изображение ${images.length + 1}`,
            src: window.URL.createObjectURL(imageBlob),
          }];
        })
      }
    });
  };
  
  const onAttachImages = (event: CustomEvent<Image[]>) => {
    images = [...images, ...event.detail];
  }
  
  </script>
  
  <page>
    <actionBar class="action-bar" title="Messenger" />
    <stackLayout>
      <stackLayout class="message-box">
          {#each messages as message}
              <label class="message" class:mine={message.isMine} text={message.text} textWrap={true} />
          {/each}
      </stackLayout>
      <stackLayout orientation="horizontal">
        <textField bind:text={inputValue} class="message-input" hint="Введите текст" />
        <button on:tap={() => alert('tapped')} class="icon-button">
          <formattedString>
            <span class="fas" text="&#xf0c6;" />
          </formattedString>
        </button>
        <button on:tap={onSendMessage} class="icon-button">
          <formattedString>
            <span class="fas" text="&#xf1d8;" />
          </formattedString>
        </button>
      </stackLayout>
    </stackLayout>
  </page>
  
  
<style>
  .action-bar {
    horizontal-align: center;
  }
  .message-box {
    margin: 20;
    padding: 5;
    height: 80%;
    border-color: #89f1ef;
    border-width: 1px;
  }
  .message {
    overflow-wrap: break-word;
    width: 250;
    min-height: 30;
    max-height: 80;
    padding: 12 8;
    background-color: #d2eeed;
    border-radius: 15px 15px 15px 0;
    margin: 5 0;
    horizontal-alignment: left;
  }
  .mine {
    background-color: #e6f8f5;
    margin-left: auto;
    border-radius: 15px 15px 0 15px;
    horizontal-alignment: right;
  }
  .message-input {
    width: 70%;
    height: 40;
    border-width: 1px;
    border-color: #89f1ef;
    border-radius: 15px;
    padding: 8px 16px;
    line-height: 24px;
  }
  .icon-button {
    width: 30;
    height: 30;
    border-radius: 50%;
    border-width: 2px;
    border-color: #89f1ef;
    color: #89f1ef;
    vertical-align: center;
    horizontal-align: center;
  }
</style>
  