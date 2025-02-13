import Embed from '@editorjs/embed';

const embedTool = {
  class: Embed,
  inlineToolbar: true,
  config: {
    services: {
      youtube: true,
    },
  },
};

export default embedTool;
