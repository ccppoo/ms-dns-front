import { BlockToolConstructable, ConversionConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import {
  BlockTool,
  BlockToolConstructorOptions,
  PasteConfig,
  PasteEvent,
  ToolboxConfig,
} from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import ImageTool from '@editorjs/image';
// @ts-ignore
import type { ImageConfig, ImageToolData } from '@editorjs/image/dist/types/types';

import type { RemoveBoardUnstagedImageType } from '@/api/image/postImageDelete';
import type { BoardImageUploadType, UploadByFileType } from '@/api/image/postImageUpload';

// import type { BoardImageUploadType, RemoveBoardImageType, UploadByFileType } from '../../types';

type ImageRemoverConfig = {
  remover: {
    removedImage: (imageUrl: string) => void;
  };
};
// type ExtendedImageConfig = ImageConfig & ImageRemoverConfig;
type ExtendedImageConfig = ImageConfig;
type ImageToolConstructorOptions = BlockToolConstructorOptions<ImageToolData, ExtendedImageConfig>;

class ImageExtendedTool extends ImageTool {
  removed() {
    // @ts-ignore
    const data = this._data;
    // console.log(`removed,  : ${JSON.stringify(data)}`);
    if (data.file.url) {
      this.removedImage(data.file.url);
    }
    // const data2 = {
    //   caption: '',
    //   withBorder: false,
    //   withBackground: false,
    //   stretched: false,
    //   file: {
    //     url: 'https://fzwcdn.forzaweek.com/board/board/test/ef238d60-7bc7-443e-bac7-51fd19085601.jpg',
    //   },
    // };
  }

  constructor({ data, config, api, readOnly, block }: ImageToolConstructorOptions) {
    // const { remover } = config;
    super({ data, config, api, readOnly, block });
    // this.removedImage = remover.removedImage;
  }

  /**
   * Show preloader and upload image file
   * @param string - file that is currently uploading (from paste)
   */
  private removedImage!: RemoveBoardUnstagedImageType;
}

// const getImageTools = (uploadByFile: UploadByFileType, removeBoardImage: RemoveBoardImageType) => {
const getImageTools = (uploadByFile: UploadByFileType) => {
  // removeBoardImage 상위 컴포넌트에서 상황에 따라 알아서 제공할 것
  // removeBoardImage -> 게시글 생성/수정에 따라 동작 방식이 다르다
  return {
    class: ImageExtendedTool,
    config: {
      uploader: {
        uploadByFile: uploadByFile,
        // uploadByUrl : async (url) => {
        //   // your ajax request for uploading
        //   return MyAjax.upload(file).then(() => {
        //     return {
        //       success: 1,
        //       file: {
        //         url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',,
        //         // any other image data you want to store, such as width, height, color, extension, etc
        //       }
        //     }
        //   })
        // }
      },

      // remover: {
      //   removedImage: removeBoardImage,
      // },
      tunes: [''],
    },
  };
};
//  as unknown as ToolConstructable;

export default getImageTools;
