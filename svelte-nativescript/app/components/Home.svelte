<script lang="ts">
    // import * as imagePickerPlugin from '@nativescript/imagepicker';
    //   import type { ImagePicker } from '@nativescript/imagepicker';
  
    import { initialMessages } from '../../../src/lib/constants'
    import { Message, Image } from '../../../src/lib/types';
  
    // const imagePickerObj: ImagePicker = imagePickerPlugin.create({
    //   mode: 'multiple',
    //   mediaType: 1,
    // });
  
  
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
    
    const onAttachImages = () => {
    //   imagePickerObj
    //   .authorize()
    //   .then((authResult) => {
    //     if (authResult.authorized) {
    //         return imagePickerObj.present().then((selection) => {
    //           const newImages = selection.map((image) => (
    //             {
    //               alt: image.filename,
    //               src: image.path,
    //             }
    //           ))
    //           images = [...images, ...newImages]
    //         })
    //       }
    //     })
    }
    
    </script>
    
    <page>
      <actionBar class="action-bar" title="Messenger" />
      <stackLayout>
        <flexboxLayout class="flex-conteiner" flexDirection="column">
          <stackLayout class="message-box">
            <scrollView>
              <stackLayout>
                {#each messages as message}
                  <stackLayout class="message" class:mine={message.isMine}>
                    {#each message.images || [] as image}
                      <image class="message-image" src={image.src} />
                    {/each}
                    <label class="message-text" text={message.text} textWrap={true} />
                  </stackLayout>
                {/each}
              </stackLayout>
            </scrollView>
          </stackLayout>
          <!-- <stackLayout flexShrink={0} width="100" height="100" backgroundColor="green"></stackLayout> -->
          <stackLayout class="message-creator" orientation="horizontal">
            <textField bind:text={inputValue} class="message-input" hint="Введите текст" />
            <button on:tap={onAttachImages} class="icon-button">
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
        </flexboxLayout>
      </stackLayout>
    </page>
    
    
  <style>
    .action-bar {
      horizontal-align: center;
    }
    .flex-conteiner {
      height: 100%;
    }
    .message-box {
      margin: 20;
      padding: 5;
      flex-grow: 1;
      border-color: #89f1ef;
      border-width: 1px;
    }
    .message {
      min-width: 40;
      max-width: 200;
      min-height: 30;
      max-height: 80;
      padding: 6 12;
      background-color: #b8f0ee;
      border-radius: 15px 15px 15px 0;
      margin: 5 0;
      horizontal-alignment: left;
    }
    .message-text {
      overflow-wrap: break-word;
      min-width: 40;
      max-width: 250;
      min-height: 30;
      max-height: 80;
      horizontal-alignment: left;
    }
    .message-image {
      width: 100%;
      margin-bottom: 5;
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
      margin-right: 6;
    }
  
    .message-creator {
      margin-bottom: 25;
    }
    .icon-button {
      width: 36;
      height: 36;
      border-radius: 50%;
      border-width: 2px;
      border-color: #89f1ef;
      color: #89f1ef;
      vertical-align: center;
      horizontal-align: center;
      margin: 0 3;
    }
  </style>
    