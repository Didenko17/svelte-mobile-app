<script lang="ts">
  import { SendIcon, CloseIcon } from '$lib/components/icons';
	import { IconButton } from '$lib/components/icon-button';
	import { initialMessages } from '$lib/constants';
	import AttachButton from '$lib/features/attach-button/AttachButton.svelte';
  import type { Message, Image } from '$lib/types';
	

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
<div class="messanger">
  <div class="message-box">
    {#each messages as message}
      <div class="message" class:mine={message.isMine}>
        {#each message.images || [] as image}
          <img class="message-image" src={image.src} alt={image.alt} />
        {/each}
        {message.text}
      </div>
    {/each}
  </div>
  <div class="message-creator">
    <div class="attached-images">
      {#each images as image, index}
        <div class="attached-image">
          <img src={image.src} alt={image.alt} />
          <div class="detach-icon">
            <IconButton on:click={() => detachImage(index)}>
              <CloseIcon color="#89f1ef"/>
            </IconButton>
          </div>
        </div>
      {/each}
    </div>
    <input
      class="message-input"
      placeholder="Введите текст"
      bind:value={inputValue}
      on:keydown={handleInputKeyDown}
      on:paste={handlePaste}
    />
    <AttachButton on:attach={onAttachImages} />
    <IconButton on:click={onSendMessage}>
      <SendIcon color="#89f1ef" />
    </IconButton>
  </div>
</div>

<style>
  .messanger {
    height: 560px;
    width: 60%;
    border: 1px solid #89f1ef;
    border-radius: 15px;
    padding: 15px;
  }
  .message-box {
    height: 85%;
    border-bottom: 1px solid #89f1ef;
    overflow-y: scroll;
  }
  .message-creator {
    position: relative;
    height: 15%;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  .message {
    width: fit-content;
    overflow-wrap: break-word;
    max-width: 80%;
    padding: 16px 24px;
    background-color: #d2eeed;
    border-radius: 15px 15px 15px 0;
    margin: 5px 0;
  }
  .message-image {
    width: 100%;
    object-fit: contain;
  }
  .mine {
    background-color: #e6f8f5;
    margin-left: auto;
    border-radius: 15px 15px 0 15px;
  }
  .message-input {
    width: 80%;
    border: 1px solid #89f1ef;
    border-radius: 15px;
    padding: 8px 16px;
    line-height: 24px;
  }
  .attached-images {
    position: absolute;
    bottom: 110%; 
    width: 100%;
    padding: 8px;
    height: 72px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    overflow: auto;
  }
  .attached-image {
    position: relative;
    width: 64px;
    height: 64px;
  }
  .attached-image img{
    object-fit: cover;
    height: 100%;
    border-radius: 16px;
    width: 100%;
  }
  .detach-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    content-visibility: hidden;
  }
  .detach-icon:hover {
    content-visibility: visible;
    backdrop-filter: blur(10px);
  }
  @media (max-width: 680px) {
    .messanger {
      width: 90%;
    }
    .message {
      font-size: 14px;
    }
    .message-input {
      padding: 4px 8px;
      width: 80%;
    }
    .message-creator {
      gap: 8px;
    }
  }
</style>